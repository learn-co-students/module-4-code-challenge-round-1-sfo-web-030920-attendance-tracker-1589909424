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

  handleAttendene = (student) => {
    fetch(`http://localhost:6001/students/${student.id}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'attending': !student.attending
      })
    })
    .then(resp => resp.json())
    .then(data => {
      let updatedStudent = this.state.students.map(student => student.id === data.id ? data : student)
      this.setState({
        students: updatedStudent
      })
    })
  }
  render() {
    return (
      <div className="ui grid container">
        <CourseDetails />
        <CourseSelector courses={this.state.courseDetails} handleChange={this.handleChange}/>
        <StudentsList students={this.filterStudents()} handleAttendene={this.handleAttendene}/>
      </div>
    );
  }
}

export default CourseContainer;
