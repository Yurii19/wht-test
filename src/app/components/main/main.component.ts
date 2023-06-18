import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable, Subject, debounceTime, takeUntil } from 'rxjs';
import {
  GetBreeds,
  GetCats,
  GetCatsWithFilter,
} from 'src/app/actions/app.actions';
import { AppState } from 'src/app/states/app.state';
import { FormControl, FormGroup } from '@angular/forms';
import { IFilter } from 'src/app/types';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit, OnDestroy {
  @Select(AppState.selectStateCats) cats$: Observable<any> | undefined;
  @Select(AppState.selectStateBreeds) breeds$: Observable<any> | undefined;

  filters: FormGroup = new FormGroup({
    limit: new FormControl(2),
    breeds: new FormControl(),
  });

  destroy$: Subject<void> = new Subject<any>();

  constructor(private store: Store) {}
  isLoading: boolean = false;

  ngOnInit(): void {
    this.store.dispatch(new GetCatsWithFilter(this.filters.value));
    this.store.dispatch(new GetBreeds());
   this.breeds$?.subscribe(d => this.filters.get('breeds')?.setValue(d[0]))

    this.filters?.valueChanges
      .pipe(takeUntil(this.destroy$), debounceTime(500))
      .subscribe((filterValues: IFilter) => {
        console.log(this.filters.value);
        this.store.dispatch(new GetCatsWithFilter(this.filters.value));
      });
  }

  logFilter(){
    console.log(this.filters.value)
  }
  ngOnDestroy(): void {
    this.destroy$.next(void 0);
    this.destroy$.unsubscribe();
  }
}
