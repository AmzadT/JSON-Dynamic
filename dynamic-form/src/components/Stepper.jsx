import React from "react";

const Stepper = ({ currentStep, totalSteps }) => {
  return (
    <div className="text-center text-sm mb-6">
      Step {currentStep + 1} of {totalSteps}
    </div>
  );
};

export default Stepper;
