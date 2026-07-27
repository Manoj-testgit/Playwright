const{test,expect} = require("@playwright/test")
const { request } = require("node:http")


test("Health monitor API" , async({request}) =>
{

    test.setTimeout(0)//setting the timeout to 0 - no timeout 


    while(true)

    {
        const start = Date.now()

        const response = await request.get("https://restful-booker.herokuapp.com/ping")

        const end = Date.now()

        const Duration = end-start

        if (Duration>2000)
        {
            throw new Error("Api respinse is slow - " +Duration)

        }
        else
        {
            console.log("the total duration of the response is " +Duration)
        }

        const responsestatus = await response.status()

        console.log("Response code of the api is " +responsestatus)

        expect(responsestatus).toBe(201)

    }

});