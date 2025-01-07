/*
CREATE TABLE users (
   ID INT IDENTITY(1,1) PRIMARY KEY,
   name VARCHAR(100) NOT NULL,
   username VARCHAR(100) NOT NULL UNIQUE,
   pwd VARBINARY(128) NOT NULL ,
)


/* FUNCTION THAT CRYPT A PASSWORD (can be used in the .Net program in the register part)*/
/*using the SHA2_512 : more secured that SHA1 or MD5
(the salt value is entered as a parameter because Sql server has refused salt generator 
functions for security reasons. */

CREATE VIEW vw_getCrypt_Gen
AS
SELECT CRYPT_GEN_RANDOM(32) AS Value

*/

CREATE FUNCTION [dbo].[HashPwd]( @password NVARCHAR(128))
RETURNS VARBINARY(128)
AS
BEGIN
    DECLARE @saltedPassword NVARCHAR(256)

    DECLARE @salt VARBINARY(128) = (SELECT Value from vw_getCrypt_Gen)

    DECLARE @saltString NVARCHAR(32) = CONVERT(NVARCHAR(32), @salt, 2)
    SET @saltedPassword = @saltString + @password
    RETURN HASHBYTES('SHA2_512', @saltedPassword)
END


/*test*/
/*

INSERT INTO users (name, username, pwd)
VALUES ('arwaB', 'test test1', dbo.HashPwd('0123456789arwa'))
*/

