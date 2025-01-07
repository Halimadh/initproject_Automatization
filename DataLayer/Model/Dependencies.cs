using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataLayer.Model
{
    public class Dependencies
    {
        [Key] public int id { get; set;}
        public string name { get; set; }
        public string version { get; set; }
        public string type { get; set; }
        public int id_project { get; set; }

    }
}
