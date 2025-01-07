using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using ServiceLayer.Services;
using XAct;

namespace InitProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GitlabController : ControllerBase
    {
        private IConfiguration configuration;

        public GitlabController(IConfiguration iConfig)
        {
            configuration = iConfig;
        }


        /* the project repo must be totally blank and does not contain a README file */
        [HttpPost("PushProjectToGitlab")]
        public async Task<dynamic> PushingProjectToGitlab( string repoName,string projectName)
        {
            
            using (ServiceGitlab srv = new ServiceGitlab(configuration))
            {
                var test = await srv.PushProjectToGitlab( repoName,projectName);
                return Ok(test);
            }
        }

        [HttpGet("GetRepositories")]
        public async Task<dynamic> GitlabAuthAsync(string accessToken, string username)
        {
            
            List<dynamic> liste = new List<dynamic>();
            using (ServiceGitlab srv = new ServiceGitlab(configuration))
            {
                var res = await srv.GitlabAuthen(accessToken, username);
                return Ok(res);
            }
        }

       /* [HttpGet("GetUrlRepo")]
        public async Task<dynamic> GetUrlRepo()
        {
            using(ServiceGitlab srv= new ServiceGitlab(configuration))
            {
                var res = await srv.GethttpUrlRepo();
                return Ok(res);
            }
        }*/

    }
}
