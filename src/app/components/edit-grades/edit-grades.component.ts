import { Class } from './../../models/class';
import { StudentForm } from './../../models/studentForm';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-grades',
  templateUrl: './edit-grades.component.html',
  styleUrls: ['./edit-grades.component.css']
})
export class EditGradesComponent implements OnInit {
  students: StudentForm[];
  course: Class;
  constructor() { }

  ngOnInit() {
    this.course = history.state.data.course;
    this.students = history.state.data.students;
    console.log(this.course);
    console.log(this.students);
  }

}
