using DataLayer.Context;
using Microsoft.AspNetCore.Mvc;
using ServiceLayer.ServiceLayer;
using ServiceLayer.Services;

namespace InitProject.Controllers
{
    [Route("api/[Controller]")]
    [ApiController]
    public class RunController : Controller
    {
       
        private IConfiguration? configuration;
        public Context _context;

        public RunController(IConfiguration iConfig, Context context)
        {
            configuration = iConfig;
            _context = context;
        }
        [HttpPost()]
        public async Task<dynamic> RunProject( string nameProject,string type)
        {
            using (ServiceRun svc=new ServiceRun(configuration,_context))
            {
                var result = svc.runProject(nameProject,type);
                return Ok(result);
            }
        }
    }
}
