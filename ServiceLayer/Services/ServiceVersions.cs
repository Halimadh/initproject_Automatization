using DataLayer.Context;
using DataLayer.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServiceLayer.Services
{
    public class ServiceVersions : IDisposable
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
        public ServiceVersions(Context contex)
        {
            _contex = contex;
        }
        public bool CreateVersion(Versions version)
        {
            var checkFramework = _contex.frameworks.FirstOrDefault(x => x.id == version.idFramework);
            var checkVersion = _contex.versions.Where(x => x.idFramework == version.idFramework).FirstOrDefault(x => x.name == version.name);
            if (checkFramework == null)
            {
                return false;
            }
            if (checkVersion == null)
            {
                _contex.versions.Add(version);
                _contex.SaveChanges();
                return true;
            }
            return false;
        }
        public List<Versions> GetAll()
        {
            return _contex.versions.ToList();

            /*foreach (var version in versions)
            {
                var framework = _contex.frameworks.FirstOrDefault(u => version.idFramework == u.id);
                if (framework == null)
                {
                    _contex.versions.Remove(version);
                }
            }
                _contex.SaveChanges();*/
            
            
        }
        public List<Versions> GetVersionByFramworkId(int idFramework)
        {
            return _contex.versions.Where(x => x.idFramework == idFramework).ToList();
        }
        public Versions GetVersionById(int id)
        {
            return _contex.versions.FirstOrDefault(x => x.id == id);
        }
        public List<Versions> GetVersionByFramework(int idFramework)
        {
            var framework = _contex.frameworks.FirstOrDefault(x => x.id == idFramework);
            
            if (framework == null)
            {
                var version = _contex.versions.FirstOrDefault(y => y.idFramework == framework.id);
                this.DeleteVersion (version);
                return null;
            }
            else
            {
                return _contex.versions.Where(x => x.idFramework == framework.id).ToList();

            }
        }

        public bool DeleteVersion(Versions version)
        {
            _contex.versions.Remove(version);
            _contex.SaveChanges();
            return true;
        }

        public bool DeleteVersionByIdFramework(int idFramework)
        {
            List<Versions> versionList = _contex.versions.Where(x => x.idFramework == idFramework).ToList();
            foreach (Versions version in versionList)
            {
                _contex.versions.Remove(version);
                _contex.SaveChanges();
            }

            return true;
        }


    }
}
