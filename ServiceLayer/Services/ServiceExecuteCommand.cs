using DataLayer.Context;
using DataLayer.Model;
using Microsoft.Extensions.Configuration;
using Org.BouncyCastle.Asn1.Ocsp;
using ServiceLayer.Services;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Diagnostics;
using System.Diagnostics.Eventing.Reader;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServiceLayer.ServiceLayer
{
    public class ServiceExecuteCommand:IDisposable
    {

        private bool disposedValue;

        private IConfiguration configuration;
        public Context _context;

        public string output;
        public string UrlRepo="a";
        public string type;
        string jsonText = File.ReadAllText("C:\\Projet_pfe_Master\\initproject\\InitProject\\config_file.json");

        public ServiceExecuteCommand(IConfiguration iConfig, Context context)
        {
            configuration = iConfig;
            _context = context;
            

        }
        public async Task<bool> Exec_Command(string framework_back, string framework_front, string version_back, string version_front, string nameProject,int idUser,string email,string repository)
        {
           
                var jsonData = Newtonsoft.Json.JsonConvert.DeserializeObject<dynamic>(jsonText);
                ProcessStartInfo startInfo = new ProcessStartInfo();
                startInfo.WorkingDirectory = configuration.GetSection("CmdSetting").GetSection("workingDirectory").Value;
                startInfo.FileName = configuration.GetSection("CmdSetting").GetSection("fileName").Value;

                if (framework_back == "Web Api Asp.net")
                {
                    if (framework_front == "Angular")
                    {
                        startInfo.Arguments = jsonData.frameworkBackend.aspWebApi.cmdCreateFolder + nameProject + jsonData.frameworkBackend.aspWebApi.cdFolder + nameProject + jsonData.frameworkBackend.aspWebApi.createWebApi + version_back + jsonData.frameworkFrontend.Angular.CreateWebClient + version_front;


                    }
                    else
                    {
                        startInfo.Arguments = jsonData.frameworkBackend.aspWebApi.cmdCreateFolder + nameProject + jsonData.frameworkBackend.aspWebApi.cdFolder + nameProject + jsonData.frameworkBackend.aspWebApi.createWebApi + version_back + jsonData.frameworkFrontend.ReactJS.CreateWebClient + version_front;

                    }

                }
               
                startInfo.UseShellExecute = false;
                startInfo.RedirectStandardOutput = true;
                Process process = new Process();
                process.StartInfo = startInfo;
                process.Start();
                output = process.StandardOutput.ReadToEnd();
                Console.WriteLine(output);
                //push project to gitLab

                if (output != null)
                {
                    using (ServiceGitlab srvG = new ServiceGitlab(configuration))
                    {
                        UrlRepo = await srvG.PushProjectToGitlab(repository, nameProject);

                    }
                    Console.WriteLine(UrlRepo);
                    DateTime maintenant = DateTime.Now;
                    string formatPersonnalise = "yyyy-MM-dd HH:mm";
                    Projects project = new Projects();
                    project.nameProject = nameProject;
                    project.repository = repository;
                    project.framework_back = framework_back;
                    project.framework_front = framework_front;
                    project.version_back = version_back;
                    project.version_front = version_front;
                    project.id_user = idUser;
                    project.http_url_to_repo = UrlRepo;
                    project.date = maintenant.ToString(formatPersonnalise);
                    project.statut = "Create";
                    project.description = " ";
                    _context.projects.Add(project);
                    _context.SaveChanges();

                    return true;
                }
                //send mail after creating the project
                /* using(ServiceSendEmail srv = new ServiceSendEmail(configuration))
                    {
                      srv.SendEmails(email,nameProject);
                      }*/
                return false;
            


        

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
