import { Component } from '@angular/core';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent {
  favoriteSongs: { title: string, artist: string, selected: boolean }[] = [
    { title: 'Not Like Us', artist: 'Kendrick Lamar', selected: false },
    { title: 'Lunch', artist: 'Billie Eilish', selected: false },
  ];

  removeSong(index: number) {
    this.favoriteSongs.splice(index, 1);
  }

  toggleSelection(index: number) {
    this.favoriteSongs.forEach((song, i) => {
      if (i !== index) {
        song.selected = false;
      }
    });

    this.favoriteSongs[index].selected = !this.favoriteSongs[index].selected;
  }
}
