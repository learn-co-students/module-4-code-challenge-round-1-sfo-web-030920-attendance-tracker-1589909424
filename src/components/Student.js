import React from "react";

const Student = ({ student, toggleAttendingCheckbox }) => (
  <tr style={{ textAlign: "center" }}>
    <td>{student.name}</td>
    <td>{student.class_year}</td>
    <td>{student.percentage}</td>
    <td>
      <input
        type="checkbox"
        checked={
          student.attending /* if true, this checkbox will be checked! */
        }
        onClick={() => toggleAttendingCheckbox(student)}
      />
    </td>
  </tr>
);

export default Student;
