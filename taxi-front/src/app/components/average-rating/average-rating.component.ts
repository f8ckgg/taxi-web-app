import {Component, OnInit} from '@angular/core';
import { RatingService } from 'src/app/services/rating.service';
import {Observable} from "rxjs";

@Component({
  selector: 'app-average-rating',
  template: `
    <span class="rating"> Average Rating:
      {{ averageRating$ | async }}
      <i class="fa fa-star"></i>
    </span>
  `,
  styles: [`
    .rating {
      display: flex;
      align-items: center;
      font-size: 24px;
      margin-left: 15px;
      margin-bottom: 15px;
    }
    .fa-star {
      color: goldenrod;
      margin-left: 5px;
    }
  `]
})
export class AverageRatingComponent implements OnInit {
  averageRating$: Observable<number> | undefined;

  constructor(private readonly ratingService: RatingService) { }

  ngOnInit(): void {
    this.averageRating$ = this.ratingService.getAverageRating();
  }
}
