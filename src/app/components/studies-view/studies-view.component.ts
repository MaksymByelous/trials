import { Hit } from '../../models/study';
import { StudiesService } from '../../services/studies.service';
import { StudyCardComponent } from '../study-card/study-card.component';
import { AsyncPipe } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'trials-studies-view',
  standalone: true,
  imports: [StudyCardComponent, AsyncPipe],
  templateUrl: './studies-view.component.html',
  styleUrl: './studies-view.component.scss',
})
export class StudiesViewComponent implements OnInit, OnDestroy {
  private studyService = inject(StudiesService);

  studies: Hit[] = [];
  isLoading = true;
  updateInterval!: ReturnType<typeof setInterval>;

  ngOnInit() {
    this.studyService.searchStudies().subscribe((trials) => {
      this.studies = trials;
      this.isLoading = false;
    });

    this.updateInterval = setInterval(() => {
      this.studyService.searchStudies({ limit: '1' }).subscribe((trials) => {
        this.checkStudiesToUpdate(trials[0]);
      });
    }, 5000);
  }

  private checkStudiesToUpdate(newStudy: Hit): void {
    if (!this.studies.length) {
      this.studies.push(newStudy);
      return;
    }

    const newStudyUpdateDate = new Date(
      newStudy.study.protocolSection.statusModule.lastUpdatePostDateStruct.date
    ).getTime();

    const oldestStudy = this.getOldestStudy();
    const oldestStudyUpdateDate = new Date(
      oldestStudy.study.protocolSection.statusModule.lastUpdatePostDateStruct.date
    ).getTime();

    if (
      newStudyUpdateDate > oldestStudyUpdateDate &&
      (newStudy.id === oldestStudy.id || this.getStudyIndex(newStudy.id) === -1)
    ) {
      this.studies[this.getStudyIndex(oldestStudy.id)] = newStudy;
    }
  }

  private getOldestStudy(): Hit {
    const sortedStudies = [...this.studies].sort((a, b) => {
      const dateA = new Date(
        a.study.protocolSection.statusModule.lastUpdatePostDateStruct.date
      ).getTime();
      const dateB = new Date(
        b.study.protocolSection.statusModule.lastUpdatePostDateStruct.date
      ).getTime();
      return dateA - dateB;
    });

    return sortedStudies[0];
  }

  private getStudyIndex(studyId: string): number {
    return this.studies.findIndex((study) => study.id === studyId);
  }

  ngOnDestroy() {
    clearInterval(this.updateInterval);
  }
}
