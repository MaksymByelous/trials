import { FavouritesService } from '../services/favourites.service';
import { ToggleFavouriteDirective } from './toggle-favourite.directive';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('ToggleFavouriteDirective', () => {
  let component: ToggleFavouriteDirective;
  let fixture: ComponentFixture<ToggleFavouriteDirective>;
  let favouritesService: FavouritesService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideExperimentalZonelessChangeDetection()],
      imports: [ToggleFavouriteDirective],
    }).compileComponents();

    favouritesService = TestBed.inject(FavouritesService);
    fixture = TestBed.createComponent(ToggleFavouriteDirective);

    component = fixture.componentInstance;
    component.favouriteId = 'NCT06506786';
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });

  xit('should make id favourite', () => {
    component.toggleFavourite();
    expect(
      favouritesService.toggleFavourite(component.favouriteId)
    ).toHaveBeenCalled();
  });
});
