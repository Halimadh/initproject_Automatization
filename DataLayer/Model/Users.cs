using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using XAct.Users;
using XSystem.Security.Cryptography;

namespace DataLayer.Model
{
    public class Users
    {
        [Key] public int id { get; set; }
        public string name { get; set; } = "";
        public string username { get; set; } = "";
        public byte[] pwd { get; set; }
        public string email { get; set; } = "";
        public string role { get; set; } = "";



    }
}
