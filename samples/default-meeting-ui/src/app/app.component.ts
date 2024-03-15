import { Component, ViewChild } from '@angular/core';
import { DyteMeeting, provideDyteDesignSystem, registerAddons } from '@dytesdk/angular-ui-kit';
import DyteClient from '@dytesdk/web-core';
import VideoBG from '@dytesdk/ui-kit-addons/video-background';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'default-meeting-ui';

  @ViewChild('meeting') $meetingEl!: DyteMeeting;

  async ngAfterViewInit() {
    const searchParams = new URL(window.location.href).searchParams;

    const authToken = searchParams.get('authToken');

    if (!authToken) {
      alert(
        "An authToken wasn't passed, please pass an authToken in the URL query to join a meeting."
      );
      return;
    }

    const meeting = await DyteClient.init({
      authToken,
    });

    const virtualBgAddon = new VideoBG({
      images: ['https://assets.dyte.io/backgrounds/bg_0.jpg'],
      modes: ['blur', 'virtual']
    })
    const newConfig = registerAddons([virtualBgAddon], meeting);
    provideDyteDesignSystem(document.body, {
      theme: 'light'
    });

    this.$meetingEl.meeting = meeting;
    this.$meetingEl.config = newConfig;
  }
}
