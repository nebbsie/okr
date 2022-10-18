import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-landing-video',
  template: `
    <div class="VideoContainer">
      <iframe
        src="https://www.youtube-nocookie.com/embed/lJIrF4YjHfQ?controls=0"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    </div>
  `,
  styleUrls: ['./landing-video.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingVideoComponent {}
