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
      <ng-container *ngFor="let okr of dataSource">
        <app-objective-parent-card
          [okr]="okr"
          [visibility]="showKeyResults"
          (keyResultListVisibilityEvent)="showHideKeyResults($event)"
        ></app-objective-parent-card>

        <!--start draggable inner keyResults-->
        <app-key-result-list
          *ngIf="showKeyResults"
          [keyResults]="okr.keyResults"
        ></app-key-result-list>
        <!--end draggable box inner keyResults-->
      </ng-container>
    </div>
  `,
  styleUrls: ['./objective-card-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ObjectiveCardListComponent implements OnInit {
  showKeyResults: boolean = false;
  //@Input() okr: any;
  @Input() dataSource: any;
  // @Output() keyResultListVisibilityEvent = new EventEmitter<boolean>();

  constructor() {}

  ngOnInit(): void {}

  drop(event: CdkDragDrop<string[]>, arrayToChange: any) {
    console.log('parent drop called');
    console.log('previous index: ' + event.previousIndex);
    console.log('current index: ' + event.currentIndex);
    moveItemInArray(arrayToChange, event.previousIndex, event.currentIndex);
  }

  showHideKeyResults(event: boolean) {
    console.log(
      'showsing the output of bool from parent (this.showKeyResults)'
    );
    console.log(this.showKeyResults);
    console.log('showing the output of the child bool passed back (event)');
    console.log(event);
    this.showKeyResults = event; //!this.showKeyResults;
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
