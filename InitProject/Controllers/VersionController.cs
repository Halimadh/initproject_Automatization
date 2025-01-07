using DataLayer.Context;
using DataLayer.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ServiceLayer.Services;

namespace InitProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VersionController : ControllerBase
    {

        public Context _contex;

        public VersionController(Context contex)
        {
            _contex = contex;
        }

        [HttpGet("GetAllVersions")]
        public dynamic GetAll()
        {
            using (ServiceVersions srv = new ServiceVersions(_contex))
            {
                return srv.GetAll();
            }
        }

        [HttpGet("GetAllVersionsByFramework")]
        public dynamic GetAllByFramework(int idFramework)
        {
            using (ServiceVersions srv = new ServiceVersions(_contex))
            {
                return srv.GetVersionByFramework(idFramework);
            }
        }

        [HttpGet("GetVersionById")]
        public dynamic GetVersionById(int id)
        {
            var version = _contex.versions.FirstOrDefault(x => x.id == id);
            if (version == null)
            {
                return false;
            }
            using (ServiceVersions srv = new ServiceVersions(_contex))
            {
                return srv.GetVersionById(id);
            }
        }

        [HttpPost("AddVersion")]
        public dynamic AddVersion(string name, int idFramework)
        {
            Versions version = new Versions();
            version.name = name;
            version.idFramework = idFramework;
            using (ServiceVersions srv = new ServiceVersions(_contex))
            {
                return srv.CreateVersion(version);
            }
        }

        [HttpDelete("DeleteVersion")]
        public dynamic DeleteVersion(int id)
        {
            var version = _contex.versions.FirstOrDefault(u => u.id == id);

            if (version == null)
            {
                return false;
            }
            using (ServiceVersions srv = new ServiceVersions(_contex))
            {
                return srv.DeleteVersion(version);
            }
        }

        [HttpDelete("DeleteVersionByFramework")]
        public dynamic DeleteVersionByFramework(int idframework)
        {
            
            using (ServiceVersions srv = new ServiceVersions(_contex))
            {
                return srv.DeleteVersionByIdFramework(idframework);
            }
        }
    }
}
