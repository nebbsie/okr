import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { AuthService } from "@core/services/auth.service";
import { Observable } from "rxjs";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  template: `
    <div class="PageContainer">
      <app-login-form
        (successfullyLoggedIn)="handleLoggedIn()"
      ></app-login-form>
    </div>
  `,
  styleUrls: ["./login.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  loggedIn$!: Observable<boolean>;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.loggedIn$ = this.auth.isLoggedIn();
  }

  async handleLoggedIn() {
    await this.router.navigate(["/dashboard"]);
  }
}
