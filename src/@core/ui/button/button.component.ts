import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'ui-button',
  template: `
    <button [class.FullWidth]="fullWidth" [color]="colour" mat-raised-button>
      <ng-container *ngIf="!loading">
        <ng-content></ng-content>
      </ng-container>

      <span
        *ngIf="loading"
        [class.LightStyle]="lightStyle"
        [class.DarkStyle]="!lightStyle"
      ></span>
    </button>
  `,
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent implements OnInit {
  @Input() colour: ThemePalette;

  @Input() fullWidth = false;
  @Input() loading? = false;

  lightStyle = false;

  ngOnInit() {
    this.lightStyle = this.colour === 'primary';
  }
}
