import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { TextColour } from '@core/ui';

@Component({
  selector: 'app-objective-card-list',
  template: `
    <div
      cdkDropList
      class="example-list draggable-list-container"
      (cdkDropListDropped)="drop($event, dataSource)"
    >
      <div class="flex-okr-expand-collapse" cdkDrag>
        <div>
          <!--expand_less-->
          <mat-icon
            fontIcon="expand_more"
            (click)="showHideKeyResults()"
          ></mat-icon>
        </div>
        <div class="example-box okr-table-grid" marginBottom="xsmall">
          <div class="example-custom-placeholder" *cdkDragPlaceholder></div>
          <ui-text>{{ okr.objective }}</ui-text>
          <ui-text>{{ okr.createdDate }}</ui-text>
          <ui-text>{{ okr.owner }}</ui-text>
          <ui-text>{{ okr.team }}</ui-text>
          <!--progress bar and stats area-->
          <div>
            <div class="flex-space-between">
              <ui-text
                [colour]="getReturnColour(okr.stats.state)"
                weight="medium"
              >
                {{ okr.stats.progression * 100 + '%' }}
              </ui-text>
              <div
                [ngClass]="{
                  'on-track-bg-colour': okr.stats.state === 'On Track',
                  'off-track-bg-colour': okr.stats.state === 'Off Track',
                  'achieved-bg-colour': okr.stats.state === 'Achieved'
                }"
                class="state-bg"
                marginBottom="xxxsmall"
              >
                <ui-text
                  [colour]="getReturnColour(okr.stats.state)"
                  weight="medium"
                >
                  {{ okr.stats.state }}
                </ui-text>
              </div>
            </div>
            <mat-progress-bar
              mode="determinate"
              [value]="okr.stats.progression * 100"
              marginBottom="xxxsmall"
            ></mat-progress-bar>
            <ui-text size="xsmall">
              {{ 'Updated: ' + okr.stats.updatedAt }}
            </ui-text>
          </div>
          <!--end stats section-->
          <div class="flex">
            <mat-icon fontIcon="more_vert"></mat-icon>
          </div>
        </div>
        <!--end draggable box first-->
      </div>
      <!--start draggable inner keyResults-->
      <app-key-result-list
        *ngIf="showKeyResults"
        [keyResults]="okr.keyResults"
      ></app-key-result-list>
      <!--end draggable box inner keyResults-->
    </div>
  `,
  styleUrls: ['./objective-card-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ObjectiveCardListComponent implements OnInit {
  showKeyResults: boolean = false;
  @Input() okr: any;
  @Input() dataSource: any;
  // @Output() keyResultListVisibilityEvent = new EventEmitter<boolean>();

  constructor() {}

  ngOnInit(): void {}

  drop(event: CdkDragDrop<string[]>, arrayToChange: any) {
    moveItemInArray(arrayToChange, event.previousIndex, event.currentIndex);
  }

  showHideKeyResults() {
    console.log('showsing the output of bool from parent');
    console.log(this.showKeyResults);
    this.showKeyResults = !this.showKeyResults;
    console.log('new parent value is: ' + this.showKeyResults);
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
