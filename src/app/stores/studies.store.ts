import { Hit, HitIds } from '../models/study';
import { StudiesService, StudyQuery } from '../services/studies.service';
import { computed, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { of, pipe, switchMap, tap } from 'rxjs';

type StudiesStore = {
  isLoading: boolean;
  studies: Hit[];
  favouriteStudies: Hit[];
};

const initialState: StudiesStore = {
  isLoading: false,
  studies: [],
  favouriteStudies: [],
};

export const StudiesStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed(({ studies }) => ({
    newStudiesCount: computed(() =>
      studies().reduce((acc, study) => (study.isNew ? acc + 1 : acc), 0)
    ),
  })),
  withMethods(
    (
      store,
      studiesService = inject(StudiesService),
      snackBar = inject(MatSnackBar)
    ) => ({
      loadStudies: rxMethod<StudyQuery>(
        pipe(
          tap(() => patchState(store, { isLoading: true })),
          switchMap((query) => {
            return studiesService.searchStudies(query).pipe(
              tap({
                next: (trials) => {
                  patchState(store, { studies: trials, isLoading: false });
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
  )
);
