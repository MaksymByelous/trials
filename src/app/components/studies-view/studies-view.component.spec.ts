import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudiesViewComponent } from './studies-view.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('StudiesViewComponent', () => {
  let component: StudiesViewComponent;
  let fixture: ComponentFixture<StudiesViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
      imports: [StudiesViewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StudiesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
