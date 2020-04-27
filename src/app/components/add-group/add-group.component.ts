import { Component, OnInit } from '@angular/core';
import { AddGroupsService } from 'src/app/services/add-groups.service';
import { Router } from '@angular/router';
import { Grupa } from 'src/app/models/grupa';
import { Major } from 'src/app/models/major';
import { Seria } from 'src/app/models/seria';

@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.css']
})
export class AddGroupComponent implements OnInit {

  groupToAdd: Grupa = new Grupa();

  majorToGet: Major[];
  seriesToGet: Seria[];

  constructor(
    private addGroupService: AddGroupsService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  getMajorsFromServer(): void {
    this.addGroupService.getMajors()
      .subscribe(response => {
        this.majorToGet = response;
        console.log('majors', this.majorToGet);
      });
  }


  getSeriesFromServer(): void {
    this.addGroupService.getSeries()
      .subscribe(response => {
        this.seriesToGet = response;
        console.log('series', this.seriesToGet);
      });
    }

  methodToCall(): void{
    console.log(this.groupToAdd);
  }
}
