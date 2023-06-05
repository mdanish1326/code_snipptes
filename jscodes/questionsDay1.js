// caching using closure
function cache (register) {
    function sum (a, b) {
        const key = `${a} + ${b}`
        if(register[key]){
            console.log("@@@cached", key)
            return register[key]
        } 
        const val = a + b
        register[key] = val
        console.log("@@@uncached", key)
        return val
    }
    return sum
}
const next = cache({})

console.log(next(1, 2))
console.log(next(1, 2))


//question: calc.add(10).multiply(5).substract(30).add(10)
// by using class
class Calc { 
    constructor() {
        this.total = 0
    }
    add(num) {
        this.total += num
        return this
    }
    multiply(num) {
        this.total *= num
        return this
    }
    substract(num) {
        this.total -= num
        return this
    }
}

const calc = new Calc()
const result = calc.add(10).multiply(5).substract(30).add(10)
console.log(result)


// by using object
 const calc = {
     total: 0,
     add: function(val) {
         this.total += val
         return this
     },
     substract(val) {
         this.total -= val
         return this
     },
     multiply(val) {
         this.total *= val
         return this
     }
 }
 
const result = calc.add(10).multiply(5).substract(30).add(10)
console.log(result.total)


// question: print elements of array after many seconds the value is.
const arr = [6, 5, 3, 4, 5]
const print = async (value) => new Promise((resolve) => {
        setTimeout(()=> {
            console.log(value)
            resolve()
        }, value * 1000)
    })

async function timePrinting(arr){
    for (let item of arr){
        await print(item)
    }
}

timePrinting(arr)



// currying
//question: to add two numbers 
function currying(x){
    return function(y){
        return +x + +y
    }
}

console.log("currying", currying(5)(6))


// Infinite currying
function infiniteAdd (x){
    const innerAdd = (y) => infiniteAdd(x + y)
    innerAdd.result = () => x // kya ho rha hai par
    return innerAdd
}

const infinteCurrying = infiniteAdd(2)(3)(4)
console.log(infinteCurrying)
console.log(infinteCurrying.result())



//infinte currying recursion
function infiniteCurryingRecur(x){
    return function (y) {
        if(!y){
            return x
        }
        return infiniteCurryingRecur(x + y)
    }
}

console.log("through recursion infinte currying", infiniteCurryingRecur(2)(3)(4)(5)())
