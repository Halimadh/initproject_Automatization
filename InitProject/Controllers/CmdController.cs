using DataLayer.Context;
using GitLabApiClient.Internal.Paths;
using Microsoft.AspNetCore.Mvc;
using ServiceLayer.ServiceLayer;
using ServiceLayer.Services;

namespace InitProject.Controllers
{
    [Route("api/[Controller]")]
    [ApiController]
    public class CmdController : ControllerBase
    {
        private IConfiguration?configuration;
        public Context _context;

        public CmdController(IConfiguration iConfig, Context context)
        {
            configuration = iConfig;
            _context = context;
        }

        [HttpPost("ExecuteCmd")]
        public async Task<dynamic> ExecuteCmd(string framework_back, string framework_front, string version_back,string version_front, string nameProject, int idUser, string email, string repository)
        {
            using (ServiceExecuteCommand sec= new ServiceExecuteCommand(configuration,_context))
            {
                var result = await sec.Exec_Command(framework_back, framework_front, version_back,version_front, nameProject,idUser,email,repository);
                return Ok(result);
            }
        }
    }
}
