import { Component } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {RatingService} from "../../services/rating.service";
import {RatingDTO} from "../../interfaces";


@Component({
  selector: 'app-create-rating',
  templateUrl: './create-rating.component.html',
  styleUrls: ['./create-rating.component.css']
})
export class CreateRatingComponent {
  ratingForm: FormGroup;
  driverId: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private ratingService: RatingService
  ) {
    this.driverId = Number(this.route.snapshot.paramMap.get('id'));

    this.ratingForm = this.fb.group({
      value: [null, Validators.required],
      comment: ['']
    });
  }

  onSubmit() {
    const ratingDTO: RatingDTO = this.ratingForm.value;

    this.ratingService.createRating(ratingDTO, this.driverId).subscribe(
      () => {
        this.router.navigate(['']);
      }
    );
  }
}
