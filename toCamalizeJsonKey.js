let obj = {
  "first_key": 1,
  "second_key": 2,
  "third_key": 3,
  "fourth_key": {
    "first_key": 1,
    "second_key": 2,
    "third_key": 3
  },
  "fifth_key": [
    {
      "first_key": 1,
      "second_key": 2,
      "third_key": 3
    },
    {
      "first_key": 1,
      "second_key": 2,
      "third_key": 3
    }
  ]
}

const obj2 = {
  "first_key": 1,
  "second_key": 2,
  "third_key": 3,
  "fourth_key": {
    "first_key": 1,
    "second_key": 2,
    "third_key": 3
  },
  "fifth_key": [
    {
      "first_key": 1,
      "second_key": 2,
      "third_key": 3
    },
    {
      "first_key": 1,
      "second_key": 2,
      "third_key": 3,
      "fifth_key": [
        {
          "first_key": 1,
          "second_key": 2,
          "third_key": 3
        },
        {
          "first_key": 1,
          "second_key": 2,
          "third_key": 3
        }
      ]
    }
  ]
}
const obj3 = {
  "first_key": 1,
  "second_key": 2,
  "third_key": 3,
  "heelo_keys": [1, 3, 5, 56, 7, 7, 7 ,9, [11, 3, 45], {
    "first_key": 1,
    "second_key": 2,
    "third_key": 3
  }],
  "fourth_key": {
    "first_key": 1,
    "second_key": 2,
    "third_key": 3
  },
  "fifth_key": [
    {
      "first_key": 1,
      "second_key": 2,
      "third_key": 3
    },
    {
      "first_key": 1,
      "second_key": 2,
      "third_key": 3,
      "fifth_key": [
        {
          "first_key": 1,
          "second_key": 2,
          "third_key": 3
        },
        {
          "first_key": 1,
          "second_key": 2,
          "third_key": 3
        }
      ]
    }
  ]
}


let objTest = {
  "first_key": 1,
  "second_key": 2,
  "third_key": 3,
  "heelo_keys": [
    1,
    3,
    5,
    56,
    7,
    7,
    7,
    9,
    [
      11,
      3,
      45
    ],
    {
      "first_key": 1,
      "second_key": 2,
      "third_key": 3
    },
    [
      {
        "first_key": 1,
        "second_key": 2,
        "third_key": 3
      },
      {
        "first_key": 1,
        "second_key": 2,
        "third_key": 3
      }
    ]
  ],
  "fourth_key": {
    "first_key": 1,
    "second_key": 2,
    "third_key": 3
  },
  "fifth_key": [
    {
      "first_key": 1,
      "second_key": 2,
      "third_key": 3
    },
    {
      "first_key": 1,
      "second_key": 2,
      "third_key": 3,
      "fifth_key": [
        {
          "first_key": 1,
          "second_key": 2,
          "third_key": 3
        },
        {
          "first_key": 1,
          "second_key": 2,
          "third_key": 3
        }
      ]
    }
  ]
}

const array = [1, 3, 5, 56, 7, 7, 7 ,9, [11, 3, 45]]
const st = "vknef"




const camelize = (key) => {
    let newKey = "";
    
    if(!key.includes("_")){
        return key
    }
    key.split("_").map((item) => {
        let firstLetter = item.charAt(0).toUpperCase()
        let word = firstLetter + item.slice(1)
      return (newKey += word)
    })
    
    return ((newKey.charAt(0).toLowerCase()) + (newKey.slice(1)));
}

  
  

const arrayContainObject = (element) => {
    return (element instanceof Object && !(element instanceof Array))
}
// console.log("@@@@@@", array.some(arrayContainObject))




function ObjectParser(obj, returnedObj) {
    let newObj = {}
    if(!obj instanceof Object && !obj instanceof Array) {
        return obj
    } else {
        Object.entries(obj).map(([key, value]) => {
            let newKey = camelize(key)
            
            if(value instanceof Object && !(value instanceof Array)){
                return newObj[newKey] = ObjectParser(value)
            }
            
            if((value.length && value instanceof Array && value.some(arrayContainObject))) {
                const newArray = value.map(item => {
                   
                    if(item instanceof Array && !(item.some(arrayContainObject))) return item
                    
                    if(!(item instanceof Object)) return item
                    
                    if(item instanceof Array) {
                        return item.map((itm) => ObjectParser(itm))
                    }
                     
                    return ObjectParser(item)
                })
                return newObj[newKey] = newArray
            }
            
            newObj[newKey] = value
        })
        return newObj
    }
}

console.log("@@@@@", ObjectParser(objTest))
