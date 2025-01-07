using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataLayer.Model
{
    public class DeveloperProject
    {
        public int id_project { get; set; }
        public Projects project { get; set; }
        public int id_developer { get; set; }
        public Developers developer { get; set; }
    }
}
