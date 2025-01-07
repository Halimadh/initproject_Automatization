using DataLayer.Context;
using DataLayer.Model;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ServiceLayer.Services;
using ServiceLayer.Services.IServices;
using System.Text.RegularExpressions;

namespace InitProject.Controllers
{
    [Route("api/User")]
    [ApiController]

    public class UserController : Controller
    {
        //public Context _contex;

        //public UserController(Context contex)
        //{
        //    _contex = contex;
        //}
        

        public IServiceUser srv;
        

        public UserController(IServiceUser service)
        {
            srv = service;
            //_contex = contex;
        }

        [HttpGet("GetAllUsers")]
        public dynamic GetAll()
        {
            //using (ServiceUser srv = new ServiceUser(_contex))
            //{
            return srv.GetAllUsers();
            //}
        }

        [HttpGet("GetCountUser")]
        public async Task<int> GetCountUser()
        {
            //using (ServiceUser srv = new ServiceUser(_contex))
            //{
            var countItem = await srv.CountUser();

            return (countItem.CountUser);
            //}
        }

        [HttpGet("GetUsersByRole")]
        public dynamic GetUsersByRole(string role)
        {
            //using (ServiceUser srv = new ServiceUser(_contex))
            //{
            return srv.GetUsersByRole(role);
            //}
        }

        [HttpGet("GetUserById")]
        public object GetUserById(int id)
        {

            //using (ServiceUser srv = new ServiceUser(_contex))
            //{
            return srv.GetUserById(id);

            //}
        }

        [HttpGet("GetUserByUsername")]
        public object GetUserByUsername(string username)
        {

            //using (ServiceUser srv = new ServiceUser(_contex))
            //{
            return srv.GetUserByUsername(username);

            //}
        }

        [HttpGet("GetUserByName")]
        public object GetUserByName(string name)
        {

            //using (ServiceUser srv = new ServiceUser(_contex))
            //{
            return srv.GetUserByName(name);

            //}
        }

        [HttpGet("GetUserByEmail")]
        public object GetUserByEmail(string email)
        {

            //using (ServiceUser srv = new ServiceUser(_contex))
            //{
            return srv.GetUserByEmail(email);

            //}
        }

        [HttpGet("CheckUsername")]
        public object CheckUsername(string username)
        {

            //using (ServiceUser srv = new ServiceUser(_contex))
            //{
            return srv.checkUnicityUsername(username);

            //}
        }

        [HttpPost("CreateUser")]
        public dynamic CreateUser(string username, string name, string password, string email, string role)
        {
            Users user = new Users();
            user.username = username;
            user.name = name;
            user.pwd = System.Text.Encoding.UTF8.GetBytes(password);
            user.email = email;
            user.role = role;

            if (!((role.Equals("simple user", StringComparison.OrdinalIgnoreCase) || role.Equals("admin", StringComparison.OrdinalIgnoreCase))))
            {
                // return new {ResultStatus= "the role name must be either : 'Admin' or 'Simple user'" } ;
                string content = "the role name must be either : 'admin' or 'simple user'";
                return Content(content, "text/plain");
            }

            string pattern = @"^[^@\s]+@[^@\s]+\.[^@\s]+$";
            bool isMatch = Regex.IsMatch(email, pattern);

            if (isMatch == false)
            {
                return Content("please enter a valid email", "text/plain");
            }

            //using (ServiceUser srv = new ServiceUser(_contex))
            //{
            return srv.CreateUser(user);
            //}


            ////using (ServiceUser srv = new ServiceUser(_contex))
            ////{
            //    var result = srv.CreateUser(user);

            //    if(result.isSuccess == true) // success
            //    {
            //        return Ok(result.Message);
            //    }
            //    else // echec
            //    {
            //        var messageError = result.Message;
            //    }
            //}


        }

        [HttpPut("UpdateUsername")]
        public object UpdateUsername(string username, string usernameUpdated)
        {
           
            return srv.updateUsername(username, usernameUpdated);
         

        }


        [HttpPut("updateNameUser")]
        public object updateNameUser(string username, string nameUpdated)
        {
            //using (serviceuser srv= new serviceuser(_contex))
            //{
            return srv.UpdateNameUser(username,nameUpdated) ;
            //}
        }

        [HttpPut("updatePasswordUser")]
        public object updatePasswordUser(string username, string password)
        {

            //using (serviceuser srv = new serviceuser(_contex))
            //{
            return srv.UpdatePasswordUser(username, password);
            //}
        }

        [HttpPut("UpdateEmailUser")]
        public object UpdateEmailUser(string username, string emailUpdated)
        {

            //using (ServiceUser srv = new ServiceUser(_contex))
            //{
            return srv.UpdateEmailUser(username, emailUpdated);
            //}
        }

        [HttpPut("UpdateRoleUser")]
        public object UpdateRoleUser(string username, string roleUpdated)
        {
           
            //using (ServiceUser srv = new ServiceUser(_contex))
            //{
            return srv.UpdateRoleUser(username, roleUpdated);
            //}
        }

        [HttpDelete("DeleteUser")]
        public object DeleteUser(string username)
        {
           
            //using (ServiceUser srv= new ServiceUser(_contex))
            //{
            return srv.DeleteUser(username);
            //}
        }
    }
}
