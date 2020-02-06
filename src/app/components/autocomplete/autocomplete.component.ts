import { Component, OnInit, ViewChild, Input, EventEmitter, Output } from '@angular/core';
import { BehaviorSubject, of, throwError } from 'rxjs';
import { debounceTime, tap, switchMap, finalize, catchError } from 'rxjs/operators';
import { MatAutocomplete, MatAutocompleteTrigger, MatOptionSelectionChange } from '@angular/material';
import { FormControl, FormGroup } from '@angular/forms';
import { NotificationService } from '../../service/notification-service';
import { WeatherService } from '../../service/weather-service.service';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss']
})
export class AutocompleteComponent implements OnInit {
  lookupCtrl = new FormControl();
  filteredItems: any;
  isLoading = false;

  constructor(private weatherService: WeatherService, private notificationService: NotificationService) { }

  @Input()
  searchTerm: string;

  @Output()
  answerChanged = new EventEmitter<any>();


  optionSelectionChange(option: any, event: MatOptionSelectionChange) {
    if (event.isUserInput) {
      var answer = { key: option.Key, name: option.LocalizedName };
      this.lookupCtrl.setValue(answer);
      this.answerChanged.emit(option);
    }
  }


  handleEmptyInput(event: any) {
    if (event.target.value === '') {
    }
    return true;
  }

  displayFn(sector) {
    return sector ? sector.name : sector;
  }


  ngOnInit() { 

    this.lookupCtrl.valueChanges.pipe(
      debounceTime(1000),
      tap(() => {
        this.filteredItems = [];
      }),
      switchMap(value => {
        if (value == null || value === "" || typeof value === 'object') {
          return of(null);
        }
        if (new RegExp('^[A-Za-z ]+$').test(value)) {
          this.isLoading = true;
          return this.weatherService.getLocations(value).pipe(
            catchError(x => {
              this.notificationService.showError("error in search")
              return of([]) }),
            finalize(() => {
              this.isLoading = false;
            }));
        }
        else {
          this.notificationService.showError("Search only english latters")
          return of([])
        }
      }))
      .subscribe(data => {
        this.filteredItems = data;
      }, err => {
          debugger;
      });

    this.lookupCtrl.setValue({ key: "", name: this.searchTerm });
  }
}
