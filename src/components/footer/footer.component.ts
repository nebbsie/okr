import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CenterModule } from '@ui/center/center.module';
import { TextModule } from '@ui/text';
import { MatIconModule } from '@angular/material/icon';
import { IconModule } from '@ui/icon';
import { FlexModule } from '@ui/flex';
import { DirectivesModule } from '@directives/directives.module';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    CenterModule,
    TextModule,
    MatIconModule,
    IconModule,
    FlexModule,
    DirectivesModule,
  ],
  template: `
    <footer class="Footer">
      <ui-center justify="space-between" align="center">
        <ui-flex direction="column" align="flex-start">
          <ui-text
            weight="bold"
            size="xlarge"
            sizeTablet="xxlarge"
            sizeDesktop="xxlarge"
            colour="white"
            align="left"
            marginBottom="xxsmall"
          >
            okrhub
          </ui-text>
          <ui-text colour="white">
            &#169; 2022 okrhub. All rights reserved.
          </ui-text>
        </ui-flex>

        <ui-flex>
          <ui-icon link="/login" colour="white" marginRight="small">
            facebook
          </ui-icon>
          <ui-icon colour="white">mail</ui-icon>
        </ui-flex>
      </ui-center>
    </footer>
  `,
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {}
