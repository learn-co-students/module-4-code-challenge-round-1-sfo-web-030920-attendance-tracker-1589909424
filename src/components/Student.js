import React from "react";

const Student = (props) => (
  <tr style={{ textAlign: "center" }}>
    <td>{props.student.name}</td>
    <td>{props.student.class_year}</td>
    <td>{props.student.percentage}</td>
    <td>
      <input
        type="checkbox"
        defaultChecked={props.student.attending}
        onClick={() => props.handleAttendene(props.student)}
      />
    </td>
  </tr>
);

export default Student;
