using DataLayer.Context;
using DataLayer.Model;
using ServiceLayer.Services;
using System.Reflection.Metadata;
using System.Text;

namespace TestProject1
{
    public class UnitTest1
    {
        public Context _contex;
      

        [Fact]
        public void TestUserAdd()
        {
            //Arrange
            ServiceUser svc = new ServiceUser(_contex);
            Users user = new Users();
            user.name = "koffi";
            user.username = "konan";
            user.pwd = System.Text.Encoding.UTF8.GetBytes("98uiJH1");
            user.email = "koffi@gmail.com";
            user.role = "simple user";

            //Act
            bool result = svc.CreateUser(user);

            //Assert
            Assert.True(result, "succes");
        }

        [Fact]
        public void TestDeveloperAdd()
        {
            //Arrange
            ServiceDevelopers svcd = new ServiceDevelopers(_contex);
            Developers dev = new Developers();
            dev.name = "koffi";
            dev.username = "konann";
            dev.email = "koffi@gmail.com";
          
            //Act
            bool result = svcd.CreateDeveloper(dev);

            //Assert
            Assert.True(result, "succes");

        }

        [Fact]
        public void testGetAllUser()
        {

            //Arrange
            ServiceUser svc = new ServiceUser(_contex);
            
            //Act
            var res=  svc.GetAllUsers();
            Console.WriteLine(res);

            //Assert
            Assert.True(res!=null);
        }
        [Fact]
        public void testGetUserByName()
        {
            //Arrange
            ServiceUser svc = new ServiceUser(_contex);
            string name = "lati";

            //Act
            var res = svc.GetUserByName(name);
            Console.WriteLine(res);

            //Assert
            Assert.True(res != null);
        }

        [Fact]
        public void testUpdateNameUser()
        {
            //Arrange
            ServiceUser svc = new ServiceUser(_contex);
            string name = "Karamoko";

            //Act


            //Assert
        }    
    }
}