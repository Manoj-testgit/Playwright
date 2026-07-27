const {test,expect} = require("@playwright/test")

test("Test Get API", async function({request})
{
    const resp = await request.get("https://jsonplaceholder.typicode.com/posts/1")
    //console.log(resp)

    const respbody = await resp.body()//this gives buffer data, not in json format 
    //console.log(respbody)

    const respjson =await resp.json()
    //console.log(respjson)//get the response as json body 

    const respheaders = resp.headers() //no need to await here as it does give back
    // any promises
    //console.log(respheaders)

    const respheaderarry = resp.headersArray()
    //console.log(respheaderarry)

    const respstatus = resp.status()
    console.log(respstatus)

    const respstattext = resp.statusText()
    console.log(respstattext)

    await expect(respstatus).toBe(200)
    expect(respstattext).toBe("OK")
    expect(resp.ok()).toBeTruthy()
    expect(respjson).toHaveProperty("userId",1)
    expect(respjson).toHaveProperty("title","sunt aut facere repellat provident occaecati excepturi optio reprehenderit")
    expect(respjson.body).toContain("quia et suscipit\nsuscipit")


})

