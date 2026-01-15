import React, { useEffect, useState } from "react";
import QuizComponent from "./components/QuizComponent";
import LoginForm from "./components/LoginForm";
import LandingPage from "./components/LandingPage";
const App=()=>{
const [showQuiz,setShowQuiz]=useState(false);

useEffect(()=>{
console.log("After state",showQuiz);
},[showQuiz])

const handle=()=>{
console.log("Before state",showQuiz);
setShowQuiz(true);
}
return ( 
    <>
    {!showQuiz && <LoginForm onFormComplete={() => handle()} />}
    {showQuiz && <LandingPage />}
    {/* {showQuiz && <QuizComponent />} */}
    </>
);    
}

export default App;



{/* <div className="container">
<div className="one">Item 1 </div>
<div className="two">Item 2 </div>
<div className="three">Item 3 </div>
<div className="one">Item 4</div>
</div> */}