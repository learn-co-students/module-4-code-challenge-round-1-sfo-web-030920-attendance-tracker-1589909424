import React, { Component } from "react";
import CourseDetails from "./CourseDetails";
import CourseSelector from "./CourseSelector";
import StudentsList from "./StudentsList";

class CourseContainer extends Component {
  constructor(props) {
    super();
    this.state = {
      courses: [],
      courseId: 0,
      selectedCourse: {},
      students: [],
      filteredStudents: [],
    };
  }

  handleCourseChange = (e) => {
    this.setState({ courseId: parseInt(e) });
    this.setState({ selectedCourse: this.findCourseById(e) });
    this.getStudents();
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

  getStudents = () => {
    console.log("inside get students function");
    // let course = this.findCourseById(this.state.courseId);
    let course = this.state.courses[0];
    console.log(course);
    let students = this.state.students.filter(
      (student) => student.course === course.name
    );
    console.log(students);
    this.setState({ filteredStudents: students });
  };
  fetchStudents = () => {
    const URL = "http://localhost:6001/students";
    fetch(URL)
      .then((resp) => resp.json())
      .then((students) => this.setState({ students }));
  };

  render() {
    // console.log(this.state.courses);
    const { courses } = this.state;
    return (
      <div className="ui grid container">
        <CourseDetails course={this.state.selectedCourse} />
        <CourseSelector
          courses={courses}
          handleCourseChange={this.handleCourseChange}
        />
        <StudentsList filteredStudents={this.state.filteredStudents} />
      </div>
    );
  }
}

export default CourseContainer;
