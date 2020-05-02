import { ClassService } from './../../services/class.service';
import { Class } from './../../models/class';
import { DataSource } from '@angular/cdk/table';
import { MatTableDataSource } from '@angular/material/table';
import { StudentService } from './../../services/student.service';
import { StudentForm } from './../../models/studentForm';
import { Component, OnInit } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { startWith, map } from 'rxjs/operators';

export class Course {
  constructor(public clasa: Class, public selected?: boolean) {
    if (selected === undefined) {
      selected = false;
    }
  }
}

@Component({
  selector: 'app-secretary',
  templateUrl: './secretary.component.html',
  styleUrls: ['./secretary.component.css']
})
export class SecretaryComponent implements OnInit {

  students: StudentForm[];
  selectedStudents: StudentForm[];
  dataSource;
  displayedColumns: string[] = ['select', 'position', 'firstName', 'lastName', 'group'];
  selection = new SelectionModel<StudentForm>(true, []);
  courseControl = new FormControl();
  courses: Course[] = new Array<Course>();
  selectedCourses: Course[] = new Array<Course>();
  filteredCourses: Observable<Course[]>;
  lastFilter = '';

  constructor(private studentService: StudentService,
              private classService: ClassService) { }

  async ngOnInit() {
    await this.getStudents();
    await this.getCourses();
    this.filteredCourses = this.courseControl.valueChanges.pipe(
      startWith<string | Course[]>(''),
      map(value => typeof value === 'string' ? value : this.lastFilter),
      map(filter => this.filter(filter))
    );
  }

  filter(filter: string): Course[] {
    this.lastFilter = filter;
    if (filter) {
      return this.courses.filter(option => {
        return option.clasa.name.toLowerCase().indexOf(filter.toLowerCase()) >= 0;
      });
    } else {
      return this.courses.slice();
    }
  }

  displayFn(value: Course[] | string): string | undefined {
    let displayValue: string;
    if (Array.isArray(value)) {
      value.forEach((course, index) => {
        if (index === 0) {
          displayValue = course.clasa.name;
        } else {
          displayValue += ', ' + course.clasa.name;
        }
      });
    } else {
      displayValue = value;
    }
    return displayValue;
  }

  optionClicked(event: Event, course: Course) {
    event.stopPropagation();
    this.toggleSelection(course);
  }

  toggleSelection(course: Course) {
    course.selected = !course.selected;
    if (course.selected) {
      this.selectedCourses.push(course);
    } else {
      const i = this.selectedCourses.findIndex(value => value.clasa.name === course.clasa.name);
      this.selectedCourses.splice(i, 1);
    }

    this.courseControl.setValue(this.selectedCourses);
  }

  getStudents(): void {
    this.studentService.getStudents().subscribe((students: StudentForm[]) => {
      this.dataSource = new MatTableDataSource<StudentForm>(students);
    });
  }

  getCourses(): void {
    this.classService.getClasses().subscribe((classes: Class[]) => {
      classes.forEach((clasa: Class) => {
        this.courses.push(new Course(clasa));
      });
      console.log(this.courses);
    });
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: StudentForm): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row some`;
  }
}
