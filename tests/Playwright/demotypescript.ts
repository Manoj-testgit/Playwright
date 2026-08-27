let message:string = "Hello"
message = "Clear"
console.log(message)

let age:number = 24
console.log(age);

let isActive = false

let numArray:number[] = [1,2,3]
console.log(numArray);

let data: any  = "this can br anything"
data = 56
console.log(data);
//==============================
function add(a:number,b:number): number
{
    return a+b
}
let sum1 = add(3,4)
console.log(sum1)

//==============================
let user  = {name:"Bob",age:24,location:"india"} 
user.location = "Bangalore" 
console.log(user)