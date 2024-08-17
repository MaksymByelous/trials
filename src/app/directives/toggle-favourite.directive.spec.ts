import { FavouritesService } from '../services/favourites.service';
import { ToggleFavouriteTestComponent } from './toggle-favourite-test.component';
import { ToggleFavouriteDirective } from './toggle-favourite.directive';
import {
  DebugElement,
  provideExperimentalZonelessChangeDetection,
} from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

describe('ToggleFavouriteDirective', () => {
  let component: ToggleFavouriteTestComponent;
  let fixture: ComponentFixture<ToggleFavouriteTestComponent>;
  let favouritesService: FavouritesService;
  let elements: DebugElement[];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideExperimentalZonelessChangeDetection()],
      imports: [ToggleFavouriteDirective, ToggleFavouriteTestComponent],
    }).compileComponents();

    favouritesService = TestBed.inject(FavouritesService);
    fixture = TestBed.createComponent(ToggleFavouriteTestComponent);

    component = fixture.componentInstance;
    component.favouriteId = 'NCT06506786';

    elements = fixture.debugElement.queryAll(
      By.directive(ToggleFavouriteDirective)
    );
    fixture.detectChanges();
  });

  it('should create single element with directive', () => {
    expect(component).toBeTruthy();
    expect(elements.length).toBe(1);
  });

  it('should make id favourite', () => {
    spyOn(favouritesService, 'toggleFavourite');
    elements[0].nativeElement.click();
    expect(favouritesService.toggleFavourite).toHaveBeenCalledWith(
      component.favouriteId
    );
  });
});
