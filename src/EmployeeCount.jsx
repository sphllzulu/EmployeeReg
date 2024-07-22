// EmployeeCount.js
import React from 'react';

function EmployeeCount({ count }) {
  return (
    <div className="employee-count">
      <h3>Total Employees: {count}</h3>
    </div>
  );
}

export default EmployeeCount;
