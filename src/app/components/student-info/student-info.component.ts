import { Component, OnInit } from '@angular/core';
import { StudentForm } from 'src/app/models/studentForm';
import { LoginServiceService} from '../../services/login-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-info',
  templateUrl: './student-info.component.html',
  styleUrls: ['./student-info.component.css']
})
export class StudentInfoComponent implements OnInit {

  constructor(
    private studentInfoService: LoginServiceService,
    private router: Router
  ) { }

  ngOnInit(): void {

  }

  displayedColumns: string[] = ['SIN',
                                'Nume',
                                'F.I.',
                                'Prenume',
                                'CNP',
                                'Nr. Telefon',
                                'email'];
  

  dataSource: StudentForm[];


   getStudentsFromServer() : void {
     this.studentInfoService.getStudent()
       .subscribe(response => {
         this.dataSource = response;
         console.log('studentDetails', this.dataSource)
       })
   }


   

   





}
