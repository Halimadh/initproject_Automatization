using DataLayer.Context;
using DataLayer.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServiceLayer.Services
{
    public class ServiceDependencies:IDisposable
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
        public ServiceDependencies(Context contex)
        {
            _contex = contex;
        }
        public dynamic CreateDependency(Dependencies dependency)
        {
            try
            {
                var check = _contex.dependencies.Where(x => x.id_project == dependency.id_project).FirstOrDefault(x => x.name == dependency.name) ;
                if (check == null)
                {
                    _contex.dependencies.Add(dependency);
                    _contex.SaveChanges();
                    return true;
                }
                return false;
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }
        public List<Dependencies> getAll() {
            return _contex.dependencies.ToList();
       }
        
        public dynamic getDependenciesByIdproject( int Idproject)
        {
            var userExiste = _contex.projects.Where(u => u.id == Idproject);
            if (userExiste == null)
            {
                return  false;
            }
            return _contex.dependencies.Where(u => u.id_project == Idproject).ToList();
       }

        public dynamic getDependencyById(int id)
        {
            try
            {
                var dependency = _contex.dependencies.FirstOrDefault(u => u.id == id);
                if (dependency == null)
                {
                    return new { ResultStatus = "dependency  not exist. " };
                }
                return dependency;
            } 
            catch (Exception e)
            {
                return e.Message;
            }
          
        }
        public dynamic UpdateDependencyName(Dependencies dependency, string name)
        {
            try
            {
                dependency.name = name;
               _contex.SaveChanges();
                return new { result = "name dependency updated successfully." };
            }
            catch (Exception e)
            {
                return new { error = e.Message };
            }
        }
        public dynamic UpdateDependencyVersion(Dependencies dependency, string version)
        {
            try
            {
                dependency.version=version;
                _contex.SaveChanges();
                return new { result = "Version dependency updated successfully." };
            }
            catch (Exception e)
            {
                return new { error = e.Message };
            }
        }
        public dynamic UpdateDependencyType(Dependencies dependency, string type)
        {
            try
            {
                dependency.type=type;
                _contex.SaveChanges();
                return new { result = "Type dependency updated successfully." };
            }
            catch (Exception e)
            {
                return new { error = e.Message };
            }
        }
        public dynamic DeleteDependency(int id)
        {
            try
            {
                var dependency = _contex.dependencies.FirstOrDefault(u => u.id == id);
                if (dependency == null)
                {
                    return new { ResultStatus = "dependency  not exist. " };
                }
                _contex.dependencies.Remove(dependency);
                _contex.SaveChanges();
                return new { ResultStatus = "dependency deleted succesfullys " };
            }
            catch (Exception e)
            {
                return e.Message;
            }
        }
    }
     
}
