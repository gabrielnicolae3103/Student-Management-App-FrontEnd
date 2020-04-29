import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AddSeriesService } from 'src/app/services/add-series.service';
import { Seria } from 'src/app/models/seria';

@Component({
  selector: 'app-add-series',
  templateUrl: './add-series.component.html',
  styleUrls: ['./add-series.component.css']
})
export class AddSeriesComponent implements OnInit {

  seriesToAdd: Seria;

  constructor(
    private router: Router,
    private addSeriesService: AddSeriesService
  ) { }

  ngOnInit(): void {
    this.seriesToAdd = new Seria();
  }

  submitNewSeries(): void{
    this.addSeriesService.postSeries(this.seriesToAdd).subscribe((seriesObj) =>  {
      console.log('serie adaugata', seriesObj);
    });
    this.router.navigateByUrl('/addSeries');
  }




}
