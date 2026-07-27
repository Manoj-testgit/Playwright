const {test,expect} = require("@playwright/test")
const file = JSON.parse(JSON.stringify(require("../../testdata3.json")))

test("Api validate from json" , async ({request}) =>
{
    

    const response = await request.post("https://restful-booker.herokuapp.com/booking",{headers:{"Content-Type":
        "application/json"},data:file})

    const jsonresponse = await response.json()

    console.log(jsonresponse)

    expect(jsonresponse.bookingid).not.toBeNull()
    expect(jsonresponse.booking.firstname).toBe("Manoj")

});