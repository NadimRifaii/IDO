namespace server_ido.Models
{
    public class User
    {
        public string? UserId { get; set; }

        public string? UserName { get; set; }

        public string Password { get; set; }

        public string Email { get; set; }

        public ICollection<Task>? Tasks { get; set; }
    }
}
