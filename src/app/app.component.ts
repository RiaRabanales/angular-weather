import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { WeatherService } from './pages/weather/services/weather.service';
import { WeatherData } from './shared/interfaces/weather.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title = 'weatherAPP';
  public weather$!: Observable<WeatherData>;

  constructor(private readonly _weather: WeatherService){};

  public onSearch(city: string): void {
    this.weather$ = this._weather.getWeatherByName(city);
  }
}

/* nombre
https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}

latlong
https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}

*/