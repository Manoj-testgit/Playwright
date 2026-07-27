const {test,expect} = require("@playwright/test")


test("Api validation using put" , async function ({request})

 {
    const authdata = {
           "username" : "admin",
           "password" : "password123"
        }

    const response = await request.post("https://restful-booker.herokuapp.com/auth",{headers:{"Content-Type":
        "application/json"},data:authdata})

    const responsejson = await response.json()
    const authtoken = responsejson.token

    console.log("token is "+authtoken)

           const bookingdata = {
            "firstname" : "Jim",
            "lastname" : "Brown",
             "totalprice" : 111,
             "depositpaid" : true,
                    "bookingdates" : {
                       "checkin" : "2018-01-01",
                      "checkout" : "2019-01-01"
                  },
              "additionalneeds" : "Breakfast"
          }


    const bookingresponse = await request.post("https://restful-booker.herokuapp.com/booking",{headers:{"Content-Type":
        "application/json"},data:bookingdata})

    const bookingresponsejson = await bookingresponse.json()
    const bookingId = bookingresponsejson.bookingid
    console.log(bookingresponsejson)

    console.log("Booking Id is " +bookingId)
    

    const newbookingdata ={
         "firstname" : "Manoj", 
         "lastname" : "Kumar",
         "totalprice" : 1121,
         "depositpaid" : false,
           "bookingdates" : {
                 "checkin" : "2026-01-01",
                 "checkout" : "2026-01-01"
    },
    "additionalneeds" : "Dinner"
}

    const newbookingresponse = await request.put("https://restful-booker.herokuapp.com/booking/"+bookingId,{headers:{"Content-Type":
        "application/json","Accept":"application/json","Cookie":"token="+authtoken},data:newbookingdata})

        const newbookingjson = await newbookingresponse.json()

        console.log(newbookingjson)

        expect(newbookingjson.token)===(bookingresponsejson.token)
        expect(newbookingjson.totalprice).not.toEqual(bookingresponsejson.totalprice)
        expect(newbookingjson.additionalneeds).toBe("Dinner")


 })