import { Component } from '@angular/core';
import { Title }     from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public constructor(private titleService: Title) {
    this.titleService.setTitle('Globify');
  }
  
  selectedCityName: string = '';
  selectedCountryName: string = '';
  
  onLocationSelected(location: { cityName: string, countryName: string }) {
    this.selectedCityName = location.cityName;
    this.selectedCountryName = location.countryName;
  }
}
