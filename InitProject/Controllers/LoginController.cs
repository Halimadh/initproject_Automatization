using DataLayer.Context;
using DataLayer.Model;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using ServiceLayer.Services;
using System.IdentityModel.Tokens.Jwt;
using System.Net.Mail;
using System.Net;
using System.Security.Claims;
using System.Text;
using XAct.Users;

namespace InitProject.Controllers
{
    [Route("api/Login")]
    [ApiController]
    public class LoginController : ControllerBase
    {


        public Context _contex;

        public LoginController(Context contex)
        {
            _contex = contex;
        }

        [HttpPost]
        public dynamic VerifyAuthentification(string username, string password)
        {
            Users user = new Users();
            user.pwd = System.Text.Encoding.UTF8.GetBytes(password);
            user.username = username;

            using (ServiceLogin srv = new ServiceLogin(_contex))
            {
                return srv.Authentificate(user);
            }
        }

        [HttpPost("sendEmail")]
        public void SendVerificationLinkEmail(string email,string password,string username)

        {

           // var verifyUrl = "/labo/" + emailFor;
           // var link = Url.Action(verifyUrl);

            var fromEmail = new MailAddress("hkdaniogo21@gmail.com");
            var toEmail = new MailAddress(email);
            var fromEmailPassword = "qthx qthg mcvf ctzs"; // Replace with actual password

           
            string subject = "Your account is successfully created!";
            string body = "<br/><br/>We are excited to tell you that your account is" +
                " successfully created.<br/>" +
                " Your username =" + username + "<br/>" +
                "Your password =" + password;
            /*if (emailFor == "VerifyAccount")
            {
                subject = "Your account is successfully created!";
                body = "<br/><br/>We are excited to tell you that your account is" +
                    " successfully created.<br/>" +
                    " Your username =" + username + "<br/>" +
                    "Your password ="+password;

            }
            else if (emailFor == "ResetPassword")
            {
                subject = "Reset Password";
                body = "Hi,<br/>br/>We got request for reset your account password. Please click on the below link to reset your password" +
                    "<br/><br/><a href=" + link + ">Reset Password link</a>";
            }
            */

            var smtp = new SmtpClient
            {
                Host = "smtp.gmail.com",
                Port = 587,
                EnableSsl = true,
                DeliveryMethod = SmtpDeliveryMethod.Network,
                UseDefaultCredentials = false,
                Credentials = new NetworkCredential(fromEmail.Address, fromEmailPassword),
               
               
            };

            using (var message = new MailMessage(fromEmail, toEmail)
            {
                Subject = subject,
                Body = body,
                IsBodyHtml = true
            })
                smtp.Send(message);


        }

}
}
