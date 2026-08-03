const {test,expect,request} = require("@playwright/test")

const authdata = {userEmail:"manojkumarc2994@gmail.com",userPassword:"Radeon 123"}

test("Login with API", async({request}) =>
{
    const loginresponse = await request.post("https://rahulshettyacademy.com/api/ecom/auth/login",
        {data:authdata})

    const jsonrespone =   await loginresponse.json()
    
    console.log(jsonrespone)
    console.log(loginresponse.status())

})



let token;
test.beforeAll( async() =>
{
    const apicontext = await request.newContext();
    const loginresponse = await apicontext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
        {data:authdata})

        const jsonrespone =   await loginresponse.json()

    console.log(jsonrespone)

    console.log(loginresponse.status())
    token = jsonrespone.token;
    //console.log(token)

})

test("Login with API with page load and calling back", async({page}) =>
{
    page.addInitScript(value=>
    {
        window.localStorage.setItem('token',value);
    },
    token)


})

test.only("Login with API with page load",async ({page}) =>
{
    const apicontext = await request.newContext();
    const loginresponse = await apicontext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
        {data:authdata})

        const jsonrespone =   await loginresponse.json()

    console.log(jsonrespone)

    console.log(loginresponse.status())
    

})


