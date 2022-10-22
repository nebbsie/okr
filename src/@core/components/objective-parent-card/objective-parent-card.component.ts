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
  selector: 'app-objective-parent-card',
  template: `
    <div class="flex-okr-expand-collapse" cdkDrag>
      <div>
        <!--expand_less-->
        <mat-icon
          fontIcon="expand_more"
          (click)="showHideKeyResults(visibility)"
        ></mat-icon>
      </div>
      <!--cdkDrag-->
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
  `,
  styleUrls: ['./objective-parent-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ObjectiveParentCardComponent implements OnInit {
  @Input() okr: any;
  @Input() visibility!: boolean;
  @Output() keyResultListVisibilityEvent = new EventEmitter<boolean>();

  //visibility: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  drop(event: CdkDragDrop<string[]>, arrayToChange: any) {
    moveItemInArray(arrayToChange, event.previousIndex, event.currentIndex);
  }

  showHideKeyResults(value: boolean) {
    //clicked button, so reverse the bool
    console.log('in the inner component objective-parent');
    value = !value;
    console.log('emitting output of value: ' + value);
    this.keyResultListVisibilityEvent.emit(value);
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
