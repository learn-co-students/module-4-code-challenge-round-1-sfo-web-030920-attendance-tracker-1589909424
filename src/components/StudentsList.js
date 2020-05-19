import React from "react";
import Student from "./Student";

const StudentsList = (props) => (
  <table className="ui celled striped padded table unstackable">
    <tbody>
      <tr>
        <th>
          <h3 className="ui center aligned header">Student Name</h3>
        </th>
        <th>
          <h3 className="ui center aligned header">Class Year</h3>
        </th>
        <th>
          <h3 className="ui center aligned header">Course Percentage</h3>
        </th>
        <th>
          <h3 className="ui center aligned header">Attending</h3>
        </th>
      </tr>
      {props.students.map((student) => (
        <Student
          key={student.id}
          student={student}
          handleAttending={props.handleAttending}
        />
      ))}
    </tbody>
  </table>
);

export default StudentsList;
