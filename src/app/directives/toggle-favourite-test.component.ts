import { ToggleFavouriteDirective } from './toggle-favourite.directive';
import { Component } from '@angular/core';

@Component({
  standalone: true,
  template: `<button [toggleFavourite]="favouriteId"></button>`,
  imports: [ToggleFavouriteDirective],
})
export class ToggleFavouriteTestComponent {
  favouriteId!: string;
}
