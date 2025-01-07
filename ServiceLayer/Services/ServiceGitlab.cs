using Azure.Core;
using GitLabApiClient.Models.Projects.Responses;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using Octokit;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Text;
using XAct.Users;

namespace ServiceLayer.Services
{

    public class ServiceGitlab : IDisposable
    {

        private bool disposedValue;
        private IConfiguration configuration;
        public string UrlRepo;
        private class Project
        {
            public string Name { get; set; }
            public string Id { get; set; }
            public string web_url { get; set; }
            public string http_url_to_repo { get; set; }
            
        }

        public ServiceGitlab(IConfiguration iConfig)
        {
            configuration = iConfig;
        }
        public async Task<dynamic> GitlabAuthen(string accessToken, string username)
        {
           // var apiUrl = $"https://gitlab.com/api/v4/users/{username}/projects";
            var apiUrl = $"https://gitlab.com/api/v4/groups/{username}/projects";
            try
            {
                var httpClient = new HttpClient
            {
                BaseAddress = new Uri(apiUrl)
            };


            httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);

            
                var response = await httpClient.GetAsync(apiUrl);

                if (response.IsSuccessStatusCode)
                {
                    var responseContent = await response.Content.ReadAsStringAsync();
                     var projects = JsonConvert.DeserializeObject<List<Project>>(responseContent);
                    return projects;
                }

                else
                {
                    return false;
                }
            }catch (Exception ex)
            {
                return "Exception message: " + ex.Message;
            }
        }


        public async Task<int> CreateGitlabRepository(string repositoryName, string personalAccessToken)
        {
            var hostUrl = "https://gitlab.com/api/v4/";

            try
            {
                var httpClient = new HttpClient
                {
                    BaseAddress = new Uri(hostUrl)
                };

                // Prepare the repository data
                var repositoryData = new
                    {
                        name = repositoryName,
                        //description = "this repo is generated automatically.",
                        visibility = "private"
                    };

                    var jsonData = Newtonsoft.Json.JsonConvert.SerializeObject(repositoryData);
                    var content = new StringContent(jsonData, Encoding.UTF8, "application/json");

                    // Set headers
                    //httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", personalAccessToken);

                    httpClient.DefaultRequestHeaders.Add("Private-Token", personalAccessToken);

                    // Send POST request to create the repository
                    var response = await httpClient.PostAsync("projects", content);

                    if (response.IsSuccessStatusCode)
                    {
                    // Repository created successfully
                    var responseData = await response.Content.ReadAsStringAsync();
                    var repository = Newtonsoft.Json.JsonConvert.DeserializeObject<dynamic>(responseData);
                    int repositoryId = repository.id;
                    return repositoryId;
                    }
                    else
                    {
                    var responseContent = response.Content.ReadAsStringAsync();
                    return -1;
                    //return "Failed to create repository. Status code: " + response.StatusCode + responseContent;
                    }
                
            }
            catch(Exception ex)
            {
                return -1;
            }
           
        }


        public async Task<dynamic> PushProjectToGitlab(string repositoryName,string projectName)
        {
            var branchName = configuration.GetSection("PushSettings").GetSection("branchName").Value;
            var hostUrl = configuration.GetSection("PushSettings").GetSection("hostUrl").Value;
            var commitMessage = configuration.GetSection("PushSettings").GetSection("commitMessage").Value;
            var folderPath = configuration.GetSection("PushSettings").GetSection("directoryPath").Value+projectName+"\\";
            var token = configuration.GetSection("accessToken").GetSection("token2").Value;

            try
            {
                var projectId = await CreateGitlabRepository(repositoryName, token);
                UrlRepo = await GethttpUrlRepo(projectId);
                if (projectId == -1)
                {
                    return false;
                }
                else
                {
                    var files = Directory.GetFiles(folderPath, "*", SearchOption.AllDirectories);

                    var httpClient = new HttpClient
                    {
                        BaseAddress = new Uri(hostUrl)
                    };

                    //authentication gitlab user using the pat (pat must have the priviledge to write not just read.)
                    httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);


                    var actions = new List<object>();

                    foreach (var file in files)
                    {
                        // Skip "node_modules" directory or any file or folder with ".git" in its path or the readme file
                        if ((file.Contains("node_modules")) || (file.Contains(".git")))
                        {
                            continue;
                        }

                        var content = await File.ReadAllBytesAsync(file);
                        var path = file.Replace(folderPath, "").Replace("\\", "/");
                        actions.Add(new
                        {
                            action = "create",
                            file_path = path,
                            content = Convert.ToBase64String(content)
                        });
                    }
                    var requestBody = new
                    {
                        branch = branchName,
                        commit_message = commitMessage,
                        actions
                    };

                    var requestUrl = $"{projectId}/repository/commits";
                    httpClient.Timeout = TimeSpan.FromMinutes(60);
                    var response = await httpClient.PostAsJsonAsync(requestUrl, requestBody);

                    if (response.IsSuccessStatusCode)
                    {
                        return UrlRepo;
                    }
                    else
                    {
                        var responseContent = await response.Content.ReadAsStringAsync();
                        return responseContent;
                    }
                }

            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        public async Task<dynamic> GethttpUrlRepo(int projectId)
        {
            var token = configuration.GetSection("accessToken").GetSection("token2").Value;
            var apiUrl = $"https://gitlab.com/api/v4/projects/{projectId}";
            try
            {
                var httpClient = new HttpClient
                {
                    BaseAddress = new Uri(apiUrl)
                };


                httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);


                var response = await httpClient.GetAsync(apiUrl);

                if (response.IsSuccessStatusCode)
                {
                    var responseData = await response.Content.ReadAsStringAsync();
                    var repository = Newtonsoft.Json.JsonConvert.DeserializeObject<dynamic>(responseData);
                    // string UrlRepo  ;
                    return repository.http_url_to_repo;
                }

                else
                {
                    return false;
                }
            }
            catch (Exception ex)
            {
                return "Exception message: " + ex.Message;
            }
        }

    



        protected virtual void Dispose(bool disposing)
            {
                if (!disposedValue)
                {
                    if (disposing)
                    {
                        // TODO: supprimer l'état managé (objets managés)
                    }

                    // TODO: libérer les ressources non managées (objets non managés) et substituer le finaliseur
                    // TODO: affecter aux grands champs une valeur null
                    disposedValue = true;
                }
            }
        public void Dispose()
            {
                Dispose(disposing: true);
                GC.SuppressFinalize(this);
            }

    }
}
