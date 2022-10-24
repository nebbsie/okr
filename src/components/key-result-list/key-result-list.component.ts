import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { TextColour } from '../../ui';

@Component({
  selector: 'app-key-result-list',
  template: `
    <div
      cdkDropList
      class="example-list draggable-list-container"
      (cdkDropListDropped)="drop($event, keyResults)"
    >
      <!--start draggable inner keyResults-->
      <div
        class="example-box okr-table-grid inner-okr-key-result-row"
        cdkDrag
        *ngFor="let keyResult of keyResults"
        marginBottom="xsmall"
      >
        <div class="example-custom-placeholder" *cdkDragPlaceholder></div>
        <ui-text>{{ keyResult.name }}</ui-text>
        <ui-text>{{ keyResult.createdDate }}</ui-text>
        <ui-text>{{ keyResult.owner }}</ui-text>
        <ui-text>{{ keyResult.team }}</ui-text>
        <!--progress bar and stats area-->
        <div>
          <div class="flex-space-between">
            <ui-text
              [colour]="getReturnColour(keyResult.stats.state)"
              weight="medium"
            >
              {{ keyResult.stats.progression * 100 + '%' }}
            </ui-text>
            <div
              [ngClass]="{
                'on-track-bg-colour': keyResult.stats.state === 'On Track',
                'off-track-bg-colour': keyResult.stats.state === 'Off Track',
                'achieved-bg-colour': keyResult.stats.state === 'Achieved'
              }"
              class="state-bg"
              marginBottom="xxxsmall"
            >
              <ui-text
                [colour]="getReturnColour(keyResult.stats.state)"
                weight="medium"
              >
                {{ keyResult.stats.state }}
              </ui-text>
            </div>
          </div>
          <mat-progress-bar
            mode="determinate"
            [value]="keyResult.stats.progression * 100"
            marginBottom="xxxsmall"
          ></mat-progress-bar>
          <ui-text size="xsmall">
            {{ 'Updated: ' + keyResult.stats.updatedAt }}
          </ui-text>
        </div>
        <!--end stats section-->
        <div class="flex">
          <mat-icon fontIcon="more_vert"></mat-icon>
        </div>
      </div>
      <!--end draggable box inner keyResults-->
    </div>
  `,
  styleUrls: ['./key-result-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KeyResultListComponent implements OnInit {
  @Input() keyResults: any;

  constructor() {}

  ngOnInit(): void {}

  drop(event: CdkDragDrop<string[]>, arrayToChange: any) {
    moveItemInArray(arrayToChange, event.previousIndex, event.currentIndex);
  }

  getReturnColour(state: string): TextColour {
    if (state === 'On Track') {
      return 'success';
    }

    if (state === 'Off Track') {
      return 'danger';
    }

    if (state === 'Achieved') {
      return 'achieved';
    }

    return 'dark';
  }
}
