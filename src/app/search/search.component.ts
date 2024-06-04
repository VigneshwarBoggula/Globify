import { Component, OnInit } from '@angular/core';
import { CityService, City } from 'src/services/city.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  query: string = '';
  cities: City[] = [];
  filteredCities: City[] = []

  constructor(private cityService: CityService) { }

  ngOnInit(): void {
    this.cityService.getCities().subscribe(data => {
      this.cities = data;
    });
  }

  onSearch(): void {
    if (this.query.length > 0) {
      this.filteredCities = this.cities.filter(city => city.city.toLowerCase().includes(this.query.toLowerCase()))
      .slice(0, 5);
    }
    else {
      this.filteredCities = [];
    }
  }

  selectCity(cityName: string): void {
    this.query = cityName;
    this.filteredCities = [];
  }
}
