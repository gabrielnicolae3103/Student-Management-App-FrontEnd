import { SecretaryService } from './../../services/secretary.service';
import { UserForm } from './../../models/userForm';
import { AppComponent } from './../../app.component';
import { UserService } from './../../services/user.service';
import { StudentService } from './../../services/student.service';
import { Component, OnInit } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import { StudentForm } from 'src/app/models/studentForm';
import { Secretary } from 'src/app/models/secretary';

@Component({
  selector: 'app-studentForm',
  templateUrl: './studentForm.component.html',
  styleUrls: ['./studentForm.component.css']
})
export class StudentFormComponent implements OnInit {
  username: string;
  currentUser: any;
  student: boolean;

  constructor(
    private studentService: StudentService,
    private userService: UserService,
    private secretaryService: SecretaryService,
    private app: AppComponent) { }

  ngOnInit() {
    const user = this.app.currentUser;
    if (user.userType.type === 'STUDENT') {
      this.getStudent(user);
      this.student = true;
    } else if (user.userType.type === 'SECRETARY') {
      this.student = false;
      this.getSecretary(user);
    }
  }

  getStudent(user: UserForm) {
    this.studentService.getStudentByUsername(user.login).then((student: StudentForm) => {
      this.currentUser = student;
    });
  }

  getSecretary(user: UserForm) {
    this.secretaryService.getSecretaryByUsername(user.login).then((secretary: Secretary) => {
      this.currentUser = secretary;
    });
  }

  updateStudent(): void {
    this.studentService.updateStudent(this.currentUser).subscribe((user: StudentForm) => {
      console.log(user);
    });
  }

  updateSecretar() {
    this.userService.updateUser(this.currentUser);
  }

  update() {
    if (this.app.currentUser.userType.type === 'STUDENT') {
      this.updateStudent();
    } else {
      this.updateSecretar();
    }
  }



}
