import { StudentService } from './../../services/student.service';
import { StudentForm } from 'src/app/models/studentForm';
import { Major } from 'src/app/models/major';
import { Class } from './../../models/class';
import { UserForm } from 'src/app/models/userForm';
import { ClassService } from './../../services/class.service';
import { GradeService } from './../../services/grade.service';
import { LoginServiceService } from './../../services/login-service.service';
import { Component, OnInit } from '@angular/core';
import { Grade } from 'src/app/models/grade';

@Component({
  selector: 'app-grades',
  templateUrl: './grades.component.html',
  styleUrls: ['./grades.component.css']
})
export class GradesComponent implements OnInit {

  currentStudent: StudentForm;
  classes: Map<number, Array<Class>>;
  grades: Map<Class, Grade>;
  displayedColumns: string[] = ['index', 'course', 'grade', 'pc', 'type', 'semester'];

  constructor(
    private loginService: LoginServiceService,
    private gradeService: GradeService,
    private classService: ClassService,
    private studentService: StudentService
  ) {
    this.classes = new Map();
    this.grades = new Map();
  }

  async ngOnInit() {
    await this.getStudentGrades();
  }

  async getStudentGrades(): Promise<void> {
    return this.loginService.getCurrentUser().then(async (user: UserForm) => {
      this.studentService.getStudentByUsername(user.login).then(async (student: StudentForm) => {
        this.currentStudent = student;
        this.getClassesByMajor(this.currentStudent.grupa.major);
      });
    }) as Promise<void>;
  }

  getClassesByMajor(major: Major) {
    for (let year = 1; year <= 4; year++) {
      this.classService.getClassesByStudentYearAndMajor(year, major.id)
                      .then((classes: Class[]) => {
                        this.classes.set(year, classes);
                        this.getStudentGradesByYear(year);
                      });
    }
  }

  getStudentGradesByYear(year: number) {
      const classes = this.classes.get(year);
      classes.forEach((course: Class) => {
      this.gradeService.getGradeByClassAndStudent(course, this.currentStudent)
      .then((grade: Grade) => {
        this.grades.set(course, grade);
      });
    });
  }
}
