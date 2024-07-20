import { Hit, HitId } from '../../models/study';
import { FavouritesService } from '../../services/favourites.service';
import { StudiesService } from '../../services/studies.service';
import { StudyCardComponent } from '../study-card/study-card.component';
import { Component, inject, OnInit } from '@angular/core';
import { of, switchMap } from 'rxjs';

@Component({
  selector: 'trials-favourites-view',
  standalone: true,
  imports: [StudyCardComponent],
  templateUrl: './favourites-view.component.html',
  styleUrl: './favourites-view.component.scss',
})
export class FavouritesViewComponent implements OnInit {
  private studyService = inject(StudiesService);
  protected favouritesService = inject(FavouritesService);

  favouriteStudies: Hit[] = [];
  isLoading = true;

  ngOnInit() {
    this.favouritesService.favourites$
      .pipe(
        switchMap((favs: HitId[]) => {
          if (favs.length) {
            return this.studyService.searchStudies({
              id: favs.toString(),
            });
          } else {
            return of([]);
          }
        })
      )
      .subscribe((favourites) => {
        this.favouriteStudies = favourites;
        this.isLoading = false;
      });
  }
}
