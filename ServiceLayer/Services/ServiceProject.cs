using DataLayer.Context;
using DataLayer.Model;
using GitLabApiClient.Models.Branches.Requests;
using GitLabApiClient.Models.Users.Responses;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServiceLayer.Services
{
    public class ServiceProject:IDisposable
    {
       private bool disposedValue;
       public Context _context;
       
       public ServiceProject(Context context)
        {
            _context = context;
        }

        public dynamic CreateProject(Projects project)
        {
            try
            {
                var checkProject = _context.projects.FirstOrDefault(u => u.nameProject == project.nameProject);
                var checkUser = _context.users.FirstOrDefault(u => u.id == project.id_user);
                if ((checkProject != null) || (checkUser == null))
                {
                    return false;
                }

                _context.projects.Add(project);
                _context.SaveChanges();
                return true;

            }
            catch (Exception e)
            {
                return e.Message;
            }
        }
        public dynamic getProjects() {
            var projects = _context.projects.ToList();

            foreach (var project in projects)
            {
                var framework = _context.users.FirstOrDefault(u => project.id_user == u.id);
                if (framework == null)
                {
                    _context.projects.Remove(project);
                }
            }
            _context.SaveChanges();

            return projects;
        }
        public dynamic getProjectsById_User( int id_user)
        {
            var userExiste = _context.users.Where(u => u.id == id_user);
            if (userExiste == null)
            {
                return false;
            }
            return _context.projects.Where(u => u.id_user == id_user).ToList();
        }
        public dynamic getProjectById(int id) {
            try
            {
                var ProjectExiste = _context.projects.FirstOrDefault(u => u.id == id);
                if (ProjectExiste==null)
                {
                    return false;
                }
                return ProjectExiste;
            }catch(Exception e)
            {
                return e.Message;
            }
        }
        public dynamic getProjectByName(string nameProject)
        {
            try
            {
                var ProjectExiste = _context.projects.FirstOrDefault(u => u.nameProject == nameProject);
                if (ProjectExiste == null)
                {
                    return false;
                }
                return ProjectExiste;
            }
            catch (Exception e)
            {
                return e.Message;
            }
        }
        public dynamic getProjectByRepository(string repoProject)
        {
            try
            {
                var repoExiste = _context.projects.FirstOrDefault(u => u.repository == repoProject);
                if (repoExiste == null)
                {
                    return false;
                }
                return repoExiste;
            }
            catch (Exception e)
            {
                return e.Message;
            }
        }
        public List<DeveloperProject> getProjectDev()
        {
            return _context.developerProject.ToList();
        }

        public dynamic updateStatutProject(Projects project,string newStatut){
            try {
                project.statut = newStatut;
                _context.SaveChanges();
                return new { result = "Statut project updated updated successfully." };



            }
            catch(Exception e)
            {
                return e.Message;
            }
        }

        public dynamic updateDescriptionProject(int id_project, string description)
        {
            try
            {
                var project = _context.projects.FirstOrDefault(u => u.id == id_project);
                if (project == null)
                {
                    return new { result = "developer not exist" };
                }

                project.description = description;
                _context.SaveChanges();
                return new { result = "Description project updated updated successfully." };



            }
            catch (Exception e)
            {
                return e.Message;
            }
        }
        public dynamic DeleteProject(string nameProject)
        {
            try
            {
                var project = _context.projects.FirstOrDefault(u => u.nameProject == nameProject);
                if (project == null)
                {
                    return false;
                }

                var existingProject = _context.projects.FirstOrDefault(u => u.id == project.id ) ;
                var dependenciesProject = _context.dependencies.Where(u => u.id_project == existingProject.id);
                var _developerproject = _context.developerProject.Where(u => u.id_project == existingProject.id);
                if (existingProject == null)
                {
                    return false;
                }
               
               if(dependenciesProject != null)
                {
                    foreach (var dependency in dependenciesProject)
                    {
                        _context.dependencies.Remove(dependency);
                    }
                }
                if (_developerproject != null)
                {
                    foreach(var d in _developerproject)
                    {
                        _context.developerProject.Remove(d);
                    }
                }
                _context.projects.Remove(project);
                _context.SaveChanges();
                return true;
            }
            catch (Exception e)
            {
                return e.Message;
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
