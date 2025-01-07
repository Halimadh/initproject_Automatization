using DataLayer.Context;
using DataLayer.Model;
using Microsoft.AspNetCore.Mvc;
using ServiceLayer.Services;

namespace InitProject.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class DependenciesController : ControllerBase
    {
        Context _context;
        public DependenciesController(Context context)
        {
            _context = context;
        }

        [HttpPost("CreateDependency")]
        public IActionResult createDependency(string name, string version, string type, int idproject)
        {
            Dependencies dependency = new Dependencies();
            dependency.name = name;
            dependency.version = version;
            dependency.type = type;
            dependency.id_project = idproject;
            using (ServiceDependencies sv = new ServiceDependencies(_context))
            {
                return Ok(sv.CreateDependency(dependency));
            }
        }


        [HttpGet("GetAllDependencies")]
        public IActionResult getAllDependencies()
        {
            using( ServiceDependencies sv= new ServiceDependencies(_context))
            {
                return Ok(sv.getAll());
            }
        }

        [HttpGet("GetDependenciesByIdproject")]
        public IActionResult getDependenciesByIdproject(int idproject)
        {
            using(ServiceDependencies sv= new ServiceDependencies(_context))
            {
                return Ok(sv.getDependenciesByIdproject(idproject));
            }
        }
        [HttpGet("GetDependencyById")]
        public IActionResult getDependencyById(int id)
        {
            using(ServiceDependencies sv=new ServiceDependencies(_context))
            {
                return Ok(sv.getDependencyById(id));
            }
        }
       
        [HttpPut("UpdateDependencyName")]
        public IActionResult updateDependencyName(int id,string updateName)
        {
            var dependency = _context.dependencies.FirstOrDefault(u => u.id == id);
           if (dependency == null)
            {
                return NotFound();
            }
            using(ServiceDependencies sv= new ServiceDependencies(_context))
            {
                return Ok(sv.UpdateDependencyName(dependency, updateName));
            }
        }

        [HttpPut("UpdateDependencyVersion")]
        public IActionResult updateDependencyVersion(int id, string updateVersion)
        {
            var dependency = _context.dependencies.FirstOrDefault(u => u.id == id);
            if (dependency == null)
            {
                return NotFound();
            }
            using (ServiceDependencies sv = new ServiceDependencies(_context))
            {
                return Ok(sv.UpdateDependencyVersion(dependency, updateVersion));
            }
        }
        [HttpPut("UpdateDependencyType")]
        public IActionResult updateDependencyType(int id, string updateType)
        {
            var dependency = _context.dependencies.FirstOrDefault(u => u.id == id);
            if (dependency == null)
            {
                return NotFound();
            }
            using (ServiceDependencies sv = new ServiceDependencies(_context))
            {
                return Ok(sv.UpdateDependencyType(dependency, updateType));
            }
        }

        [HttpDelete("DeleteDependency")]
        public IActionResult deleteDependency(int id)
        {
            using (ServiceDependencies sv = new ServiceDependencies(_context))
            {
                return Ok(sv.DeleteDependency(id));
            }
        }
    }
}
