import { Component, ViewChild } from '@angular/core';
import { DyteMeeting } from '@dytesdk/angular-ui-kit';
import DyteVideoBackgroundTransformer from '@dytesdk/video-background-transformer';
import DyteClient from '@dytesdk/web-core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'with-video-transformer';

  @ViewChild('meeting') $meetingEl!: DyteMeeting;

  async ngAfterViewInit() {
    const searchParams = new URL(window.location.href).searchParams;

    const authToken = searchParams.get('authToken');

    // pass an empty string when using v2 meetings
    // for v1 meetings, you would need to pass the correct roomName here
    const roomName = searchParams.get('roomName') || '';

    console.log({ authToken, roomName });

    if (!authToken) {
      alert(
        "An authToken wasn't passed, please pass an authToken in the URL query to join a meeting."
      );
      return;
    }

    const meeting = await DyteClient.init({
      roomName,
      authToken,
    });

    this.$meetingEl.meeting = meeting;

    const videoBackgroundTransformer =
      await DyteVideoBackgroundTransformer.init();

    // The video-background-transformer provides two functionalities
    // 1. Add background blur
    // 2. Add a background image

    // 1. To add background blur, with strength of 10
    meeting.self.addVideoMiddleware(
      await videoBackgroundTransformer.createBackgroundBlurVideoMiddleware(10)
    );

    // 2. To add a background image
    // meeting.self.addVideoMiddleware(
    //   await videoBackgroundTransformer.createStaticBackgroundVideoMiddleware(
    //     'https://assets.dyte.io/backgrounds/bg-dyte-office.jpg'
    //   )
    // );

    // We have the following set of images for your immediate use:
    // https://assets.dyte.io/backgrounds/bg-dyte-office.jpg
    // https://assets.dyte.io/backgrounds/bg_0.jpg
    // https://assets.dyte.io/backgrounds/bg_1.jpg
    // https://assets.dyte.io/backgrounds/bg_2.jpg
    // https://assets.dyte.io/backgrounds/bg_3.jpg
    // https://assets.dyte.io/backgrounds/bg_4.jpg
    // https://assets.dyte.io/backgrounds/bg_5.jpg
    // https://assets.dyte.io/backgrounds/bg_6.jpg
    // https://assets.dyte.io/backgrounds/bg_7.jpg
  }
}
