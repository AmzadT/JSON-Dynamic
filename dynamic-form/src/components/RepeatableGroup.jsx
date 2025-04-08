import React from "react";

const RepeatableGroup = ({ field, data, onChange, errors }) => {
  const addItem = () => {
    onChange([...data, {}]);
  };

  const removeItem = (index) => {
    const newData = data.filter((_, i) => i !== index);
    onChange(newData);
  };

  const updateItem = (index, name, value) => {
    const updated = [...data];
    updated[index][name] = value;
    onChange(updated);
  };

  return (
    <div className="mb-6">
      <label className="block font-medium mb-2">{field.label}</label>
      {data.map((item, index) => (
        <div key={index} className="border p-4 rounded mb-4">
          {field.fields.map(f => (
            <div key={f.name} className="mb-2">
              <label>{f.label}{f.required && "*"}</label>
              <input
                type={f.type}
                value={item[f.name] || ""}
                onChange={(e) => updateItem(index, f.name, e.target.value)}
                className="w-full border p-2 rounded mt-1"
              />
              {errors[`${field.name}[${index}].${f.name}`] && (
                <p className="text-red-500">{errors[`${field.name}[${index}].${f.name}`]}</p>
              )}
            </div>
          ))}
          <button onClick={() => removeItem(index)} className="text-red-600 underline mt-2">Remove</button>
        </div>
      ))}
      <button onClick={addItem} className="bg-blue-500 text-white px-3 py-1 rounded">Add</button>
    </div>
  );
};

export default RepeatableGroup;
