using DataLayer.Context;
using DataLayer.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServiceLayer.Services
{
    public class ServiceDevelopers:IDisposable
    {
        private bool disposedValue;
        public Context _contex;
        public void Dispose()
        {
            Dispose(disposing: true);
            GC.SuppressFinalize(this);
        }
        protected virtual void Dispose(bool disposing)
        {
            if (!disposedValue)
            {
                if (disposing)
                {
                    // TODO: supprimer l'état managé (objets managés)
                }

                disposedValue = true;
            }
        }
        public ServiceDevelopers(Context contex)
        {
            _contex = contex;
        }

        public dynamic CreateDeveloper(Developers developer)
        {
            try
            {
                var check = _contex.developers.FirstOrDefault(x => x.name == developer.name);
                
                // VERIFIER QUE L ID DU PROJET EXISTE AUSSI
                if (check == null)
                {
                    _contex.developers.Add(developer);
                    _contex.SaveChanges();
                    return true;
                }
                return false;
            }
            catch (Exception ex)
            {
                return ex.Message ;
            }
        }
        public dynamic AddDeveloperToproject(int idproject,int idDeveloper)
        {
            try {
                var checkdev = _contex.developers.FirstOrDefault(x => x.id == idDeveloper);
                var checkproject = _contex.projects.FirstOrDefault(x => x.id == idproject);
                var Existdevpro = _contex.developerProject.Where(x => x.id_project == idproject && x.id_developer == idDeveloper);
                if (checkdev!=null && checkproject != null)
                {
                    DeveloperProject devproject = new DeveloperProject();
                    devproject.id_project = idproject;
                    devproject.id_developer = idDeveloper;
                    _contex.developerProject.Add(devproject);
                    _contex.SaveChanges();
                    return true;
                }   
             return false;
            }catch(Exception ex) {
                return ex.Message;
            }
        }


        public List<Developers> getAll()
        {
            return _contex.developers.ToList();
        }

       public dynamic getDevelopersByIdproject(int Idproject)
        {
            List<Developers> listDeveloper = new List<Developers>();
            var projectExiste = _contex.projects.FirstOrDefault(u => u.id == Idproject);
            if (projectExiste == null)
            {
                return new { ResultStatus = "Id project not exist. " };
                
            }
            var developers = _contex.developerProject.Where(u => u.id_project == Idproject).ToList();

            if (developers == null)
            {
                return new { ResultStatus = "Project have not developer " };
            }
            foreach (var developer in developers)
            {
                var dev = _contex.developers.FirstOrDefault(u => u.id == developer.id_developer);
                listDeveloper.Add(dev);
            }
            
            return listDeveloper;
        }

        public async Task<dynamic> getprojectByIdDeveloper(int id_dev)
        {
            List<Projects> listproject = new List<Projects>();
            var devExiste = await _contex.developers.FirstOrDefaultAsync(u => u.id ==id_dev );
            if (devExiste == null)
            {
                return new { ResultStatus = "Id developer not exist. " };
            }
            var projects = await _contex.developerProject.Where(u => u.id_developer==id_dev).ToListAsync();

            if (projects == null)
            {
                return new { ResultStatus = "developer have not project " };
            }
            foreach (var project in projects)
            {
                var _project =await _contex.projects.FirstOrDefaultAsync(u => u.id == project.id_project);
                listproject.Add(_project);
            }
            return listproject;
        }

        public dynamic getDeveloperById(int id)
        {
            try
            {
               var developer = _contex.developers.FirstOrDefault(u => u.id == id);
                if (developer == null)
                {
                    return new { ResultStatus = "developer not exist. " };
                }
                return developer;
            }
            catch (Exception e)
            {
                return e.Message;
            }

        }
        public dynamic getDeveloperByUsername(string username)
        {
            try
            {
                var developer = _contex.developers.FirstOrDefault(u => u.username == username);
                if (developer == null)
                {
                    return new { ResultStatus = "developer not exist. " };
                }
                return developer;
            }
            catch (Exception e)
            {
                return e.Message;
            }

        }
        public dynamic getDeveloperByEmail(string email)
        {
            try
            {
                var developer = _contex.developers.FirstOrDefault(u => u.email==email);
                if (developer == null)
                {
                    return new { ResultStatus = "developer not exist. " };
                }
                return developer;
            }
            catch (Exception e)
            {
                return e.Message;
            }

        }

        public dynamic UpdateDeveloperName(Developers developer, string name)
        {
            try
            {
                developer.name = name;
                _contex.SaveChanges();
                return new { result = "name developer updated successfully." };
            }
            catch (Exception e)
            {
                return new { error = e.Message };
            }
        }
        public dynamic UpdateDeveloperUsername(Developers developer, string username)
        {
            try
            {
                developer.username = username;
                _contex.SaveChanges();
                return new { result = "username developer updated successfully." };
            }
            catch (Exception e)
            {
                return new { error = e.Message };
            }
        }
        public dynamic UpdateDeveloperEmail(Developers developer, string email)
        {
            try
            {
                developer.email=email;
                _contex.SaveChanges();
                return new { result = "email developer updated successfully." };
            }
            catch (Exception e)
            {
                return new { error = e.Message };
            }
        }

        public dynamic DeleteDeveloper(string username)
        {
            try
            {
                var developer = _contex.developers.FirstOrDefault(u => u.username == username);
                var _developerproject = _contex.developerProject.Where(u => u.id_developer==developer.id) ;
                if (developer == null )
                {
                    return new { ResultStatus = "developer  not exist " };
                }else if(developer!=null && _developerproject == null)
                {
                    _contex.developers.Remove(developer);
                }else {
                    foreach (var dev in _developerproject)
                    {
                        _contex.developerProject.Remove(dev);
                    }
                    _contex.developers.Remove(developer);
                  }
                _contex.SaveChanges();
                return new { ResultStatus = "developer deleted succesfully " }; ;
            }
            catch (Exception e)
            {
                return e.Message;
            }
        }

        public dynamic DeleteDeveloperOnProject(string username,int id_project)
        {
            try
            {
                var developer = _contex.developers.FirstOrDefault(u => u.username == username);
                var _developerproject = _contex.developerProject.FirstOrDefault(u => u.id_developer == developer.id && u.id_project==id_project);
                if (developer == null || _developerproject == null)
                {
                    return new { ResultStatus = "developer  not exist or not have project " };
                }
              
                _contex.developerProject.Remove(_developerproject);
                _contex.SaveChanges();
                return new { ResultStatus = "developer deleted succesfully on project" }; ;
            }
            catch (Exception e)
            {
                return e.Message;
            }
        }
    }
}
