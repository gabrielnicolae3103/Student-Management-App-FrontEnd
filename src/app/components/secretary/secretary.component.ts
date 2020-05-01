import { DataSource } from '@angular/cdk/table';
import { MatTableDataSource } from '@angular/material/table';
import { StudentService } from './../../services/student.service';
import { StudentForm } from './../../models/studentForm';
import { Component, OnInit } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';

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
  constructor(private studentService: StudentService) { }

  ngOnInit() {
    this.getStudents();
  }

  getStudents(): void {
    this.studentService.getStudents().subscribe((students: StudentForm[]) => {
      this.dataSource = new MatTableDataSource<StudentForm>(students);
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
