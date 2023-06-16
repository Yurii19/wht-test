import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable, of } from 'rxjs';
import { CatsService } from 'src/app/services/cats.service';
import { AppState } from 'src/app/states/app.state';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  
  @Select(AppState.selectStateData) cats$: Observable<any> | undefined ;

  constructor(private catsService: CatsService, private store: Store) {
    //this.cats$ =
  }

  ngOnInit(): void {
    // this.cats$ = this.store.select('cats');
    // this.cats$.subscribe(d =>{
    //   console.log(d)
    // })
  }
  getCats() {
    this.catsService.fetchCats().subscribe((d) => {
      console.log(d);
    });
  }
}
