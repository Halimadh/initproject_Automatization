using DataLayer.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServiceLayer.Services.IServices
{
    public interface IServiceUser
    {
        public Task<(bool isSuccess, string Message, int CountUser)> CountUser();
        public dynamic CreateUser(Users user);
        public dynamic GetAllUsers();
        public object GetUserById(int id);
        public dynamic GetUserByName(string name);
        public dynamic GetUserByUsername(string username);
        public dynamic GetUserByEmail(string email);
        public dynamic GetUsersByRole(string role);
        public dynamic checkUnicityUsername(string username);
        public dynamic UpdateNameUser(string username, string name);
        public dynamic UpdatePasswordUser(string username, string password);
        public dynamic UpdateEmailUser(string username, string email);
        public dynamic UpdateRoleUser(string username, string role);
        public dynamic DeleteUser(string username);
        public object updateUsername(string username, string Newusername);

    }
}
