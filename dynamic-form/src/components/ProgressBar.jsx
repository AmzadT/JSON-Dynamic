import React from "react";

const ProgressBar = ({ currentStep, totalSteps }) => {
  const percentage = ((currentStep + 1) / totalSteps) * 100;

  let barColor = "bg-blue-500"; 
  
  if (percentage > 66) {
    barColor = "bg-green-500"; 
  } else if (percentage > 33) {
    barColor = "bg-yellow-500"; 
  }

  return (
    <div className="w-full mb-6">
      <div className="flex justify-between mb-1 text-sm font-medium text-gray-700">
        <span>Step {currentStep + 1} of {totalSteps}</span>
        <span>{Math.round(percentage)}%</span>
      </div>
      <div className="w-full bg-gray-300 rounded-full h-2.5">
        <div
          className={`${barColor} h-2.5 rounded-full transition-all duration-300 ease-in-out`}
          style={{ width: `${percentage}%` }}></div>
      </div>
    </div>
  );
};

export default ProgressBar;
