using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataLayer.Model
{
    public class Versions
    {
        [Key] public int id {  get; set; }
        public string name { get; set; }
        public int idFramework { get; set; }
    }
}
