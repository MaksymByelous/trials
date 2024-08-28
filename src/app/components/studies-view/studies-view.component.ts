import { Hit } from '../../models/study';
import { StudiesService } from '../../services/studies.service';
import { FavsStudiesStore } from '../../stores/favs-studies.store';
import { StudiesStore } from '../../stores/studies.store';
import { StudyCardComponent } from '../study-card/study-card.component';
import { AsyncPipe } from '@angular/common';
import { Component, DestroyRef, inject } from '@angular/core';
import { patchState } from '@ngrx/signals';

@Component({
  selector: 'trials-studies-view',
  standalone: true,
  imports: [StudyCardComponent, AsyncPipe],
  providers: [FavsStudiesStore],
  templateUrl: './studies-view.component.html',
  styleUrl: './studies-view.component.scss',
})
export class StudiesViewComponent {
  private studyService = inject(StudiesService);
  private destroyRef = inject(DestroyRef);
  readonly studyStore = inject(StudiesStore);

  updateInterval!: ReturnType<typeof setInterval>;

  constructor() {
    this.studyStore.loadStudies({});

    this.updateInterval = setInterval(() => {
      this.studyService.searchStudies({ limit: '1' }).subscribe((trials) => {
        this.checkStudiesToUpdate(trials[0]);
      });
    }, 5000);

    this.destroyRef.onDestroy(() => {
      clearInterval(this.updateInterval);
    });
  }

  private checkStudiesToUpdate(newStudy: Hit): void {
    if (!this.studyStore.studies().length) {
      patchState(this.studyStore, { studies: [newStudy] });
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
      const newStudies = [...this.studyStore.studies()];
      newStudies[this.getStudyIndex(oldestStudy.id)] = newStudy;
      patchState(this.studyStore, { studies: newStudies });
    }
  }

  private getOldestStudy(): Hit {
    const sortedStudies = [...this.studyStore.studies()].sort((a, b) => {
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
    return this.studyStore.studies().findIndex((study) => study.id === studyId);
  }
}
