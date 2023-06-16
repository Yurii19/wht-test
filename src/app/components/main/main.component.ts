import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable, Subject, of } from 'rxjs';
import { GetCats } from 'src/app/actions/app.actions';
import { CatsService } from 'src/app/services/cats.service';
import { AppState } from 'src/app/states/app.state';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  @Select(AppState.selectStateCats) cats$: Observable<any> | undefined;
  @Select(AppState.selectStateBreeds) breeds$: Observable<any> | undefined;
  cats: any = [];
 // breeds$: Observable<any> = new Observable();
  filters: FormGroup = new FormGroup({
    limit: new FormControl(10),
    breeds: new FormControl(),
  });

  destroy$: Subject<void> = new Subject<any>();

  constructor(private catsService: CatsService, private store: Store) {
    //this.cats$ =
  }

  ngOnInit(): void {
    this.cats$?.subscribe((d) => {
      console.log(d);
      this.cats = d;
    });

    this.store.dispatch(new GetCats());
  }
  getCats() {
    //   this.catsService.fetchCats().subscribe((d) => {
    //     console.log(d);
    //   });
  }
}
