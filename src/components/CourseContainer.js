import React, { Component } from "react";
import CourseDetails from "./CourseDetails";
import CourseSelector from "./CourseSelector";
import StudentsList from "./StudentsList";

class CourseContainer extends Component {
  state = {
    students: [],
    courseName: [],
    course: ''
  }

  componentDidMount(){
    fetch('http://localhost:6001/students')
    .then(resp => resp.json())
    .then(data => this.setState({
      students: data
    }))

    fetch('http://localhost:6001/courses')
    .then(resp => resp.json())
    .then(data => this.setState({
      courseDetails: data
    }))
  }
  handleChange = (e) => {
    this.setState({
      course: e.target.value
    })
  }

  filterStudents = () => {
    console.log(this.state.course)
    return this.state.students.filter(student => student.course == this.state.course)
  }
  render() {
    return (
      <div className="ui grid container">
        <CourseDetails />
        <CourseSelector courses={this.state.courseDetails} handleChange={this.handleChange}/>
        <StudentsList students={this.filterStudents()}/>
      </div>
    );
  }
}

export default CourseContainer;
