import { StudyCardComponent } from './study-card.component';
import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('StudyCardComponent', () => {
  let component: StudyCardComponent;
  let fixture: ComponentFixture<StudyCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudyCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StudyCardComponent);
    component = fixture.componentInstance;

    const study = signal({ id: '32423432' });
    fixture.componentInstance.study =
      study as unknown as typeof fixture.componentInstance.study;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
