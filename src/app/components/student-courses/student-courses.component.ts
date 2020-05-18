import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/app/services/student.service';
import { StudentForm } from 'src/app/models/studentForm';
import * as jwt_decode from 'jwt-decode';
import { GradeService } from 'src/app/services/grade.service';
import { Class } from 'src/app/models/class';
import { ClassService } from 'src/app/services/class.service';
import { Grade } from 'src/app/models/grade';

@Component({
  selector: 'app-student-courses',
  templateUrl: './student-courses.component.html',
  styleUrls: ['./student-courses.component.css']
})
export class StudentCoursesComponent implements OnInit {

  username: string;
  currentStudent: StudentForm;
  classes: Class[] = new Array<Class>();
  grades = new Map();
  index: number;
  classesMap = new Map();
  showGrades: boolean;


  constructor(private studentService: StudentService,
              private classService: ClassService,
              private gradeService: GradeService
            ) { }

  ngOnInit(): void {
    this.username = jwt_decode(JSON.parse(localStorage.getItem('localJWT')).jwt).sub;
    console.log(this.username);
    this.showGrades = false;

    this.studentService.getStudentByUsername(this.username).subscribe((user: StudentForm) => {
      this.currentStudent = user;
      console.log(this.currentStudent);
    });

    this.classService.getClasses().subscribe((allClasses: Class[]) => {
      this.classes = allClasses;
    });


    const year = [1, 2, 3, 4];

    this.classService.getClassesByStudentYearAndMajor(year[0], 1)
      .subscribe((classes1: Class[]) => {
        this.classesMap.set('1', classes1);
        console.log(this.classesMap);
      });

    this.classService.getClassesByStudentYearAndMajor(year[1], 1)
      .subscribe((classes1: Class[]) => {
        this.classesMap.set('2', classes1);
      });
    this.classService.getClassesByStudentYearAndMajor(year[2], 1)
      .subscribe((classes1: Class[]) => {
        this.classesMap.set('3', classes1);
      });
    this.classService.getClassesByStudentYearAndMajor(year[3], 1)
      .subscribe((classes1: Class[]) => {
        this.classesMap.set('4', classes1);
      });
  }


  getGrades(): void {

    for (const value of this.classesMap.values()) {
      // console.log(value);

      let classesVar = new Array<Class>();
      classesVar = value;
      for (let i = 0; i < classesVar.length; i++){
        this.gradeService.getGradeByClassAndStudent(classesVar[i], this.currentStudent)
        .subscribe((grade: Grade) => {
          this.grades.set(classesVar[i].name, grade.grade );
        });
      }

    }
    console.log(this.grades);
    this.showGrades = true;


  }

}
