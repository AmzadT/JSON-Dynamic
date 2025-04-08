import React from "react";

const ReviewPage = ({ data }) => (
  <div>
    <h2 className="text-xl font-semibold mb-4">Review Your Information</h2>
    <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
      {JSON.stringify(data, null, 2)}
    </pre>
  </div>
);

export default ReviewPage;
