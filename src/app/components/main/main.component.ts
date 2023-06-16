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
    limit: new FormControl(10),
    breeds: new FormControl({ id: 'all', name: 'All' }),
  });

  destroy$: Subject<void> = new Subject<any>();

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(new GetCats());
    this.store.dispatch(new GetBreeds());

    this.filters?.valueChanges
      .pipe(takeUntil(this.destroy$), debounceTime(500))
      .subscribe((filterValues: IFilter) => {
        this.store.dispatch(
          new GetCatsWithFilter({
            limit: filterValues.limit,
            breeds: {
              id: filterValues.breeds.id,
              name: filterValues.breeds.name,
            },
          })
        );
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(void 0);
    this.destroy$.unsubscribe();
  }
}
