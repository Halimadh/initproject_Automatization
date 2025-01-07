using DataLayer.Context;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServiceLayer.Services
{
    public class ServiceGeneratorPdf
    {
        public IConfiguration _configuration;
        public Context _context;
        ServiceGeneratorPdf(IConfiguration config,Context context)
        {
            this._configuration = config;
            this._context = context;
        }
        
    }
}
