import { StudentService } from './../../services/student.service';
import { Component, OnInit } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import { StudentForm } from 'src/app/models/studentForm';

@Component({
  selector: 'app-studentForm',
  templateUrl: './studentForm.component.html',
  styleUrls: ['./studentForm.component.css']
})
export class StudentFormComponent implements OnInit {
  username: string;
  currentStudent: StudentForm;
  constructor(private studentService: StudentService) { }

  ngOnInit() {
    this.username = jwt_decode(JSON.parse(localStorage.getItem('localJWT')).jwt).sub;
    console.log(this.username);
    this.studentService.getStudentByUsername(this.username).then((user: StudentForm) => {
      this.currentStudent = user;
      console.log(this.currentStudent);
    });
  }

  updateStudent(): void {
    this.studentService.updateStudent(this.currentStudent).subscribe((user: StudentForm) => {
      console.log(user);
    });
  }



}
