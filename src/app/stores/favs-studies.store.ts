import { Hit, HitIds } from '../models/study';
import { StudiesService } from '../services/studies.service';
import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  patchState,
  signalStore,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { of, pipe, switchMap, tap } from 'rxjs';

type StudiesStore = {
  isLoading: boolean;
  favouriteStudies: Hit[];
};

const initialState: StudiesStore = {
  isLoading: false,
  favouriteStudies: [],
};

export const FavsStudiesStore = signalStore(
  withState(initialState),
  withMethods(
    (
      store,
      studiesService = inject(StudiesService),
      snackBar = inject(MatSnackBar)
    ) => ({
      loadFavouriteStudies: rxMethod<HitIds>(
        pipe(
          tap(() => patchState(store, { isLoading: true })),
          switchMap((ids) => {
            if (!ids.length) {
              patchState(store, { favouriteStudies: [], isLoading: false });
              return of();
            }
            return studiesService.searchStudies({ id: ids.toString() }).pipe(
              tap({
                next: (trials) => {
                  patchState(store, { favouriteStudies: trials });
                },
                error: () => {
                  snackBar.open('Sorry, we could not load data', 'Close', {
                    duration: 3000,
                  });
                },
                finalize: () => patchState(store, { isLoading: false }),
              })
            );
          })
        )
      ),
    })
  ),
  withHooks({
    onInit: () => {
      console.log('onInit favs store');
    },
    onDestroy: () => {
      console.log('onDestroy favs store');
    },
  })
);
