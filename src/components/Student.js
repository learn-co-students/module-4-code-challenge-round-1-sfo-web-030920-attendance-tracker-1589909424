import React from "react";

const Student = (props) => (
  <tr style={{ textAlign: "center" }}>
    <td>{props.student.name}</td>
    <td>{props.student.class_year}</td>
    <td>{props.student.percentage}</td>
    <td>
      <input
        type="checkbox"
        checked={props.student.attending}
        onClick={() => console.log("You clicked me!")}
      />
    </td>
  </tr>
);

export default Student;
