import { ToggleFavouriteDirective } from '../../directives/toggle-favourite.directive';
import { Hit, Status } from '../../models/study';
import { FavouritesService } from '../../services/favourites.service';
import { Component, inject, input } from '@angular/core';
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
    ToggleFavouriteDirective,
  ],
  templateUrl: './study-card.component.html',
  styleUrl: './study-card.component.scss',
})
export class StudyCardComponent {
  protected readonly Status = Status;
  protected favouritesService = inject(FavouritesService);

  study = input.required<Hit>();
}
