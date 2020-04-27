import { Component, OnInit } from '@angular/core';
import {AddNewFacultyService} from '../../services/add-new-faculty.service'
import { Router } from '@angular/router';
import {Faculty} from 'src/app/models/faculty'


@Component({
  selector: 'app-add-faculty',
  templateUrl: './add-faculty.component.html',
  styleUrls: ['./add-faculty.component.css']
})
export class AddFacultyComponent implements OnInit {

  constructor(
    private addFacultyService: AddNewFacultyService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.facultyToAdd.name = ''
  }

  facultyToAdd: Faculty = {} as any;

  public facultyObj: Object;

  submitNewFaculty(): void{
    this.router.navigateByUrl('/addInfo');

    this.addFacultyService.postFaculty(this.facultyToAdd).subscribe((facultyObj) =>  {
      this.facultyObj = facultyObj});
  }


}
