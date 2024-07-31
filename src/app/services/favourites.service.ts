import { HitId, HitIds } from '../models/study';
import { StorageService } from './storage.service';
import { effect, inject, Injectable, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class FavouritesService {
  private storage = inject(StorageService<HitIds>);
  private snackBar = inject(MatSnackBar);
  private favouritesStorageKey = 'favorites';
  private favouriteIds = signal<HitIds>(
    this.storage.getItem(this.favouritesStorageKey)
  );
  private deletedItem = signal<HitId | null>(null);
  deletedFavourite = this.deletedItem.asReadonly();

  favourites$ = toObservable(this.favouriteIds);

  constructor() {
    effect(() =>
      this.storage.setItem(this.favouritesStorageKey, this.favouriteIds())
    );
  }

  toggleFavourite(id: HitId): void {
    const showIndex = this.favouriteIds().indexOf(id);

    if (showIndex === -1) {
      if (this.favouriteIds().length === 10) {
        this.snackBar.open('You can only have 10 favourites', 'Close', {
          duration: 3000,
        });
        return;
      }
      this.deletedItem.set(null);
      this.favouriteIds.update((favourites) => {
        return [...favourites, id];
      });
    } else {
      this.deletedItem.set(id);
      this.favouriteIds.update((favourites) => {
        favourites.splice(showIndex, 1);
        return [...favourites];
      });
    }
  }

  resetDeletedFavourite(): void {
    this.deletedItem.set(null);
  }
}
