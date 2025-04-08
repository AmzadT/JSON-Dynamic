import './App.css'
import React, { useState } from "react";
import { formSchema } from "./schema/formSchema";
import Stepper from "./components/Stepper";
import FormRenderer from "./components/FormRenderer";
import ReviewPage from "./components/ReviewPage";
import ProgressBar from "./components/ProgressBar"; 

const App = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  const currentSchema = formSchema[step];

  const validateStep = () => {
    const newErrors = {};
    currentSchema.fields.forEach(field => {
      if (field.type === "repeatable") {
        const groupData = formData[field.name] || [];
        groupData.forEach((item, index) => {
          field.fields.forEach(f => {
            if (f.required && !item[f.name]) {
              newErrors[`${field.name}[${index}].${f.name}`] = `${f.label} is required`;
            }
          });
        });
      } else {
        if (field.required && !formData[field.name]) {
          newErrors[field.name] = `${field.label} is required`;
        }
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) setStep(step + 1);
  };

  const handlePrevious = () => {
    setStep(step - 1);
  };

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    alert("Form Submitted!\n" + JSON.stringify(formData, null, 2));
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">Dynamic Stepper Form</h1>

      <ProgressBar currentStep={step} totalSteps={formSchema.length + 1} />
      <Stepper currentStep={step} totalSteps={formSchema.length + 1} />

      {step < formSchema.length ? (
        <FormRenderer
          schema={currentSchema}
          formData={formData}
          onChange={handleChange}
          errors={errors}
        />
      ) : (
        <ReviewPage data={formData} />
      )}

      <div className="flex justify-between mt-6">
        {step > 0 && <button onClick={handlePrevious} className="bg-gray-500 text-white px-4 py-2 rounded">Previous</button>}
        {step < formSchema.length && <button onClick={handleNext} className="bg-blue-600 text-white px-4 py-2 rounded">Next</button>}
        {step === formSchema.length && <button onClick={handleSubmit} className="bg-green-600 text-white px-4 py-2 rounded">Submit</button>}
      </div>
    </div>
  );
};

export default App;
