import { GradeService } from './../../services/grade.service';
import { Grade } from './../../models/grade';
import { StudentService } from './../../services/student.service';
import { Class } from './../../models/class';
import { StudentForm } from './../../models/studentForm';
import { Component, OnInit } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';

@Component({
  selector: 'app-edit-grades',
  templateUrl: './edit-grades.component.html',
  styleUrls: ['./edit-grades.component.css']
})
export class EditGradesComponent implements OnInit {
  students: StudentForm[] = new Array<StudentForm>();
  dataSource: Grade[] = new Array<Grade>();
  course: Class;
  displayedColumns: string[] = ['index', 'name', 'grupa', 'nota', 'notaNoua'];
  constructor(private studentService: StudentService,
              private gradeService: GradeService) {
    this.course = history.state.data.course;
    this.students = history.state.data.students;
  }

  ngOnInit() {
    let responses = new Array<Observable<Grade>>();
    this.students.forEach((student: StudentForm) => {
      responses.push(this.gradeService.getGradeByClassAndStudent(this.course, student));
    });
    forkJoin(responses).subscribe(grades => {
      for (let i = 0; i < this.students.length; i++) {
        this.dataSource.push(grades[i]);
      }
    });
  }

  checkDataSource() {
    if (this.dataSource === undefined) {
      return false;
    }
    if (this.dataSource.length !== this.students.length) {
      return false;
    }
    this.dataSource.forEach(data => {
      if (data === undefined) {
        return false;
      }
    });
    return true;
  }

}
