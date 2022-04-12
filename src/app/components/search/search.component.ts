import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map, filter, tap } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  template: `
    <div class="search">
      <input class="search__input" placeholder="City..." [formControl]="inputSearch" />
    </div>
  `,
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  inputSearch = new FormControl('');
  @Output() submittedSearch = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
    this.onChange();
  }

  private onChange(): void {
    //Escucha el input cada vez que cambia para emitir el valor
    this.inputSearch.valueChanges
      .pipe(
        map( search => search.trim() ), //debiera tipar: (search: string)
        debounceTime(750),  //Emite después de que hayan pasado unos milisegundos: evita ataque continuo a la api
        distinctUntilChanged(),      //Devuelve un operador pero sólo si garantiza que el valor emitido no sea el mismo
        filter( search => search !== '' ),
        tap( search => this.submittedSearch.emit(search) )   //Sólo emite el valor que recibe a través de un input
      )
      .subscribe();
  }

}
