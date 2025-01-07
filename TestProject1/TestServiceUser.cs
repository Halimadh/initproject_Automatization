using System;
using DataLayer.Model;
using InitProject.Controllers;
using DataLayer.Context;
using Moq;
using ServiceLayer.Services.IServices;

namespace TestProject1
{
    public class TestServiceUser
    {
        public Mock<IServiceUser> mock = new Mock<IServiceUser>();

        [Fact]
        public async Task TestUserAdd()
        {
            //Arrange
            UserController userControl = new UserController(mock.Object);

            var nbrUserBeforeAdd = await userControl.GetCountUser();


            // Act
            var resultAddUser = await userControl.CreateUser(
                            "koffi", 
                            "konan", 
                            "98uiJH1",
                            "koffi@gmail.com",
                            "simple user"
                            );



            //Assert
            var converBool = bool.TryParse(resultAddUser.ToString(), out bool _);

            if (converBool == false)
                Assert.True(false);

            var nbrUserAfterAdd = await userControl.GetCountUser();

            Assert.True((nbrUserBeforeAdd + 1 ) == nbrUserAfterAdd);

        }
    }
}
