import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';

@Component({
  selector: 'app-card-player',
  templateUrl: './card-player.component.html',
  styleUrl: './card-player.component.css'
})
export class CardPlayerComponent {
  @Input() mode:'small' | 'big' = 'small';
  @Input() track!: TrackModel;
  @Output() trackToPlay = new EventEmitter<TrackModel>();

  /**
   * Emit the track to be played
   */
  sendPlay(track: TrackModel): void {
    this.trackToPlay.emit(track);
  }
}
