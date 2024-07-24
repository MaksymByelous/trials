import { Hit, Status } from '../../models/study';
import { FavouritesService } from '../../services/favourites.service';
import { Component, inject, input, OnInit, signal } from '@angular/core';
import { MatButton } from '@angular/material/button';
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle,
} from '@angular/material/card';
import { MatChip, MatChipSet } from '@angular/material/chips';
import { MatDivider } from '@angular/material/divider';

@Component({
  selector: 'trials-study-card',
  standalone: true,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardSubtitle,
    MatButton,
    MatCardContent,
    MatDivider,
    MatChipSet,
    MatChip,
  ],
  templateUrl: './study-card.component.html',
  styleUrl: './study-card.component.scss',
})
export class StudyCardComponent implements OnInit {
  protected readonly Status = Status;
  protected favouritesService = inject(FavouritesService);

  isFavourite = signal(false);
  study = input.required<Hit>();

  ngOnInit(): void {
    this.favouritesService.favourites$.subscribe((favs) => {
      this.isFavourite.set(favs.indexOf(this.study().id) !== -1);
    });
  }
}
