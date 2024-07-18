import { Hit } from '../../models/study';
import { FavouritesService } from '../../services/favourites.service';
import { Component, inject, input } from '@angular/core';

@Component({
  selector: 'trials-study-card',
  standalone: true,
  imports: [],
  templateUrl: './study-card.component.html',
  styleUrl: './study-card.component.scss',
})
export class StudyCardComponent {
  protected favouritesService = inject(FavouritesService);
  study = input.required<Hit>();
}
