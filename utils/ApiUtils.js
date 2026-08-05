class ApiUtils
{
    constructor(apiContext,loginpayload)
    {
        this.apiContext = apiContext;
        this.loginpayload = loginpayload;

    }
    async getToken()
    {
        const loginresponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
        {data:this.loginpayload})
        const jsonresponse = await loginresponse.json();
        const token = jsonresponse.token
        console.log(token)
        return token;

    }

    async createOrder(orderpayload)
    {
        let response = {};
        response.token = await this.getToken()
        const orderresponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
        {headers:{"authorization":response.token},
        "content-type":"application/json",data:orderpayload})
        
        const jsonorderresponse = await orderresponse.json()
        console.log(jsonorderresponse)
        let orderId = jsonorderresponse.orders[0]
        response.orderId = orderId
        return response;
    }
}
module.exports = {ApiUtils}