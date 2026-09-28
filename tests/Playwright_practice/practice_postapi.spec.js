const {test,expect} = require("@playwright/test")

const authData = {"username" : "admin","password" : "password123"}

test ("testing post api " , async({request}) =>
{
        //test.fail() //use this when the expected behavior is to fail 
    const response  = await request.post("https://restful-booker.herokuapp.com/auth",
    {headers:{"Content-Type": "application/json"},data:authData})
    const jsonresp = await response.json()
    console.log(jsonresp)

    expect(jsonresp.token).not.toBeNull()

});