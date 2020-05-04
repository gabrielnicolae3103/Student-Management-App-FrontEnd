import { Seria } from './../../models/seria';
import { AddGroupsService } from 'src/app/services/add-groups.service';
import { ClassService } from './../../services/class.service';
import { Class } from './../../models/class';
import { MatTableDataSource } from '@angular/material/table';
import { StudentService } from './../../services/student.service';
import { StudentForm } from './../../models/studentForm';
import { Component, OnInit } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { startWith, map } from 'rxjs/operators';
import { Grupa } from 'src/app/models/grupa';

export class SelectGroup {
  grupe: Grupa[];
  constructor(public serie: Seria){
    this.grupe = new Array<Grupa>();
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
  lastFilter = '';
  selectedGroups: Set<Grupa> = new Set<Grupa>();
  grupe: Grupa[];
  grupeControl = new FormControl();
  selectGroups: SelectGroup[] = new Array<SelectGroup>();
  lastSelectedGroupe: Grupa[];
  classes: Class[];
  selectedCourse: Class;

  constructor(private studentService: StudentService,
              private classService: ClassService,
              private grupaService: AddGroupsService) { }

  ngOnInit() {
    this.getStudents();
    this.getCourses();
    this.getGroups();
  }

  getStudents(): void {
    this.studentService.getStudents().subscribe((students: StudentForm[]) => {
      this.students = students;
      this.dataSource = new MatTableDataSource<StudentForm>(students);
    });
  }

  getCourses(): void {
    this.classService.getClasses().subscribe((classes: Class[]) => {
      this.classes = classes;
    });
  }

  getGroups(): void {
    this.grupaService.getGroups().subscribe((grupe: Grupa[]) => {
      grupe.forEach(grupa => {
        if (!this.selectGroups.some(group => group.serie.name === grupa.seria.name)) {
          this.selectGroups.push(new SelectGroup(grupa.seria));
        }
        this.selectGroups.find(group => group.serie.name === grupa.seria.name).grupe.push(grupa);
      });
    });
    console.log(this.selectGroups);
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

  onChange(): void {
    var uncheckedGrupe: Grupa[] = new Array<Grupa>();
    if (this.lastSelectedGroupe !== undefined) {
      this.lastSelectedGroupe.forEach(grupa => {
        if (!this.grupeControl.value.some(elem => {
          return elem.seria.name === grupa.seria.name && elem.number === grupa.number;
        })) {
          uncheckedGrupe.push(grupa);
        }
      });
    }

    this.students.forEach(student => {
      if (this.selection.isSelected(student) && student.grupa !== undefined) {
        if (uncheckedGrupe.some(group => {
          return group.seria.name === student.grupa.seria.name && group.number === student.grupa.number;
        })) {
          this.selection.deselect(student);
        }
      }
    });

    this.students.forEach(student => {
      if (!this.selection.isSelected(student) && student.grupa !== undefined) {
        if (this.grupeControl.value.some(group => {
          return group.seria.name === student.grupa.seria.name && group.number === student.grupa.number;
        })) {
          this.selection.select(student);
        }
      }
    });
    this.lastSelectedGroupe = this.grupeControl.value;
  }
}
