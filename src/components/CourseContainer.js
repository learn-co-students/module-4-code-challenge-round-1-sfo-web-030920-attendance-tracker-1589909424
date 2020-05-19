import React, { Component } from "react";

import CourseDetails from "./CourseDetails";
import CourseSelector from "./CourseSelector";
import StudentsList from "./StudentsList";

class CourseContainer extends Component {
  state = {
    courses: [],
    students: [],
    selectedCourse: "",
  };

  componentDidMount() {
    fetch("http://localhost:6001/courses")
      .then((resp) => resp.json())
      .then((data) =>
        this.setState({
          courses: data,
        })
      );

    fetch("http://localhost:6001/students")
      .then((resp) => resp.json())
      .then((data) =>
        this.setState({
          students: data,
        })
      );
  }

  handleCourseChange = (e) => {
    const courseIDInt = parseInt(e.target.value);
    const selectedCourse = this.state.courses.find(
      (course) => course.id === courseIDInt
    );

    this.setState({
      selectedCourse: selectedCourse,
    });
  };

  changeCourse = () => {
    return this.state.students.filter(
      (student) => student.course === this.state.selectedCourse.name
    );
  };

  toggleAttendingCheckbox = (toggledStudent) => {
    const updatedStudents = this.state.students.map((student) =>
      student.id === toggledStudent.id
        ? { ...toggledStudent, attending: !toggledStudent.attending }
        : student
    );

    this.setState({
      students: updatedStudents,
    });

    fetch(`http://localhost:6001/students/${toggledStudent.id}`, {
      method: "PATCH",
      body: JSON.stringify({
        attending: !toggledStudent.attending,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  render() {
    const { courses } = this.state;

    return (
      <div className="ui grid container">
        <CourseDetails course={this.state.selectedCourse} />
        <CourseSelector
          courses={courses}
          handleCourseChange={this.handleCourseChange}
        />
        <StudentsList
          students={this.changeCourse()}
          toggleAttendingCheckbox={this.toggleAttendingCheckbox}
        />
      </div>
    );
  }
}

export default CourseContainer;
