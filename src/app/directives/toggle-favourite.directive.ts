import { HitId } from '../models/study';
import { FavouritesService } from '../services/favourites.service';
import { Directive, HostListener, inject, Input } from '@angular/core';

@Directive({
  selector: '[toggleFavourite]',
  standalone: true,
})
export class ToggleFavouriteDirective {
  @Input({ required: true, alias: 'toggleFavourite' }) favouriteId!: HitId;
  private favouritesService = inject(FavouritesService);

  @HostListener('click') toggleFavourite(): void {
    this.favouritesService.toggleFavourite(this.favouriteId);
  }
}
