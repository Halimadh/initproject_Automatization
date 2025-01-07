using DataLayer.Context;
using Microsoft.AspNetCore.Mvc;
using Org.BouncyCastle.Ocsp;
using PdfSharpCore;
using PdfSharpCore.Pdf;
using TheArtOfDev.HtmlRenderer.PdfSharp;

namespace InitProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class generatorpdfController:ControllerBase
    {
        

        [HttpPost("GeneratePdf")]
        public async Task<IActionResult> generatorPdf(string namepreject,string namerepository, string frameworkBackend, string versionBackend, string frameworkFrontend, string versionFrontend,string content )
        {
            var document = new PdfSharpCore.Pdf.PdfDocument();
            string Header= "<!DOCTYPE html>\r\n<html lang=\"en\">\r\n\r\n<head><meta charset=\"UTF-8\">\r\n    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">\r\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\r\n<link rel=\"stylesheet\" href=\"path/to/font-awesome/css/font-awesome.min.css\">    <title>Document</title>\r\n<style>\r\nh1 {color:blue; font-size:30px;}\r\n span{color: red; font-size:24px ;}\r\n .label1{color: black; font-size:19px ;}\r\n .label2{color: black; font-size:18px ;}\r\n</style>\r\n</head>";
            string htmlContent = Header +
               "<body> <h1>Manuel d'utilisation</h1>" +
                "<span>Les informations sur le projet</span><br>" +
                "<div><label class='label1'>Name project : </label><label class='label2'>" + namepreject + "</label></div><br>\r\n" +
                "<div><label class='label1'>Name repository : </label><label class='label2'>" + namerepository + "</label></div><br>\r\n" +
                "<div><label class='label1'>FrameworkBackend : </label><label class='label2'>" + frameworkBackend + "</label></div><br>\r\n" +
                "<div><label class='label1'>Version FrameworkBackend : </label><label class='label2'>" + versionBackend + "</label></div><br>\r\n" +
                "<div><label class='label1'>FrameworkFrontend : </label><label class='label2'>" + frameworkFrontend + "</label></div><br>\r\n" +
                "<div><label class='label1'>Version FrameworkFrontend : </label><label class='label2'>" + versionFrontend + "</label></div><br>\r\n" +

                "<span>Les configuration necessaire du projet</span> <br>" + content 
                ;
            PdfGenerator.AddPdfPages(document, htmlContent, pageSize: PageSize.A4);
            byte[]? response = null;
           using(MemoryStream stream=new MemoryStream())
            {
                document.Save(stream);
                response = stream.ToArray();
            }
            string fileName = "manuel.pdf";
           return Ok(File(response, "application/pdf", fileName));
           // return Ok(Convert.ToBase64String(response));
      

        }
    }
}
