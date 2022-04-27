import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { WeatherService } from './pages/weather/services/weather.service';
import { WeatherData } from './shared/interfaces/weather.interface';
import { GeoLocationService } from './shared/services/geo-location.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title = 'weatherAPP';
  public weather$!: Observable<WeatherData>;

  constructor(private readonly _weather: WeatherService,
    private readonly _location: GeoLocationService
  ) {
    if (navigator?.geolocation) this.getLocation();  //Sólo geolocalizo y el navegador lo permite
  };

  public onSearch(city: string): void {
    this.weather$ = this._weather.getWeatherByName(city);
  }

  private async getLocation(): Promise<void> {
    try {
      const { coords } = await this._location.getCurrentPosition(); //coords es un objeto; por eso {}
      this.weather$ = this._weather.getWeatherByCoords(coords);
    } catch (error) {
      console.log(error);
    }
  }
}