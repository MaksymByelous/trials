import { HitId, HitIds } from '../interfaces/study.interface';
import { StorageService } from './storage.service';
import { effect, Injectable, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class FavouritesService {
  private favoritesStorageKey = 'favorites';
  private favoriteStudies = signal<HitIds>(
    this.storage.getItem(this.favoritesStorageKey)
  );
  favorites$ = toObservable(this.favoriteStudies);

  constructor(
    private storage: StorageService<HitIds>,
    private snackBar: MatSnackBar
  ) {
    effect(() =>
      this.storage.setItem(this.favoritesStorageKey, this.favoriteStudies())
    );
  }

  toggleFavourite(id: HitId): void {
    const showIndex = this.favoriteStudies().indexOf(id);
    const newFavorites = [...this.favoriteStudies()];

    if (showIndex === -1) {
      if (this.favoriteStudies().length === 10) {
        this.snackBar.open('You can only have 10 favourites', 'Close', {
          duration: 3000,
        });
        return;
      }
      newFavorites.push(id);
    } else {
      newFavorites.splice(showIndex, 1);
    }
    this.favoriteStudies.set(newFavorites);
  }
}
