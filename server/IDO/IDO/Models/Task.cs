using System.ComponentModel.DataAnnotations;

namespace IDO.Models
{
    public class Task
    {
        [Key]
        public int TaskId { get; set; }
        public string Title { get; set; }
        public string Category { get; set; }
        public DateTime DueDate { get; set; }
        public string Estimate { get; set; }
        public Importance Importance { get; set; }
        public Status Status { get; set; }

        public string UserId { get; set; }

        public User? User { get; set; }

    }

    public enum Importance
    {
        LOW,
        MEDIUM,
        HIGH
    }

    public enum Status
    {
        ToDo,
        Doing,
        Done
    }
}