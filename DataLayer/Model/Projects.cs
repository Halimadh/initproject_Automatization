using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace DataLayer.Model
{
    public class Projects
    {
        [Key] public int id { get; set; }
        public string nameProject { get; set; }
        public string repository { get; set; } 
        public string framework_back { get; set; } 
        public string framework_front { get; set; } 
        public string version_back { get; set; } 
        public string version_front{ get; set; }
        public int id_user { get; set; }
        public string http_url_to_repo { get; set; }
        public string date{ get; set; }
        public string statut{ get; set; }
        public string description { get; set; } = "";
        [JsonIgnore]
        public virtual ICollection<DeveloperProject> developerProject { get; set; }

    }
}
