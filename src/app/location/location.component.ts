import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent {
  cityName: string = 'New York';
  countryName: string = 'United States';
  timezoneOffset: number = -5 * 60; 

  currentTime: string = '';

  constructor() {
    this.updateTime(); 
    setInterval(() => {
      this.updateTime(); 
    }, 1000);
  }

  updateTime() {
    const now = new Date();
    const offsetInMilliseconds = this.timezoneOffset * 60000; 
    const localTime = new Date(now.getTime() + offsetInMilliseconds);
    this.currentTime = this.formatTime(localTime);
  }

  formatTime(date: Date): string {
    let hours = date.getHours().toString();
    let minutes = date.getMinutes().toString();

    if (hours.length < 2) {
      hours = '0' + hours;
    }
    if (minutes.length < 2) {
      minutes = '0' + minutes;
    }

    return `${hours}:${minutes}`;
  }
}
