using server_ido.Models;

namespace server_ido.Services
{
    public interface IAuthService
    {
        Task<Models.User> Login(User user);
        string GenerateTokenString(User user);
        Task<bool> Signup(User user);
        Task<User> GetCurrentAuthenticatedUser(string token);
    }
}
