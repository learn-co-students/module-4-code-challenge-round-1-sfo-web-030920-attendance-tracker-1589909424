import React, { Component } from "react";
import CourseDetails from "./CourseDetails";
import CourseSelector from "./CourseSelector";
import StudentsList from "./StudentsList";

class CourseContainer extends Component {
  constructor() {
    super();
    this.state = {
      students: [],
      courseNames: [],
      subject: "",
    };
  }

  componentDidMount() {
    fetch("http://localhost:6001/students")
      .then((resp) => resp.json())
      .then((data) =>
        this.setState({
          students: data,
        })
      );
    fetch("http://localhost:6001/courses")
      .then((resp) => resp.json())
      .then((data) =>
        this.setState({
          courseNames: data,
        })
      );
  }

  handleChange = (e) => {
    console.log(e.target.value);
    this.setState({
      subject: e.target.value,
    });
  };

  filterStudents = () => {
    return this.state.students.filter(
      (student) => student.course === this.state.subject
    );
  };

  handleAttending = (id, attending) => {
    fetch(`http://localhost:6001/students/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        attending: !attending,
      }),
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
      });
  };

  render() {
    console.log(this.state);
    console.log(this.filterStudents());
    return (
      <div className="ui grid container">
        <CourseDetails />
        <CourseSelector
          courses={this.state.courseNames}
          handleChange={this.handleChange}
        />
        <StudentsList
          students={this.filterStudents()}
          handleAttending={this.handleAttending}
        />
      </div>
    );
  }
}

export default CourseContainer;
