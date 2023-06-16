import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable, of } from 'rxjs';
import { GetCats } from 'src/app/actions/app.actions';
import { CatsService } from 'src/app/services/cats.service';
import { AppState } from 'src/app/states/app.state';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  @Select(AppState.selectStateData) cats$: Observable<any> | undefined;
  cats: any = [];

  constructor(private catsService: CatsService, private store: Store) {
    //this.cats$ =
  }

  ngOnInit(): void {
    this.cats$?.subscribe((d) => {
      console.log(d)
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
