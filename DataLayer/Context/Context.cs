using DataLayer.Model;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using XAct.Users;

namespace DataLayer.Context
{
    public class Context : DbContext
    {
    
        public Context(DbContextOptions<Context> options) : base(options)
        {
        }

        public DbSet<Users> users { get; set; }
        public DbSet<Projects> projects { get; set; }
        public DbSet<Frameworks> frameworks { get; set; }
        public DbSet<Versions> versions { get; set; }
        public DbSet<Dependencies> dependencies { get; set; }
        public DbSet<Developers> developers { get; set; }
        public DbSet<DeveloperProject> developerProject { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
           
            modelBuilder.Entity<Users>()
              .ToTable("users");
            modelBuilder.Entity<Projects>()
              .ToTable("projects");
            modelBuilder.Entity<Frameworks>()
              .ToTable("frameworks");
            modelBuilder.Entity<Versions>()
              .ToTable("versions");
            modelBuilder.Entity<Dependencies>()
              .ToTable("dependencies");
            modelBuilder.Entity<Developers>()
              .ToTable("developers");
            modelBuilder.Entity<DeveloperProject>()
              .ToTable("developerProject");
            modelBuilder.Entity<DeveloperProject>()
              .HasKey(bc => new { bc.id_project, bc.id_developer });
            modelBuilder.Entity<DeveloperProject>()
              .HasOne(bc => bc.project)
              .WithMany(b => b.developerProject)
              .HasForeignKey(bc => bc.id_project);
            modelBuilder.Entity<DeveloperProject>()
              .HasOne(bc => bc.developer)
              .WithMany(b => b.developerProject)
              .HasForeignKey(bc => bc.id_developer);




        }

    }

   
   

}
