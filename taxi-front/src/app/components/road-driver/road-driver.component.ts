import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {RoadDTO} from "../../interfaces";
import {RoadService} from "../../services/road.service";


@Component({
  selector: 'app-road-driver',
  templateUrl: './road-driver.component.html',
  styleUrls: ['./road-driver.component.css']
})
export class RoadDriverComponent implements OnInit {

  displayedColumns: string[] = ['startLocation', 'endLocation', 'user', 'car'];
  finishedRoads$: Observable<RoadDTO[]> | undefined;

  constructor(private roadService: RoadService) { }

  ngOnInit(): void {
    this.finishedRoads$ = this.roadService.getFinishedRoadsByDriverId();
  }

}
