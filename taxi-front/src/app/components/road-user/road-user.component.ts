import { Component } from '@angular/core';
import {Observable} from "rxjs";
import {RoadDTO} from "../../interfaces";
import {RoadService} from "../../services/road.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";

@Component({
  selector: 'app-road-user',
  templateUrl: './road-user.component.html',
  styleUrls: ['./road-user.component.css']
})
export class RoadUserComponent {
  pendingRoads$: Observable<RoadDTO[]> | undefined;

  constructor(private roadService: RoadService, private snackBar: MatSnackBar,
              private router: Router) { }

  ngOnInit(): void {
    this.pendingRoads$ = this.roadService.getPendingRoadsByUserId();
  }

  deleteRoad(id: number) {
    this.roadService.deleteRoad(id).subscribe(
      () => {
        this.snackBar.open('Ride deleted successfully', 'Close', { duration: 3000 });
        this.router.navigate(['']);
      }
    );
  }

  canDelete(road: RoadDTO): boolean {
    return !road.accepted;
  }
}
