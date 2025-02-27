import React, { useState, useEffect, useCallback , useRef} from 'react';
import './App.css';


// const Stopwatch = () => {

//   const [time, setTime] = useState(0);
//   const [isRunning, setIsRunning] = useState(false);
//   const [laps, setLaps] = useState([]);

//   const formatTime = useCallback((timeInMs) => {
//     const minutes = Math.floor(timeInMs / 60000);
//     const seconds = Math.floor((timeInMs % 60000) / 1000);
//     const milliseconds = Math.floor((timeInMs % 1000) / 10);

//     return {
//       minutes: minutes.toString().padStart(2, '0'),
//       seconds: seconds.toString().padStart(2, '0'),
//       milliseconds: milliseconds.toString().padStart(2, '0')
//     };
//   }, []);

//   useEffect(() => {
//     let intervalId;
//     if (isRunning) {
//       intervalId = setInterval(() => {
//         setTime(prevTime => prevTime + 10);
//       }, 10);
//     }
//     return () => clearInterval(intervalId);
//   }, [isRunning]);

//   const handleStartPause = () => {
//      setIsRunning(!isRunning);
//     // if (isRunning) {
//     //   // Add lap when pausing
//     //   const formattedTime = formatTime(time);
//     //   setLaps(prevLaps => [...prevLaps, {
//     //     number: prevLaps.length + 1,
//     //     time: `${formattedTime.minutes}:${formattedTime.seconds}.${formattedTime.milliseconds}`
//     //   }]);
//     // }
//   };

//   const handleReset = () => {
//     setIsRunning(false);
//     setTime(0);
//     setLaps([]);
//   };

//   const { minutes, seconds, milliseconds } = formatTime(time);

//   return (
//     <div className="stopwatch-container">
//       <div className={`stopwatch-card ${isRunning ? 'running' : ''}`}>
//         <div className="stopwatch-header">
//           <span className="timer-icon">⏱️</span>
//           <h1 className="stopwatch-display">
//             {minutes}:{seconds}
//             <span className="stopwatch-milliseconds">.{milliseconds}</span>
//           </h1>
//         </div>

//         <div className="controls">
//           <button
//             className={`control-button ${isRunning ? 'pause-button' : 'start-button'}`}
//             onClick={handleStartPause}
//           >
//             {isRunning ? (
//               <>
//                 <span className="button-icon">⏸</span>
//                 Pause
//               </>
//             ) : (
//               <>
//                 <span className="button-icon">▶️</span>
//                 Start
//               </>
//             )}
//           </button>
//           <button className="control-button reset-button" onClick={handleReset}>
//             <span className="button-icon">🔄</span>
//             Reset
//           </button>
//         </div>

//         {/* {laps.length > 0 && (
//           <div className="laps-container">
//             {laps.map((lap) => (
//               <div key={lap.number} className="lap-item">
//                 <span className="lap-number">Lap {lap.number}</span>
//                 <span className="lap-time">{lap.time}</span>
//               </div>
//             ))}
//           </div>
//         )} */}
//       </div>
//     </div>
//   );
// };

// export default Stopwatch;


const TypeWrite = () => {
  const [displayText, setDisplayText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [charIndex, setCharIndex] = useState(0);
  
//   const words = ["ZFUNDS", "XFUNDS", "YFUNDS"];
const words = ["coding is fun", "first learn javascript", "then you can start react.js/angular"];

  const typingRef = useRef(null);

  useEffect(() => {
    const typeNextChar = () => {
      if (wordIndex >= words.length) {
        // Reset to start the loop again
        setWordIndex(0);
        setDisplayText('');
        setCharIndex(0);
        return;
      }

      if (isTyping) {
        // Typing phase
        if (charIndex < words[wordIndex].length) {
          setDisplayText(prev => prev + words[wordIndex][charIndex]);
          setCharIndex(prev => prev + 1);
        } else {
          // Finished typing current word
          setIsTyping(false);
          setTimeout(() => {
            // Pause before starting to delete
            setIsTyping(false);
          }, 1500);
        }
      } else {
        // Deleting phase
        if (charIndex > 0) {
          setDisplayText(prev => prev.slice(0, -1));
          setCharIndex(prev => prev - 1);
        } else {
          // Finished deleting, move to next word
          setIsTyping(true);
          setWordIndex(prev => prev + 1);
        }
      }
    };

    const speed = isTyping ? 150 : 100;
    typingRef.current = setTimeout(typeNextChar, speed);

    return () => {
      if (typingRef.current) {
        clearTimeout(typingRef.current);
      }
    };
  }, [displayText, isTyping, wordIndex, charIndex, words]);

  return (
    <div className="typewriter-container">
      <div className="typewriter-text">
        {displayText}<span className="cursor"></span>
      </div>
    </div>
  );
};

export default TypeWrite;