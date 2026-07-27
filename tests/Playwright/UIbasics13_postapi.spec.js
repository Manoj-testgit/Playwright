const {test,expect} = require ("@playwright/test")
const { log } = require("node:console")
const { request } = require("node:http")


test("Testing post API with token and booking id" , async function ({request})
{
    const authdata = {
          "username" : "admin",    //if i send invalid credentials, we will still get response 200 
          "password" : "password123" //but it shows bad credentials 
        }
  
    
    const response = await request.post("https://restful-booker.herokuapp.com/auth",{headers:{"Content-Type":"application/json"},data:authdata})

    console.log(await response.status())
    console.log(await response.json())
    const reponseData = await response.json()

    expect(reponseData.token).not.toBeNull()
    
})

test("Testing post api with booking", async function({request})
{
    const bookingdata = {
      "firstname" : "Manoj",
      "lastname" : "Kumar",
      "totalprice" : 116,
      "depositpaid" : true,
      "bookingdates" : {
           "checkin" : "2026-07-05",
           "checkout" : "2019-07-20"
        },
    "additionalneeds" : "Lunch"
    }

    const response = await request.post("https://restful-booker.herokuapp.com/booking",
        {headers:{"Content-Type":"application/json"},data:bookingdata})
    
    console.log(response.status())

    const responsedata = await response.json()
    console.log (responsedata)

    expect(responsedata.bookingid).not.toBeNull()
    expect(responsedata.booking.firstname).toBe(bookingdata.firstname)
    expect(responsedata.booking.bookingdates.checkin).toBe(bookingdata.bookingdates.checkin)



})
