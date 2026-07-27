const {test,expect} = require("@playwright/test")


test("API testing using delete" , async ({request}) =>

{

    const postData1 = {
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

    const response = await request.post("https://restful-booker.herokuapp.com/booking",{headers:{"Content-Type":
        "application/json"},data:postData1})


        const jsonresponse = await response.json()

        console.log(jsonresponse)

        const bookingId = jsonresponse.bookingid

        console.log("Booking Id is " +bookingId)
                console.log("==========================================")


        const postData2 = {
                   "username" : "admin",
                  "password" : "password123"
                  }

        const response2 = await request.post("https://restful-booker.herokuapp.com/auth", {headers:{"Content-Type":
            "application/json"},data:postData2})

        const jsonrespnse2 =  await response2.json()

        const token1 = jsonrespnse2.token

        console.log("token is "+token1)
                console.log("==========================================")


        const deleterespone = await request.delete("https://restful-booker.herokuapp.com/booking/"+bookingId,{headers:{"Content-Type":
            "application/json","Cookie":"token="+token1}})

            console.log(deleterespone.status())

            expect(deleterespone.status()).toBe(201)
            
            console.log(deleterespone.statusText())

            console.log("==========================================")


        const getresponse = await request.get("https://restful-booker.herokuapp.com/booking/"+bookingId)

        console.log(getresponse.status())

        expect(deleterespone.status()).toBe(404)

        console.log(getresponse.statusText())




})