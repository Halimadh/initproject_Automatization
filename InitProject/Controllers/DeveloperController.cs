using DataLayer.Context;
using DataLayer.Model;
using Microsoft.AspNetCore.Mvc;
using ServiceLayer.Services;

namespace InitProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DeveloperController:ControllerBase
    {
        public Context _contex;

        public DeveloperController(Context contex)
        {
            _contex = contex;
        }

        [HttpPost("CreateDeveloper")]
        public dynamic createDeveloper(string name,string username,string email)
        {
            Developers developer = new Developers(); 
             developer.name = name;
             developer.username = username;
             developer.email = email;
             using (ServiceDevelopers srdeveloper = new ServiceDevelopers(_contex))
             {
                 return srdeveloper.CreateDeveloper(developer);
             }
            return true;
        }


        [HttpPost("AddDeveloperToproject")]
        public dynamic addDeveloperToprojec(int idproject, int idDeveloper)
        {
            using (ServiceDevelopers srdeveloper = new ServiceDevelopers(_contex))
            {
                return srdeveloper.AddDeveloperToproject(idproject, idDeveloper);
            }
        }

       
        [HttpGet("getAllDevelopers")]
        public IActionResult getAllDevelopers()
        {
           using(ServiceDevelopers srdeveloper=new ServiceDevelopers(_contex))
            {
               return Ok(srdeveloper.getAll());
            }
        }


       [HttpGet("getDevelopersByIdproject")]
        public IActionResult getDevelopersByIdproject(int idproject)
        {
            //List<Developers> listdev = new List<Developers>();
            var listdev = new List<Developers>();
            using (ServiceDevelopers srdeveloper = new ServiceDevelopers(_contex))
            {
                 listdev = srdeveloper.getDevelopersByIdproject(idproject);
            }
            return Ok(listdev);
        }

        [HttpGet("getprojectByIdDeveloper")]
        public async Task<IActionResult>  getprojectByIdDeveloper(int id_developer)
        {
            //List<Projects> listproject = new List<Projects>();
           // var listproject = new List<Projects>();
            using (ServiceDevelopers srdeveloper =  new ServiceDevelopers(_contex))
            {
               return Ok(await  srdeveloper.getprojectByIdDeveloper(id_developer));
            }
            
        }

        [HttpGet("getDeveloperById")]
        public IActionResult getDeveloperById(int id)
        {
            using (ServiceDevelopers srdeveloper = new ServiceDevelopers(_contex))
            {
                return Ok(srdeveloper.getDeveloperById(id));
            }
        }

        [HttpGet("getDeveloperByUsername")]
        public IActionResult getDeveloperByUsername(string username)
        {
            using (ServiceDevelopers srdeveloper = new ServiceDevelopers(_contex))
            {
                return Ok(srdeveloper.getDeveloperByUsername(username));
            }
        }

        [HttpGet("getDeveloperByEmail")]
        public IActionResult getDeveloperByEmail(string email)
        {
            using (ServiceDevelopers srdeveloper = new ServiceDevelopers(_contex))
            {
                return Ok(srdeveloper.getDeveloperByEmail(email)) ;
            }
        }

        [HttpPut("UpdateDeveloperName")]
        public IActionResult updateDeveloperName(int id_developer, string nameUpdate)
        {
            var developer = _contex.developers.FirstOrDefault(u => u.id == id_developer);
            if (developer == null)
            {
                return NotFound();
            }

            using (ServiceDevelopers srdeveloper = new ServiceDevelopers(_contex))
            {
                return Ok(srdeveloper.UpdateDeveloperName(developer, nameUpdate));
            }

        }

        [HttpPut("UpdateDeveloperUsername")]
        public IActionResult updateDeveloperUsername(int id_developer, string usernameUpdate)
        {
            var developer = _contex.developers.FirstOrDefault(u => u.id == id_developer);
            if (developer == null)
            {
                return Content("developer not exist", "text/plain") ;
            }

            using (ServiceDevelopers srdeveloper = new ServiceDevelopers(_contex))
            {
                return Ok(srdeveloper.UpdateDeveloperUsername(developer, usernameUpdate));
            }

        }

        [HttpPut("UpdateDeveloperEmail")]
        public IActionResult updateDeveloperEmail(int id_developer, string emailUpdate)
        {
            var developer = _contex.developers.FirstOrDefault(u => u.id== id_developer);
            if (developer == null)
            {
                return Content("developer not exist", "text/plain");
            }

            using (ServiceDevelopers srdeveloper = new ServiceDevelopers(_contex))
            {
                return Ok(srdeveloper.UpdateDeveloperEmail(developer, emailUpdate)) ;
            }

        }
        
        [HttpDelete("DeleteDeveloper")]
        public IActionResult deleteDeveloper(string username)
        {
          
            using (ServiceDevelopers srdeveloper = new ServiceDevelopers(_contex))
            {
                return Ok(srdeveloper.DeleteDeveloper(username));
            }

        }

        [HttpDelete("DeleteDeveloperOnProject")]
        public IActionResult DeleteDeveloperOnProject(string username,int id_project)
        {

            using (ServiceDevelopers srdeveloper = new ServiceDevelopers(_contex))
            {
                return Ok(srdeveloper.DeleteDeveloperOnProject(username,id_project));
            }

        }


    }
}
