import { Hit, HitId } from '../../interfaces/study.interface';
import { FavouritesService } from '../../services/favourites.service';
import { StudiesService } from '../../services/studies.service';
import { StudyCardComponent } from '../study-card/study-card.component';
import { Component, OnInit } from '@angular/core';
import { of, switchMap } from 'rxjs';

@Component({
  selector: 'trials-favourites-view',
  standalone: true,
  imports: [StudyCardComponent],
  templateUrl: './favourites-view.component.html',
  styleUrl: './favourites-view.component.scss',
})
export class FavouritesViewComponent implements OnInit {
  favouriteStudies: Hit[] = [];
  isLoading = true;

  constructor(
    protected studyService: StudiesService,
    private favouritesService: FavouritesService
  ) {}

  ngOnInit() {
    this.favouritesService.favorites$
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
      .subscribe((favoutires) => {
        this.favouriteStudies = favoutires;
        this.isLoading = false;
      });
  }
}
