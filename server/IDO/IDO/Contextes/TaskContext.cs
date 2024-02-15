using Microsoft.EntityFrameworkCore;

namespace IDO.Contextes
{
    public class TaskContext : DbContext
    {
        public TaskContext(DbContextOptions<TaskContext> options) : base(options) { }

        public DbSet<Models.Task> Tasks { get; set;}
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Ignore the Task entity
            modelBuilder.Ignore<Models.User>();
        }

    }
}
