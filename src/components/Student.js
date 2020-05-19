import React from "react";

const Student = ({ student, toggleCheck }) => (
  <tr style={{ textAlign: "center" }}>
    <td>{student.name}</td>
    <td>{student.class_year}</td>
    <td>{student.percentage}</td>
    <td>
      <input
        type="checkbox"
        defaultChecked={student.attending}
        onClick={() => toggleCheck(student.id)}
      />
    </td>
  </tr>
);

export default Student;
