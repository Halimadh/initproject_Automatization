using DataLayer.Context;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServiceLayer.Services
{
    public class ServiceRun:IDisposable
    {
        private bool disposedValue;
        string output;
        int port=4201;
     
        private IConfiguration configuration;
        public Context _context;

        public ServiceRun(IConfiguration iConfig, Context context)
        {
            configuration = iConfig;
            _context = context;

        }
        public dynamic runProject(string nameProject,string type)
        {
          
         
            try
            {
                Random aleatoire = new Random();
               port = aleatoire.Next(4201, 65535);
                var check = _context.projects.FirstOrDefault(x => x.nameProject == nameProject);
                
                if (check != null)
                {
                    ProcessStartInfo startInfo = new ProcessStartInfo();
                    startInfo.WorkingDirectory = configuration.GetSection("CmdSetting").GetSection("workingDirectory").Value+nameProject;
                    startInfo.FileName = configuration.GetSection("CmdSetting").GetSection("fileName").Value;
                    if (type == "Angular") {
                        startInfo.Arguments = "/c " + configuration.GetSection("RunSetting").GetSection("Angular").GetSection("cmd").Value + " --port " + port;
                    }
                    else
                    {
                        startInfo.Arguments = "/c " + configuration.GetSection("RunSetting").GetSection("ReactJS").GetSection("cmd").Value;
                    }
                   
                    startInfo.UseShellExecute = false;
                    startInfo.RedirectStandardOutput = true;
                    Process process = new Process();
                    process.StartInfo = startInfo;
                    process.Start();
                    output = process.StandardOutput.ReadToEnd();
                    Console.WriteLine(output);
             
                }
                return output;
              
            }
            catch (Exception e)
            {
                return e.InnerException;
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
