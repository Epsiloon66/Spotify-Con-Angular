import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TrackModel } from '@core/models/tracks.model';

@Injectable({
  providedIn: 'root'
})
export class MultimediaService {
  // Observable for current track information
  public trackInfo$ = new BehaviorSubject<TrackModel | null>(null);
  
  // Observable for elapsed time display (format: "00:00")
  public timeElapsed$ = new BehaviorSubject<string>('00:00');
  
  // Observable for remaining time display (format: "-00:00")
  public timeRemaining$ = new BehaviorSubject<string>('-00:00');
  
  // Observable for progress bar percentage (0-100)
  public playerPercentage$ = new BehaviorSubject<number>(0);
  
  // Observable for playback state
  public playerStatus$ = new BehaviorSubject<'paused' | 'playing'>('paused');

  private audio: HTMLAudioElement | null = null;

  constructor() {
    this.initializeAudioListeners();
  }

  /**
   * Initialize audio element and event listeners
   */
  private initializeAudioListeners(): void {
    this.audio = new Audio();
    
    // Update time and percentage as audio plays
    this.audio.addEventListener('timeupdate', () => {
      if (this.audio) {
        const currentTime = this.audio.currentTime;
        const duration = this.audio.duration;
        
        if (!isNaN(duration)) {
          // Update elapsed time
          this.timeElapsed$.next(this.formatTime(currentTime));
          
          // Update remaining time
          const remaining = duration - currentTime;
          this.timeRemaining$.next('-' + this.formatTime(remaining));
          
          // Update percentage
          const percentage = (currentTime / duration) * 100;
          this.playerPercentage$.next(percentage);
        }
      }
    });

    // Update status when audio ends
    this.audio.addEventListener('ended', () => {
      this.playerStatus$.next('paused');
    });

    // Update status when audio plays
    this.audio.addEventListener('play', () => {
      this.playerStatus$.next('playing');
    });

    // Update status when audio pauses
    this.audio.addEventListener('pause', () => {
      this.playerStatus$.next('paused');
    });
  }

  /**
   * Format seconds to MM:SS format
   */
  private formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }

  /**
   * Toggle between play and pause
   */
  public togglePlayer(): void {
    if (this.audio) {
      if (this.audio.paused) {
        this.audio.play();
      } else {
        this.audio.pause();
      }
    }
  }

  /**
   * Set a new audio track
   */
  public setAudio(track: TrackModel): void {
    if (this.audio) {
      this.audio.src = track.url;
      this.audio.load();
      this.audio.play();
      this.trackInfo$.next(track);
    }
  }

  /**
   * Seek to a specific position (percentage 0-100)
   */
  public seekAudio(percentage: number): void {
    if (this.audio && !isNaN(this.audio.duration)) {
      const newTime = (percentage / 100) * this.audio.duration;
      this.audio.currentTime = newTime;
    }
  }
}
