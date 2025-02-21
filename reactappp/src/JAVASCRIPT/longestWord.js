const findLongestWord = (str) => {
    // if (str.trim().length === 0) {
    //   return false;
    // }
  
    let words = str.split(" ");
    words = words.sort((a, b) => b.length - a.length);
    console.log(words);
    // return words.at(-1);
    return words[0];
  };
  
  console.log(
    findLongestWord(
      "Watch Thapa Technical javascript awesomethapatechnicalllll course on youtube"
    )   

  );



  