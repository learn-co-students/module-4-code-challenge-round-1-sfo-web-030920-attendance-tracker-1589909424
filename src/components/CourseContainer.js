import React, { Component } from "react";
import CourseDetails from "./CourseDetails";
import CourseSelector from "./CourseSelector";
import StudentsList from "./StudentsList";

class CourseContainer extends Component {
  constructor(props) {
    super();
    this.state = {
      courses: [],
      selectedCourse: {},
      students: [],
      filteredStudents: [],
    };
  }

  handleCourseChange = (id) => {
    this.setState({ selectedCourse: this.findCourseById(id) });
    this.getStudents(id);
  };

  componentDidMount() {
    this.fetchCourses();
    this.fetchStudents();
  }
  findCourseById = (id) => {
    return this.state.courses.find((course) => course.id === parseInt(id));
  };
  fetchCourses = () => {
    const URL = "http://localhost:6001/courses";
    fetch(URL)
      .then((resp) => resp.json())
      .then((courses) => this.setState({ courses }));
  };

  getStudents = (id) => {
    let course = this.findCourseById(id);
    let students = this.state.students.filter(
      (student) => student.course === course.name
    );
    this.setState({ filteredStudents: students });
  };
  fetchStudents = () => {
    const URL = "http://localhost:6001/students";
    fetch(URL)
      .then((resp) => resp.json())
      .then((students) => this.setState({ students }));
  };

  toggleCheck = (id) => {
    let modiifiedStudent = this.state.students.find(
      (student) => student.id === id
    );
    modiifiedStudent.attending = !modiifiedStudent.attending;
    fetch(`http://localhost:6001/students/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        attending: modiifiedStudent.attending,
      }),
    });
  };

  selectedCourseStudents = () => {
    return this.state.students.filter(
      (student) => student.course === this.state.selectedCourse.name
    );
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
          filteredStudents={this.selectedCourseStudents()}
          toggleCheck={this.toggleCheck}
        />
      </div>
    );
  }
}

export default CourseContainer;
