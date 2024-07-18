import { Hit } from '../../models/study';
import { StudiesService } from '../../services/studies.service';
import { StudyCardComponent } from '../study-card/study-card.component';
import { AsyncPipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'trials-studies-view',
  standalone: true,
  imports: [StudyCardComponent, AsyncPipe],
  templateUrl: './studies-view.component.html',
  styleUrl: './studies-view.component.scss',
})
export class StudiesViewComponent implements OnInit, OnDestroy {
  studies: Hit[] = [];
  isLoading = true;
  updateInterval!: number;

  constructor(protected studyService: StudiesService) {}

  ngOnInit() {
    this.studyService.searchStudies({ limit: '100' }).subscribe((trials) => {
      this.studies = trials;
      this.isLoading = false;
    });

    this.updateInterval = setInterval(() => {
      // console.log('Updating studies...');
    }, 5000);
  }

  ngOnDestroy() {
    clearInterval(this.updateInterval);
  }
}
