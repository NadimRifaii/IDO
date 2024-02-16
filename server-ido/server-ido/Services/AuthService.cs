using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using server_ido.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text.RegularExpressions;
using System.Text;

namespace server_ido.Services
{
    public class AuthService : IAuthService
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly IConfiguration _config;

        public AuthService(UserManager<IdentityUser> userManager, IConfiguration config)
        {
            _userManager = userManager;
            _config = config;
        }
        public string GenerateTokenString(Models.User user)
        {
            IEnumerable<System.Security.Claims.Claim> claims = new List<Claim>
            {
                new Claim(ClaimTypes.Email,user.Email),
                new Claim(ClaimTypes.Role,"Admin")
            };
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config.GetSection("Jwt:Key").Value));
            SigningCredentials signingCred = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha512);
            var securityToken = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddMinutes(60),
                issuer: _config.GetSection("Jwt:Issuer").Value,
                audience: _config.GetSection("Jwt:Audience").Value,
                signingCredentials: signingCred
                );
            string tokenString = new JwtSecurityTokenHandler().WriteToken(securityToken);
            return tokenString;
        }
        public IEnumerable<Claim> DecodeJwtToken(string tokenString)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config.GetSection("Jwt:Key").Value)),
                ValidateIssuer = true,
                ValidIssuer = _config.GetSection("Jwt:Issuer").Value,
                ValidateAudience = true,
                ValidAudience = _config.GetSection("Jwt:Audience").Value,
                RequireExpirationTime = true,
                ValidateLifetime = true,
                ClockSkew = TimeSpan.Zero
            };

            SecurityToken validatedToken;
            var principal = tokenHandler.ValidateToken(tokenString, tokenValidationParameters, out validatedToken);

            var jwtToken = (JwtSecurityToken)validatedToken;
            return jwtToken.Claims;
        }
        public async Task<User> GetCurrentAuthenticatedUser(string tokenString)
        {
            var claims = DecodeJwtToken(tokenString);

            var userEmail = claims.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value;

            if (userEmail != null)
            {
                var identityUser = await _userManager.FindByEmailAsync(userEmail);
                var user = new User
                {
                    UserId = identityUser.Id,
                    UserName = identityUser.UserName,
                    Email = identityUser.Email,
                };
                return user;
            }
            return null;
        }
        public async Task<User> Login(User user)
        {
            var identityUser = await _userManager.FindByEmailAsync(user.Email);
            if (identityUser == null)
            {
                return null;
            }
            if (await _userManager.CheckPasswordAsync(identityUser, user.Password))
            {
                var currentUser = new User
                {
                    UserName = identityUser.UserName,
                    Email = identityUser.Email,
                };
                return currentUser;
            }
            return null;
        }
        public async Task<bool> Signup(User user)
        {
            if (user.UserName == "" || !IsValidEmail(user.Email))
                return false;
            var identityUser = await _userManager.FindByEmailAsync(user.Email);
            if(identityUser == null)
            {
                identityUser = new IdentityUser
                {
                    UserName = user.UserName,
                    Email = user.Email,
                };
                var result = await _userManager.CreateAsync(identityUser, user.Password);
                return result.Succeeded;
            }
            return false;
        }
        private bool IsValidEmail(string email)
        {
            string pattern = @"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$";
            return Regex.IsMatch(email, pattern);
        }
    }
}
