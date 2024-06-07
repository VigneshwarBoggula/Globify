import { Component } from '@angular/core';

@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.css']
})
export class SongComponent {
  isLiked = false;
  isPlaying = false;

  toggleLike() {
    this.isLiked = !this.isLiked;
  }

  togglePlayPause() {
    this.isPlaying = !this.isPlaying;
  }
}
