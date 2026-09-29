const {test,expect} = require("@playwright/test")
const authdata = {userEmail:"manojkumarc2994@gmail.com",userPassword:"Radeon 123"}

test("testing the login api", async({request}) =>
{
    const response = await request.post("https://rahulshettyacademy.com/api/ecom/auth/login",
    {data:authdata})

    const jsonresp = await response.json()
    console.log(jsonresp)

    console.log(response.status())
})