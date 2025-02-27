// import React, { useState } from "react";
// function HideAndShowPassword(){
//     const [show,setShow]=useState(false)
//     const handleShow=()=>{
//         setShow(!show)
//     }
//     return(
//         <div className="container">
//             <input type={show?"text":"password"} />
//             <label onClick={handleShow}>{show?"Hide":"Show"}</label>
//         </div>
//     );
// }
// export default HideAndShowPassword;



// import React, { useState } from "react";
// //import "./Filter.css";

// const Filter = () => {

//      // make a input box
//   let data = ["Sun", "Son", "Some", "Rest", "Test", "Clear", "Many"];
//   const [word, setWord] = useState([]);

//   console.log(word);

//   const dataChange = (e) => {
//     const { value } = e.target;
//     console.log(value);

//     let arr = data.filter((post) =>
//       post.toLowerCase().includes(value.toLowerCase())
//     );
//     // console.log(arr)

//     if (value.length != 0) {
//       setWord([...arr]);
//     }
// }
//     // else

//   return (
//     <div className="App">
//       <div className="outBox">
//         <input type="text" onChange={dataChange} style = {{height:"35px", width:"155px"}} />
//         {word.map((ele) => {
//           return <p>{ele}</p>;
//         })}
//       </div>
//     </div>
//   )
//     }

// export default Filter;


// import React from "react";
//  function App() {
//   const items = [
// 	{ id: 1, text: "Item 1" },
// 	{ id: 2, text: "Item 2" },
//   ];
//   const listItems = items.map((item, index) => <li key={index}>{item.text}</li>);

//   //   const listItems = items.map((item) => <li key={item.id}>{item.text}</li>);   
//   return <ul>{listItems}</ul>;
// }
//  export default App;



// import React, { useMemo } from "react";
//  function App() {
//   const numbers = [1, 2, 3, 4, 5, 6];
//   const doubledNumbers = useMemo(() => numbers.map((n) => n * 2), []);
//  return (
// 	<div>
//   	{doubledNumbers.map((number) => (
//     	<p key={number}>{number}</p>
//   	))}
// 	</div>
//   );
// }
 
// export default App;  // 2 4 6 8 10 12  // React will re-render the component only when the dependencies change. Here, it's the numbers array.  // This is a good optimization for


import React, { useCallback, useState } from "react";
function App() {
  const [count, setCount] = useState(0);
 
  const increment = useCallback(() => {
	setCount(count + 1);
//     setCount((prevCount) => prevCount + 1);

  }, []);
   return (
	<div>
  	<button onClick={increment}>Increment</button>
  	<p>Count: {count}</p>
	</div>
  );
}
 
export default App;

