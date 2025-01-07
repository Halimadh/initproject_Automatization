using DataLayer.Context;
using DataLayer.Model;
using Microsoft.AspNetCore.Mvc;
using ServiceLayer.Services;

namespace InitProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class FrameworkController : Controller
    {
        public Context _contex;

        public FrameworkController(Context contex)
        {
            _contex = contex;
        }

        [HttpPost("AddFramewrok")]
        public dynamic AddFramework(string name)
        {
            var framework = new Frameworks();
            framework.name = name;

            using (ServiceFramework srv = new ServiceFramework(_contex))
            {
                return srv.CreateFramework(framework);
            }
        }

        [HttpGet("GetAllFrameworks")]
        public dynamic GetAll()
        {
            using (ServiceFramework srv = new ServiceFramework(_contex))
            {
                return srv.GetAll();
            }
        }

        [HttpGet("GetFrameworkById")]
        public dynamic GetFrameworkById(int id)
        {
            var framework = _contex.frameworks.FirstOrDefault(x => x.id == id);
            if (framework == null)
            {
                return false;
            }
            using (ServiceFramework srv = new ServiceFramework(_contex))
            {
                return srv.GetFrameWorkById(id);
            }
        }

        [HttpGet("GetVersionByFramworkId")]
        public dynamic GetVersionByFramworkId(int id)
        {

            using (ServiceVersions srv = new ServiceVersions(_contex))
            {
                return srv.GetVersionByFramworkId(id);
            }
        }

        [HttpGet("GetIdFrameworkByName")]
        public dynamic GetIdFrameworkByName(string name)
        {
          
            using (ServiceFramework srv = new ServiceFramework(_contex))
            {
                return srv.GetIdFrameworkByName(name);
            }
        }

        [HttpGet("GetFrameworkByType")]
        public dynamic GetFrameworkByType(string type)
        {

            using (ServiceFramework srv = new ServiceFramework(_contex))
            {
                return srv.GetFrameWorkByType(type);
            }
        }

        [HttpGet("GetFrameworkByName")]
        public dynamic GetFrameworkByName(string name)
        {
            var framework = _contex.frameworks.FirstOrDefault(x => x.name == name);
            if (framework == null)
            {
                return false;
            }
            using (ServiceFramework srv = new ServiceFramework(_contex))
            {
                return srv.GetFrameWorkByName(name);
            }
        }

        [HttpDelete("DeleteFramework")]
        public dynamic DeleteFramework(string name)
        {
           
            using (ServiceFramework srv = new ServiceFramework(_contex))
            {
                return srv.DeleteFramework(name);
            }
        }
      
    }
}
