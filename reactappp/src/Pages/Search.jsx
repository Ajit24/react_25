import React, { useState, useEffect } from "react";
import "../Pages/Search.css";

function Search() {
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [cache , setCache] = useState({});


  const fetchData = async () => {

   if(cache[input]){
    console.log("cache reurned", input);

setResults(cache[input]);  // cache data is present then do not call api
return;
   }

console.log("api call", input);

    const data = await fetch("https://dummyjson.com/recipes/search?q=" + input);
    const json = await data.json();
    setResults(json?.recipes);
    setCache(prev=>({...prev, [input]: json?.recipes}))  // to update cache
  };
  useEffect(() => {
  const timer = setTimeout(fetchData, 300);  // for debounce   // 300 cz api call time
  return()=>{
    clearTimeout(timer);  // this fn will called when compo.. unmount .
  }

   // fetchData();       // without debounce only

  }, [input]);

  return (
    <div>
      <h3>auto complete search ...</h3>
      <div>
        <input type="text" 
        id="search"
         name="search"
          placeholder="type here to search ..."
          value={input}
          onChange={(e)=>setInput(e.target.value)}
         onFocus={()=>setShowResults(true)}
         onBlur={()=>setShowResults(false)}
          /> 
{    showResults &&      <div className="results-container">
            {results.map((r)=>(
              <span className="result" key={r.id}>
             {r.name}
              </span>
            ))}

          </div>}
      </div>
    </div>
  );
}

export default Search;
