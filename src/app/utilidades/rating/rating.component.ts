import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {

  @Input()
  maximoRating = 5;
  @Input()
  ratingSeleccionado = 0;
  reviewVoted = false;
  ratingAnterior;
  maximoRatingArreglo = [];

  @Output()
  rated: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
    this.maximoRatingArreglo = Array(this.maximoRating).fill(0);
  }

  manejarMouseEnter(index: number): void {
    this.ratingSeleccionado = index + 1;

  }

  manejarMouseLeave(): void {
    if (this.ratingAnterior !== 0){
      this.ratingSeleccionado = this.ratingAnterior;
    }else {
      this.ratingAnterior = 0;
    }
    
  }

  rate(index: number): void {
    this.ratingSeleccionado = index + 1;
    this.reviewVoted = true;
    this.ratingAnterior = this.ratingSeleccionado;
    this.rated.emit(this.ratingSeleccionado);
  }

}
