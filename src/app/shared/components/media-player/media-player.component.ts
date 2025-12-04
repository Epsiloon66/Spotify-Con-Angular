import { Component, OnInit, OnDestroy } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { MultimediaService } from '@core/services/multimedia.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-media-player',
  templateUrl: './media-player.component.html',
  styleUrl: './media-player.component.css'
})
export class MediaPlayerComponent implements OnInit, OnDestroy {
  mockCover: TrackModel = {
    name: "BEBE (Official Video)",
    album: "Giolì & Assia",
    cover: "https://i.scdn.co/image/ab67616d0000b27345ca41b0d2352242c7c9d4bc",
    _id: 1,
    url: "http://localhost:3000/track-3.mp3"
  };

  state: 'paused' | 'playing' = 'paused';
  private subscription: Subscription = new Subscription();

  constructor(public multimediaService: MultimediaService) {}

  ngOnInit(): void {
    // Subscribe to player status to update local state
    this.subscription.add(
      this.multimediaService.playerStatus$.subscribe(status => {
        this.state = status;
      })
    );

    // Set initial track
    this.multimediaService.trackInfo$.next(this.mockCover);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  /**
   * Handle click on progress bar to seek to position
   */
  handlePosition(event: MouseEvent): void {
    const progressBar = event.currentTarget as HTMLElement;
    const clickX = event.offsetX;
    const width = progressBar.offsetWidth;
    const percentage = (clickX / width) * 100;
    this.multimediaService.seekAudio(percentage);
  }
}
