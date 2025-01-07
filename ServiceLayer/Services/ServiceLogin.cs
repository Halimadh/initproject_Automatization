using DataLayer.Context;
using DataLayer.Model;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using System.Security.Cryptography;
using XAct.Users;


namespace ServiceLayer.Services
{
    public class ServiceLogin : IDisposable
    {
        private bool disposedValue;

        public Context _contex;

        public ServiceLogin(Context contex)
        {
            _contex = contex;
        }


        public byte[] GenerateSecretKey()
        {
            byte[] key = new byte[32];
            using (RandomNumberGenerator random =  RandomNumberGenerator.Create())
            {
                 random.GetBytes(key);
            }
            return key;
        }


        public dynamic GenerateToken(Users user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = GenerateSecretKey(); //generer un clé secret
            var tokenDescriptor = new SecurityTokenDescriptor //generer le token
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                        new Claim(ClaimTypes.Name, user.username),
                        new Claim(ClaimTypes.NameIdentifier, user.id.ToString())
                }),

                //setting expiration time for security
                Expires = DateTime.UtcNow.AddDays(7),

                //ensure the JWT 
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);

        }


        public object Authentificate(Users userInput)
        {
            try
            {
                var user = _contex.users.SingleOrDefault(x => x.username == userInput.username && x.pwd == userInput.pwd);

                //tester l'existance du user
                if (user == null)
                {
                    return false;
                }

                //authentification réussi: générer un JWT
                var token = GenerateToken(user);

                //send all user's infos except password
                var userToSend = _contex.users
                    .Where(u => u.username == userInput.username && u.pwd == userInput.pwd)
                    .Select(u => new
                    {
                        u.id,
                        u.name,
                        u.username,
                        u.email,
                        u.role
                    })
                    .SingleOrDefault();

                // Send token to the user
                return new { Token = token, User = userToSend };
            }
            catch(Exception ex)
            {
                return new { Message = ex.Message };
            }
        }


        protected virtual void Dispose(bool disposing)
        {
            if (!disposedValue)
            {
                if (disposing)
                {
                    // TODO: supprimer l'état managé (objets managés)
                }

                // TODO: libérer les ressources non managées (objets non managés) et substituer le finaliseur
                // TODO: affecter aux grands champs une valeur null
                disposedValue = true;
            }
        }
        public void Dispose()
        {
            Dispose(disposing: true);
            GC.SuppressFinalize(this);
        }
    }
}
