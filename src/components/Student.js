import React from "react";

const Student = ({ student }) => (
  <tr style={{ textAlign: "center" }}>
    <td>{student.name}</td>
    <td>{student.class_year}</td>
    <td>{student.percentage}</td>
    <td>
      <input
        type="checkbox"
        checked={student.attending}
        onClick={() => console.log("You clicked me!")}
      />
    </td>
  </tr>
);

export default Student;
