using IDO.Models;
using Microsoft.AspNetCore.Identity;

namespace IDO.Services
{
    public interface IAuthService
    {
        Task<Models.User> Login(Models.User user);
        string GenerateTokenString(Models.User user);
        Task<bool> Signup(Models.User user);
        Task<User> GetCurrentAuthenticatedUser(string token);
    }
}
