using DataLayer.Context;
using DataLayer.Model;
using Microsoft.AspNetCore.Mvc;
using ServiceLayer.Services;

namespace InitProject.Controllers
{

    [Route("api/project")]
    [ApiController]
    public class ProjectController : Controller
    {
        public readonly Context _context;
        public ProjectController(Context context)
        {
            _context = context;
        }

        [HttpPost("CreatePoject")]
        public dynamic createPoject(string nameProject, string repository, int id_users)
        {
            Projects project = new Projects();
            project.nameProject = nameProject;
            project.repository = repository;
            project.id_user = id_users;
            using (ServiceProject srv = new ServiceProject(_context))
            {
                return srv.CreateProject(project);
            }

        }

        [HttpGet("GetAllProjects")]
        public dynamic getAll()
        {
            using(ServiceProject srv=new ServiceProject(_context))
            {
                return srv.getProjects();
            }
        }

        [HttpGet("getProjectDev")]
        public dynamic getProjectDev()
        {
            using (ServiceProject srv = new ServiceProject(_context))
            {
                return srv.getProjectDev();
            }
        }
       

        [HttpGet("getProjectsById_User")]
        public dynamic getProjectsById_User(int id_user)
        {
            using(ServiceProject srv=new ServiceProject(_context))
            {
                return srv.getProjectsById_User(id_user);
            }
        }

        [HttpGet("GetProjectsById")]
        public dynamic getByID(int id)
        {
            using (ServiceProject srv = new ServiceProject(_context))
            {
                return srv.getProjectById(id);
            }
        }

        [HttpGet("GetProjectsByName")]
        public dynamic getByNameProject( string nameProject)
        {
            using (ServiceProject srv = new ServiceProject(_context))
            {
                return srv.getProjectByName(nameProject);
            }
        }
        [HttpGet("GetProjectsByRepository")]
        public dynamic getByRepository(string repoProject)
        {
            using (ServiceProject srv = new ServiceProject(_context))
            {
                return srv.getProjectByRepository(repoProject);
            }
        }
        [HttpPut("updateStatutProject")]
        public IActionResult updateStatutProject( int id_project,string newstatut)
        {
            var project = _context.projects.FirstOrDefault(u => u.id == id_project);
            if (project == null)
            {
                return Content("developer not exist", "text/plain");
            }
            using (ServiceProject srv = new ServiceProject(_context))
            {
                return Ok(srv.updateStatutProject(project, newstatut));
            }
        }

        [HttpPut("updateDescriptionProject")]
        public IActionResult updateDescriptionProject(int id_project, string description)
        {
           
            using (ServiceProject srv = new ServiceProject(_context))
            {
                return Ok(srv.updateDescriptionProject(id_project, description));
            }
        }

        [HttpDelete("DeleteProject")]
        public dynamic DeleteProject(string nameProject)
        {
          using (ServiceProject srv = new ServiceProject(_context))
            {
                return srv.DeleteProject(nameProject);
            }
        }
      
       
       



    }
}
