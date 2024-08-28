import { FavouritesService } from '../../services/favourites.service';
import { FavsStudiesStore } from '../../stores/favs-studies.store';
import { StudyCardComponent } from '../study-card/study-card.component';
import { Component, effect, inject, untracked } from '@angular/core';
import { patchState } from '@ngrx/signals';
// import { Subscription } from 'rxjs';

@Component({
  selector: 'trials-favourites-view',
  standalone: true,
  imports: [StudyCardComponent],
  providers: [FavsStudiesStore],
  templateUrl: './favourites-view.component.html',
  styleUrl: './favourites-view.component.scss',
})
export class FavouritesViewComponent {
  protected favouritesService = inject(FavouritesService);
  readonly favsStudyStore = inject(FavsStudiesStore);

  // favIdsSub!: Subscription;

  constructor() {
    this.favouritesService.resetDeletedFavourite();

    effect(
      () => {
        this.updateFavsStudies();
      },
      { allowSignalWrites: true }
    );
  }

  updateFavsStudies(): void {
    if (this.favouritesService.deletedFavourite() === null) {
      this.favsStudyStore.loadFavouriteStudies(
        this.favouritesService.favourites()
      );
    } else {
      if (this.favouritesService.favourites().length) {
        untracked(() => {
          const newStudies = this.favsStudyStore
            .favouriteStudies()
            .filter(
              (study) => study.id !== this.favouritesService.deletedFavourite()
            );
          patchState(this.favsStudyStore, { favouriteStudies: newStudies });
        });
      } else {
        patchState(this.favsStudyStore, { favouriteStudies: [] });
      }
    }
  }

  // ngOnInit(): void {
  // this.favouritesService.resetDeletedFavourite();
  // this.favIdsSub = this.favouritesService.favourites$.subscribe(
  //   (favs: HitIds) => {
  // if (this.favouritesService.deletedFavourite() === null) {
  //   this.favsStudyStore.loadFavouriteStudies(favs);
  // } else {
  //   const newStudies = this.favsStudyStore
  //     .favouriteStudies()
  //     .filter(
  //       (study) => study.id !== this.favouritesService.deletedFavourite()
  //     );
  //   patchState(this.favsStudyStore, { favouriteStudies: newStudies });
  // }
  // }
  // );
  // }
}
