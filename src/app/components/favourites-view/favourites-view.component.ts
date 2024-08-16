import { HitIds } from '../../models/study';
import { FavouritesService } from '../../services/favourites.service';
import { FavsStudiesStore } from '../../stores/favs-studies.store';
import { StudyCardComponent } from '../study-card/study-card.component';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { patchState } from '@ngrx/signals';
import { Subscription } from 'rxjs';

@Component({
  selector: 'trials-favourites-view',
  standalone: true,
  imports: [StudyCardComponent],
  providers: [FavsStudiesStore],
  templateUrl: './favourites-view.component.html',
  styleUrl: './favourites-view.component.scss',
})
export class FavouritesViewComponent implements OnInit, OnDestroy {
  protected favouritesService = inject(FavouritesService);
  readonly favsStudyStore = inject(FavsStudiesStore);

  favIdsSub!: Subscription;

  ngOnInit(): void {
    this.favouritesService.resetDeletedFavourite();
    this.favIdsSub = this.favouritesService.favourites$.subscribe(
      (favs: HitIds) => {
        if (this.favouritesService.deletedFavourite() === null) {
          this.favsStudyStore.loadFavouriteStudies(favs);
        } else {
          const newStudies = this.favsStudyStore
            .favouriteStudies()
            .filter(
              (study) => study.id !== this.favouritesService.deletedFavourite()
            );
          patchState(this.favsStudyStore, { favouriteStudies: newStudies });
        }
      }
    );
  }
  ngOnDestroy(): void {
    this.favIdsSub.unsubscribe();
  }
}
