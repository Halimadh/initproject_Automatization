using DataLayer.Context;
using DataLayer.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServiceLayer.Services
{
    public class ServiceFramework : IDisposable
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

        public ServiceFramework(Context contex)
        {
            _contex = contex;
        }

        public List<Frameworks> GetAll()
        {
            return _contex.frameworks.ToList();
        }
        public dynamic GetFrameWorkByType(string type)
        {
            return _contex.frameworks.FirstOrDefault(x => x.type==type);
        }

        public dynamic CreateFramework(Frameworks framework)
        {
            try
            {
                var check = _contex.frameworks.FirstOrDefault(x => x.name == framework.name);
                if (check == null)
                {
                    _contex.frameworks.Add(framework);
                    _contex.SaveChanges();
                   /*id=
                    var version = new Versions();
                    int idFramework = _contex.frameworks.FirstOrDefault(x => x.name == framework.name).id;
                    version.name = versionName;
                    version.idFramework = idFramework;
                    _contex.versions.Add(version);
                    _contex.SaveChanges(true);*/
                    return true;
                }
                return false;
            }
            catch (Exception ex)
            {
                return ex.InnerException;
            }
        }

        public dynamic DeleteFramework(string name) 
        {
            try
            {
                var check = _contex.frameworks.FirstOrDefault(x => x.name == name);
                if (check == null)
                {
                    return false;
                }
                _contex.frameworks.Remove(check);
                _contex.SaveChanges();
                return true;
            }
            catch(Exception ex)
            {
                return ex.Message;
            }
            
        }

        public dynamic GetFrameWorkById(int id)
        {
            var framework= _contex.frameworks.FirstOrDefault(x => x.id == id);
            try {
                if (framework == null)
                {
                    return new { ResultStatus = "framewort not exist" };
                }
                return framework;
            }catch(Exception ex)
            {
                return ex.Message;
            }

            
        }
        

        public Frameworks GetFrameWorkByName(string name)
        {
            return _contex.frameworks.FirstOrDefault(x => x.name == name);
        }
        public dynamic GetIdFrameworkByName(string name)
        {
            var framework = _contex.frameworks.FirstOrDefault(x=> x.name == name);
            if (framework == null)
            {
                return false;
            }
            var res = new
            {
                framework.id
            };
           return res;
        }
    }
}
