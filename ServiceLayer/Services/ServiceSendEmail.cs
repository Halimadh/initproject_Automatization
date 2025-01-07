using MailKit.Security;
using Microsoft.Extensions.Configuration;
using MimeKit;
using MimeKit.Text;
using Newtonsoft.Json;
using Octokit;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;



namespace ServiceLayer.Services
{
    public class ServiceSendEmail : IDisposable
    {
        private bool disposedValue;

        private IConfiguration configuration;

        public ServiceSendEmail(IConfiguration configuration)
        {
            this.configuration = configuration;
        }
        protected virtual void Dispose(bool disposing)
        {
            if (!disposedValue)
            {
                if (disposing) { }
                disposedValue = true;
            }
        }
        public void Dispose()
        {
            Dispose(disposing: true);
            GC.SuppressFinalize(this);
        }

        
        public async Task<dynamic> SendSendingBlueEmail(string emailTo) 
        {
            try
            {
                var emailFrom = configuration.GetSection("SendinBlueSettings").GetSection("sender").GetSection("sender-mail").Value;
                var passwordFrom = configuration.GetSection("SendinBlueSettings").GetSection("sender").GetSection("sender-password").Value;
                var subject = configuration.GetSection("SendinBlueSettings").GetSection("email").GetSection("mail-subject").Value;
                var body = configuration.GetSection("SendinBlueSettings").GetSection("email").GetSection("mail-body").Value;
                var apiUrl = configuration.GetSection("SendinBlueSettings").GetSection("platform").GetSection("apiUrl").Value;
                var apiKey = configuration.GetSection("SendinBlueSettings").GetSection("platform").GetSection("api-key").Value;

                var client = new HttpClient();
                var request = new HttpRequestMessage(HttpMethod.Post, apiUrl);

                request.Headers.Add("api-key", apiKey);

                var message = new MailMessage
                {
                    From = new MailAddress(emailFrom, ""),
                    To = { new MailAddress(emailTo, "") },
                    Subject = subject,
                    Body = body
                };

                var json = JsonConvert.SerializeObject(new
                {
                    sender = new
                    {
                        name = message.From.DisplayName,
                        email = message.From.Address
                    },
                    to = new[] {
                    new {
                        name = message.To[0].DisplayName,
                        email = message.To[0].Address
                    }
                },
                    subject = message.Subject,
                    textContent = message.Body
                });

                request.Content = new StringContent(json, Encoding.UTF8, "application/json");

                var response = await client.SendAsync(request);

                if (response.IsSuccessStatusCode)
                {
                    return"Email sent successfully to "+emailTo;
                }
                else
                {
                    var content = await response.Content.ReadAsStringAsync();
                    return $"Email sending failed: {content}";
                }

            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }
        public dynamic SendEmails(string emailTo,string repo)
        {

            try
            {
                var emailFrom = configuration.GetSection("SimpleEmailSettings").GetSection("sender").GetSection("sender-mail").Value;
                var passwordFrom = configuration.GetSection("SimpleEmailSettings").GetSection("sender").GetSection("sender-password").Value;
                var subject = configuration.GetSection("SimpleEmailSettings").GetSection("email").GetSection("mail-subject").Value;
                var body = configuration.GetSection("SimpleEmailSettings").GetSection("email").GetSection("mail-body").Value;
                var smtpServer = configuration.GetSection("SimpleEmailSettings").GetSection("server").GetSection("smtpServer").Value;
                var Port = configuration.GetSection("SimpleEmailSettings").GetSection("server").GetSection("port").Value;
                var url = configuration.GetSection("accessToken").GetSection("gitlabURL").Value;
                string href = url + repo;
                int serverPort = Int32.Parse(Port);

                using (MimeMessage mail = new MimeMessage())
                {
                    mail.From.Add(MailboxAddress.Parse(emailFrom ?? emailTo));
                    mail.To.Add(MailboxAddress.Parse(emailTo));
                    mail.Subject = subject;
                    string html = "<!doctype html><html>  <head>    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\"/>    <meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\" />    <title>Simple Transactional Email</title>    <style>      /* -------------------------------------          GLOBAL RESETS      ------------------------------------- */            /*All the styling goes here*/            img {        border: none;        -ms-interpolation-mode: bicubic;        max-width: 100%;       }      body {        background-color: #f6f6f6;        font-family: sans-serif;        -webkit-font-smoothing: antialiased;        font-size: 14px;        line-height: 1.4;        margin: 0;        padding: 0;        -ms-text-size-adjust: 100%;        -webkit-text-size-adjust: 100%;       }      table {        border-collapse: separate;        mso-table-lspace: 0pt;        mso-table-rspace: 0pt;        width: 100%; }        table td {          font-family: sans-serif;          font-size: 14px;          vertical-align: top;       }      /* -------------------------------------          BODY & CONTAINER      ------------------------------------- */      .body {        background-color: #f6f6f6;        width: 100%;       }      /* Set a max-width, and make it display as block so it will automatically stretch to that width, but will also shrink down on a phone or something */      .container {        display: block;        margin: 0 auto !important;        /* makes it centered */        max-width: 580px;        padding: 10px;        width: 580px;       }      /* This should also be a block element, so that it will fill 100% of the .container */      .content {        box-sizing: border-box;        display: block;        margin: 0 auto;        max-width: 580px;        padding: 10px;       }      /* -------------------------------------          HEADER, FOOTER, MAIN      ------------------------------------- */      .main {        background: #ffffff;        border-radius: 3px;        width: 100%;       }      .wrapper {        box-sizing: border-box;        padding: 20px;       }      .content-block {        padding-bottom: 10px;        padding-top: 10px;      }      .footer {        clear: both;        margin-top: 10px;        text-align: center;        width: 100%;       }        .footer td,        .footer p,        .footer span,        .footer a {          color: #999999;          font-size: 12px;          text-align: center;       }      /* -------------------------------------          TYPOGRAPHY      ------------------------------------- */      h1,      h2,      h3,      h4 {        color: #000000;        font-family: sans-serif;        font-weight: 400;        line-height: 1.4;        margin: 0;        margin-bottom: 30px;       }      h1 {        font-size: 35px;        font-weight: 300;        text-align: center;        text-transform: capitalize;       }      p,      ul,      ol {        font-family: sans-serif;        font-size: 14px;        font-weight: normal;        margin: 0;        margin-bottom: 15px;       }        p li,        ul li,        ol li {          list-style-position: inside;          margin-left: 5px;       }      a {        color: #3498db;        text-decoration: underline;       }      /* -------------------------------------          BUTTONS      ------------------------------------- */      .btn {        box-sizing: border-box;        width: 100%; }        .btn > tbody > tr > td {          padding-bottom: 15px; }        .btn table {          width: auto;       }        .btn table td {          background-color: #ffffff;          border-radius: 5px;          text-align: center;       }        .btn a {          background-color: #ffffff;          border: solid 1px #3498db;          border-radius: 5px;          box-sizing: border-box;          color: #3498db;          cursor: pointer;          display: inline-block;          font-size: 14px;          font-weight: bold;          margin: 0;          padding: 12px 25px;          text-decoration: none;          text-transform: capitalize;       }      .btn-primary table td {        background-color: #3498db;       }      .btn-primary a {        background-color: #3498db;        border-color: #3498db;        color: #ffffff;       }      /* -------------------------------------          OTHER STYLES THAT MIGHT BE USEFUL      ------------------------------------- */      .last {        margin-bottom: 0;       }      .first {        margin-top: 0;       }      .align-center {        text-align: center;       }      .align-right {        text-align: right;       }      .align-left {        text-align: left;       }      .clear {        clear: both;       }      .mt0 {        margin-top: 0;       }      .mb0 {        margin-bottom: 0;       }      .preheader {        color: transparent;        display: none;        height: 0;        max-height: 0;        max-width: 0;        opacity: 0;        overflow: hidden;        mso-hide: all;        visibility: hidden;        width: 0;       }      .powered-by a {        text-decoration: none;       }      hr {        border: 0;        border-bottom: 1px solid #f6f6f6;        margin: 20px 0;       }      /* -------------------------------------          RESPONSIVE AND MOBILE FRIENDLY STYLES      ------------------------------------- */      @media only screen and (max-width: 620px) {        table.body h1 {          font-size: 28px !important;          margin-bottom: 10px !important;         }        table.body p,        table.body ul,        table.body ol,        table.body td,        table.body span,        table.body a {          font-size: 16px !important;         }        table.body .wrapper,        table.body .article {          padding: 10px !important;         }        table.body .content {          padding: 0 !important;         }        table.body .container {          padding: 0 !important;          width: 100% !important;         }        table.body .main {          border-left-width: 0 !important;          border-radius: 0 !important;          border-right-width: 0 !important;         }        table.body .btn table {          width: 100% !important;         }        table.body .btn a {          width: 100% !important;         }        table.body .img-responsive {          height: auto !important;          max-width: 100% !important;          width: auto !important;         }      }      /* -------------------------------------          PRESERVE THESE STYLES IN THE HEAD      ------------------------------------- */      @media all {        .ExternalClass {          width: 100%;         }        .ExternalClass,        .ExternalClass p,        .ExternalClass span,        .ExternalClass font,        .ExternalClass td,        .ExternalClass div {          line-height: 100%;         }        .apple-link a {          color: inherit !important;          font-family: inherit !important;          font-size: inherit !important;          font-weight: inherit !important;          line-height: inherit !important;          text-decoration: none !important;         }        #MessageViewBody a {          color: inherit;          text-decoration: none;          font-size: inherit;          font-family: inherit;          font-weight: inherit;          line-height: inherit;        }        .btn-primary table td:hover {          background-color: #34495e !important;         }        .btn-primary a:hover {          background-color: #34495e !important;          border-color: #34495e !important;         }       }    </style>  </head>  <body>  <table role=\"presentation\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" class=\"body\">      <tr>        <td>&nbsp;</td>        <td class=\"container\">          <div class=\"content\">            <!-- START CENTERED WHITE CONTAINER -->            <table role=\"presentation\" class=\"main\">              <!-- START MAIN CONTENT AREA -->              <tr>                <td class=\"wrapper\">                  <table role=\"presentation\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\">                    <tr>                      <td>                        <p>Hi there,</p>                        <p>Your projected is successfully created and pushed to Gitlab !</p>                        <table role=\"presentation\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" class=\"btn btn-primary\">                          <tbody>                            <tr>                              <td align=\"left\">                                <table role=\"presentation\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\">                                  <tbody>                                    <tr>                                      <td> <a href=\'" + href + "' target=\"_blank\">Go to the project repository</a> </td>                                    </tr>                                  </tbody>                                </table>                              </td>                            </tr>                          </tbody>                        </table>                        <p></p>                        <p>Good luck!</p>                      </td>                    </tr>                  </table>                </td>              </tr>            <!-- END MAIN CONTENT AREA -->            </table>            <!-- END CENTERED WHITE CONTAINER -->            <!-- START FOOTER -->            <div class=\"footer\">              <table role=\"presentation\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\">                <tr>                  <td class=\"content-block\">                    <span class=\"apple-link\">DESIGNED BY FLESK.</span>                  </td>                </tr>              </table>            </div>          </div>        </td>        <td>&nbsp;</td>      </tr>    </table>  </body></html>";

                    mail.Body = new TextPart(TextFormat.Html) { Text = html };

                        using var smtp = new MailKit.Net.Smtp.SmtpClient();
                        smtp.Connect("smtp.gmail.com", Int16.Parse("587"), SecureSocketOptions.StartTls);
                        smtp.Authenticate(emailTo, passwordFrom);
                        smtp.Send(mail);
                        smtp.Disconnect(true);
                        return "mail sent successfully";
                    
                }

            }
            catch (Exception ex)
            {
                return "sending email failed : " + ex.Message + ex.StackTrace;
            }
        }


    }
}
