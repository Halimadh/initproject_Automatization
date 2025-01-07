using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ServiceLayer.Services;

namespace InitProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SendEmailController : ControllerBase
    {
        private IConfiguration configuration;

        public SendEmailController(IConfiguration iConfig)
        {
            configuration = iConfig;
        }
        [HttpPost("SendSendinBlue")]
        public async Task<dynamic> SendSendinBlue(string emailTo)
        {
            using (ServiceSendEmail srv = new ServiceSendEmail(configuration))
            {
                var test = await srv.SendSendingBlueEmail(emailTo);
                return Ok(test);
            }
        }
        [HttpPost("SendEmail")]
        public dynamic SendSimpleEmails(string emailTo,string repo)
        {
            using (ServiceSendEmail srv = new ServiceSendEmail(configuration))
            {
                return (srv.SendEmails(emailTo,repo));

            }
        }
    }
}
