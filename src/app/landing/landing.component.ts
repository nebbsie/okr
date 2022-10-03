import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";

@Component({
  selector: "app-landing",
  template: ` <ui-link link="/login">Go to Login page</ui-link> `,
  styleUrls: ["./landing.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
