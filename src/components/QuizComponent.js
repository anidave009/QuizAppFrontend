import React, { useEffect, useState } from 'react'
import './../QuizComponent.css';
import {data} from './../shared/constants';
import ResultPage from './ResultPage';

const QuizComponent = () => {
  const heading = 'Quiz App';
  const [questionState, setQuestionState] = useState(0);
  const [score, setScore] = useState(0);
  const [display, setDisplay] = useState(false);
  const [selected, setSelected] = useState(null);
  const [lock, setLock] = useState(false);
  const [showResultPage, setShowResultPage] = useState(false);
  const [time,setTime]=useState(15);
 

useEffect(() => {
  const savedQuestion = localStorage.getItem('questionState');
  const savedLock=localStorage.getItem('lock');
  if (savedQuestion) {
    setQuestionState(parseInt(savedQuestion)  );
  }
  if(savedLock){
    setLock(parseFloat(savedLock));
  }
  console.log("savedquestionstate",savedQuestion);
}, []);

  useEffect(() => {
    if (time > 0 && !lock) {
      const timer = setTimeout(() => {
        setTime(time - 1); //  Use setState, not direct mutation
      }, 1000);
      return () => clearTimeout(timer); 
    } else if (time === 0) {
      setLock(true);
      setDisplay(true); // Show correct answer when time is up
    }
  }, [time, lock]);

  useEffect(()=>{
    localStorage.setItem('lock',lock.toString());
  },[lock])

  useEffect(() => {
    setTime(15); 
    setDisplay(false);
    setSelected(null);
    setLock(false);
  }, [questionState]);

  const correctOption = data[questionState].correctAnswer;

  const nextAction = () => {
    if(!lock) return;//if user hasn't selected any option yet no going ahead.
    setQuestionState(questionState + 1);
    localStorage.setItem('questionState', (questionState+1).toString());
  };

  const handleClick = (option) => {
    if (lock) return;
    setSelected(option);
    //react state update are asynchronous that is why i didnot use selected===correctOption
    if (option === correctOption) {
      setScore(score + 1);
    }
    setDisplay(true);
    //lock true kiya bcs user cannot select other option after choosing one.
    setLock(true);
  };

  return (
    showResultPage ? <ResultPage score={score} total={data.length} /> : (
      <div className='div-header'>
        <div className='div-section'>
          <div className='div-subsection'>
          <h2 className='heading'>{heading}</h2>
        <div className='clock'>{time}</div>
          </div>
          <hr/>
          
          <h2 className='question'>{questionState + 1}. {data[questionState].question}</h2>
          
          <ul className='list'>
            <li 
              className={`options 
                ${display && correctOption === "1" ? "correct" : ""} 
                ${display && selected === "1" && selected !== correctOption ? "wrong" : ""}
                ${lock ? "locked" : ""}`}
              onClick={() => handleClick("1")}
            >
              {data[questionState].option1}
            </li>

            <li 
              className={`options 
                ${display && correctOption === "2" ? "correct" : ""} 
                ${display && selected === "2" && selected !== correctOption ? "wrong" : ""}
                ${lock ? "locked" : ""}`}
              onClick={() => handleClick("2")}
            >
              {data[questionState].option2}
            </li>

            <li 
              className={`options 
                ${display && correctOption === "3" ? "correct" : ""} 
                ${display && selected === "3" && selected !== correctOption ? "wrong" : ""}
                ${lock ? "locked" : ""}`}
              onClick={() => handleClick("3")}
            >
              {data[questionState].option3}
            </li>
          </ul>

          {questionState + 1 === data.length ? 
            <button onClick={() => setShowResultPage(true)}>Finish</button> 
            : 
            <button onClick={nextAction}>Next</button>
          } 
          
          <h4>{questionState + 1} of {data.length} questions</h4>
        </div>
      </div>
    )
  );
}

export default QuizComponent;