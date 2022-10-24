import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-footer',
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
