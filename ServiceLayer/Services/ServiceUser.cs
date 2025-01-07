using DataLayer.Context;
using DataLayer.Model;
using GitLabApiClient.Models.Releases.Responses;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using ServiceLayer.Services.IServices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace ServiceLayer.Services
{
    public class ServiceUser : IDisposable, IServiceUser
    {
        private bool disposedValue;
        public Context _contex;

        public ServiceUser(Context contex)
        {
            _contex = contex;
        }

        //public (bool isSuccess, string Message) CreateUser(Users user)
        //{
        //    try
        //    {
        //        var existingUser = _contex.users.FirstOrDefault(u => u.username == user.username);
        //        if (existingUser != null)
        //        {
        //            return new (false, "User already exists.");
        //        }

        //        _contex.users.Add(user);
        //        _contex.SaveChanges();
        //        return new (true, "User Added Successfully");


        //    }
        //    catch (Exception e)
        //    {
        //        return new (false, e.Message + " \n InnerException : " + e.InnerException?.Message);
        //        // var json = JsonConvert.SerializeObject(e)!;
        //        //return json;

        //    }
        //}

        public async Task<(bool isSuccess, string Message, int CountUser)> CountUser()
        {

            try
            {
                var countItem = await _contex.users.Select(u => u.id).CountAsync();

                return new(true, "", countItem);
            }
            catch (Exception ex)
            {
                return new (false, ex.Message + " \n InnerException : " + ex.InnerException?.Message, 0);
            }
        }

        public dynamic CreateUser(Users user)
        {
            try
            {
                var existingUser = _contex.users.FirstOrDefault(u => u.username == user.username);
                if (existingUser != null)
                {
                    return "User already exists. ";
                }

                _contex.users.Add(user);
                _contex.SaveChanges();
                return true;


            }
            catch (Exception e)
            {
                return e.Message + " \n InnerException : " + e.InnerException?.Message;
                // var json = JsonConvert.SerializeObject(e)!;
                //return json;

            }
        }

        public dynamic GetAllUsers()
        {
            try
            {
                var res = _contex.users.Select(u => new 
                { 
                    u.id,
                    u.name,
                    u.username,
                    u.email,
                    u.role
                })
                    .ToList();

                return res;
            } 
            catch(Exception ex)
            {
                return new { error = ex.Message };
            }
            
        }
        public dynamic GetUserByName(string name)

        {

            try {
                var existingUser = _contex.users.FirstOrDefault(u => u.name == name);
                if (existingUser == null)
                {
                    return new { ResultStatus = "User not found. " };
                }

                var userRes = new
                {
                    existingUser.id,
                    existingUser.name,
                    existingUser.username,
                    existingUser.email,
                    existingUser.role
                };

                return userRes;
            
            }catch(Exception e)
            {
                return new { error = e.Message };
            }

        }
        public dynamic GetUserByUsername(string username)
        {
            try
            {
                var existingUser = _contex.users.FirstOrDefault(u => u.username == username);
                if (existingUser == null)
                {
                    return new { result = "User not found." };
                }
                var userRes = new
                {
                    existingUser.id,
                    existingUser.name,
                    existingUser.username,
                    existingUser.email,
                    existingUser.role
                };

                return userRes;

            }
            catch (Exception e)
            {
                return new { error = e.Message };
            }

        }
        public object GetUserById(int id)
        {
            try
            {
                var existingUser = _contex.users.FirstOrDefault(u => u.id == id);
                if (existingUser == null)
                {
                    return new { result = "User not found." };
                }
                var userRes = new
                {
                    existingUser.id,
                    existingUser.name,
                    existingUser.username,
                    existingUser.email,
                    existingUser.role
                };

                return userRes;

            }
            catch (Exception e)
            {
                return new { error = e.Message };
            }

        }
        public dynamic GetUserByEmail(string email)
        {
            try
            {
                var existingUser = _contex.users.FirstOrDefault(u => u.email == email);
                if (existingUser == null)
                {
                    return new { result = "User not found." };
                }
                var userRes = new
                {
                    existingUser.id,
                    existingUser.name,
                    existingUser.username,
                    existingUser.email,
                    existingUser.role
                };

                return userRes;

            }
            catch (Exception e)
            {
                return new { error = e.Message };
            }
        }
        public dynamic GetUsersByRole(string role)
        {
            try
            { 
                if (role.Equals("simple user", StringComparison.OrdinalIgnoreCase) 
                    || role.Equals("admin", StringComparison.OrdinalIgnoreCase) )
                {
                    return _contex.users.Where(u => u.role == role).ToList();
                }
                return new { result = "no such role name. " };

            }
            catch (Exception e)
            {
                return new { error = e.Message };
            }
        }
        public dynamic checkUnicityUsername(string username)
        {
            try
            {
                var existingUser = _contex.users.FirstOrDefault(u => u.username == username);
                if (existingUser == null)
                {
                    return true;
                }
                else return false;
            }
            catch (Exception e)
            {
                return e.Message;
            }
        }
        public object updateUsername(string username, string Newusername)
        {
            try
            {
                var user = _contex.users.FirstOrDefault(u => u.username == username);
                if (user == null)
                {
                    return ("User not found.");
                }
                if (checkUnicityUsername(Newusername)==false)
                {
                    return new { result = "Username must be unique. " };
                }
                user.username = Newusername;
                _contex.SaveChanges();
                return new { result = "Username updated successfully." };
            }
            catch (Exception e)
            {
                return new { error = e.InnerException };
            }
        }
        public dynamic UpdateNameUser(string username, string newName)
        {
            try
            {
                var user = _contex.users.FirstOrDefault(u => u.username == username);
                if (user == null)
                {
                    return ("user not found.");
                }
                user.name = newName;
                _contex.SaveChanges();
                return new { result = "Name updated successfully." };
            }catch(Exception e)
            {
                return new { error = e.Message };
            }
        }
        public dynamic UpdatePasswordUser(string username, string newPassword)
        {
            try
            {

                var user = _contex.users.FirstOrDefault(u => u.username == username);
                if (user == null)
                {
                    return ("user not found.");
                }
                user.pwd = System.Text.Encoding.UTF8.GetBytes(newPassword);
                _contex.SaveChanges();
                return new { result = "Password updated successfully." };
            }
            catch (Exception e)
            {
                return new { error = e.Message };
            }
        }
        public dynamic UpdateEmailUser(string username, string email)
        {
            try
            {
                var user = _contex.users.FirstOrDefault(u => u.username == username);
                if (user == null)
                {
                    return ("user not found.");
                }
                user.email = email;
                _contex.SaveChanges();
                return new { result = "Email updated successfully." };
            }
            catch (Exception e)
            {
                return new { error = e.Message };
            }
        }
        public dynamic UpdateRoleUser(string username, string role)
        {
            try
            {
                var user = _contex.users.FirstOrDefault(u => u.username == username);
                if (user == null)
                {
                    return ("user not found.");
                }
                if (role.Equals("simple user", StringComparison.OrdinalIgnoreCase) || role.Equals("admin", StringComparison.OrdinalIgnoreCase))
                {
                    user.role = role;
                    _contex.SaveChanges();
                    return new { result = "role updated successfully." };
                }
                return new { result = "no such role name. " };
                
            }
            catch (Exception e)
            {
                return new { error = e.Message };
            }
        }
        public dynamic DeleteUser(string username)
        {
            try
            {
                var existingUser = _contex.users.FirstOrDefault(u=> u.username==username);
                if (existingUser == null)
                {
                    return new { result = "User not found." };
                }
                _contex.users.Remove(existingUser);
                _contex.SaveChanges();
                return  new {result= "user deleted successfully"};
            }
            catch(Exception e) 
            {
                return new { error = e.Message };
            }
        }

        protected virtual void Dispose(bool disposing)
        {
            if (!disposedValue)
            {
                if (disposing)
                {
                    // TODO: supprimer l'état managé (objets managés)
                }

                // TODO: libérer les ressources non managées (objets non managés) et substituer le finaliseur
                // TODO: affecter aux grands champs une valeur null
                disposedValue = true;
            }
        }
        public void Dispose()
        {
            Dispose(disposing: true);
            GC.SuppressFinalize(this);
        }
    }
}
