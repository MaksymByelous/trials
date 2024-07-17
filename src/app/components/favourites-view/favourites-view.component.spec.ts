import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavouritesViewComponent } from './favourites-view.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('FavouritesViewComponent', () => {
  let component: FavouritesViewComponent;
  let fixture: ComponentFixture<FavouritesViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
      imports: [FavouritesViewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FavouritesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
