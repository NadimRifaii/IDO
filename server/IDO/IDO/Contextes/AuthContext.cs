using Microsoft.EntityFrameworkCore.Query.Internal;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using IDO.Models;
using Task = IDO.Models.Task;
namespace IDO.Contextes
{
    public class AuthContext : IdentityDbContext
    {
        public AuthContext(DbContextOptions<AuthContext> options): base(options) { }

        public DbSet<User> User { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Ignore the Task entity
            modelBuilder.Ignore<Task>();
        }
    }
}
