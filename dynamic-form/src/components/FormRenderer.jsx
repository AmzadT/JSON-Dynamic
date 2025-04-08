import React from "react";
import RepeatableGroup from "./RepeatableGroup";

const FormRenderer = ({ schema, formData, onChange, errors }) => {
  const renderField = (field) => {
    const value = formData[field.name] || "";
    const error = errors[field.name];

    if (field.type === "text" || field.type === "number") {
      return (
        <div key={field.name} className="mb-4">
          <label>{field.label}{field.required && "*"}</label>
          <input
            type={field.type}
            value={value}
            onChange={(e) => onChange(field.name, e.target.value)}
            className="w-full border p-2 rounded mt-1"
          />
          {error && <p className="text-red-500">{error}</p>}
        </div>
      );
    }

    if (field.type === "select") {
      return (
        <div key={field.name} className="mb-4">
          <label>{field.label}</label>
          <select
            value={value}
            onChange={(e) => onChange(field.name, e.target.value)}
            className="w-full border p-2 rounded mt-1"
          >
            <option value="">Select</option>
            {field.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
          {error && <p className="text-red-500">{error}</p>}
        </div>
      );
    }

    if (field.type === "checkbox") {
      return (
        <div key={field.name} className="mb-4">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              checked={formData[field.name] || false}
              onChange={(e) => onChange(field.name, e.target.checked)}
              className="mr-2"
            />
            {field.label}
          </label>
        </div>
      );
    }

    if (field.type === "radio") {
      return (
        <div key={field.name} className="mb-4">
          <label>{field.label}</label>
          <div className="mt-1">
            {field.options.map(opt => (
              <label key={opt} className="inline-flex items-center mr-4">
                <input
                  type="radio"
                  value={opt}
                  checked={value === opt}
                  onChange={() => onChange(field.name, opt)}
                  className="mr-1"
                />
                {opt}
              </label>
            ))}
          </div>
          {error && <p className="text-red-500">{error}</p>}
        </div>
      );
    }

    if (field.type === "repeatable") {
      return (
        <RepeatableGroup
          key={field.name}
          field={field}
          data={formData[field.name] || []}
          onChange={(val) => onChange(field.name, val)}
          errors={errors}
        />
      );
    }

    return null;
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">{schema.title}</h2>
      {schema.fields.map(renderField)}
    </div>
  );
};

export default FormRenderer;
