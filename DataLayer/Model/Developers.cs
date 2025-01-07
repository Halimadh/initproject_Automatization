using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace DataLayer.Model
{
    public class Developers
    {
       [Key]public int id { get; set;}
        public string name { get; set; }
        public string username{ get; set; }
        public string email { get; set; }
        // public List<int> id_project { get; set; } 
        [JsonIgnore]
        public virtual ICollection<DeveloperProject> developerProject { get; set; }
    }
}
