import React from "react";
import './../QuizComponent.css';
import completedImage from './../shared/completed.png';
const ResultPage=({score,total})=>{
    localStorage.removeItem('questionState');
return(
    <div className="result-header">
        <div className="result-section">
        <img src={completedImage} height="240px" width="340px"></img>
            <h2>You scored {score} out of {total} </h2>
        </div>
    </div>
);
}
export default ResultPage;