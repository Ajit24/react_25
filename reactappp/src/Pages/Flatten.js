const input = {
    name: 'Mansi',
    age: 25,
    department: {
      name: 'Customer Experience',
      section: 'Technical',
      branch: {
         name: 'Bangalore',
         timezone: 'IST'
      }
    },
    company: {
     name: 'SAP',
     customers: ['Ford', 'Nestle']
    },
    skills: ['javascript', 'node.js', 'html']
  }


  const flattenObject = (input) => {
    let result = {};
    for (const key in input) {
     if (!input.hasOwnProperty(key)) {
       continue;
     } 
     if (typeof input[key] === "object" &&!Array.isArray(input[key])) {
           var subFlatObject = flattenObject(input[key]);
           for (const subkey in subFlatObject) {
               result[key + "_" + subkey] = subFlatObject[subkey];
           }
       } else {
           result[key] = input[key];
       }
     }
     return result;
   }

   console.log(flattenObject(input));



   // --   Output:

// {
//   name: 'Mansi',
//   age: 25,
//   department_name: 'Customer Experience',
//   department_section: 'Technical',
//   department_branch_name: 'Bangalore',
//   department_branch_timezone: 'IST',
//   company_name: 'SAP',
//   company_customers: [ 'Ford', 'Nestle' ],
//   skills: [ 'javascript', 'node.js', 'html' ]
// }



//Q2 : Flatten JavaScript Object with Recursion

const flattenObject2 = (obj, prefix = "") =>
    Object.keys(obj).reduce((acc, k) => {
      const pre = prefix.length ? `${prefix}.` : "";
      if (
        typeof obj[k] === "object" &&
        obj[k] !== null &&
        Object.keys(obj[k]).length > 0
      ) {
        Object.assign(acc, flattenObject2(obj[k], pre + k));
      } else {
        acc[pre + k] = obj[k];
      }
      return acc;
    }, {});
    
   console.log(flattenObject2({ a: { b: { c: 1 } }, d: 1 })); // { 'a.b.c': 1, d: 1 }


// explanation:    Use Object.keys() combined with Array.prototype.reduce() to convert every leaf node to a flattened path node.
// If the value of a key is an object, call the function recursively with the appropriate prefix to create the path using Object.assign().
