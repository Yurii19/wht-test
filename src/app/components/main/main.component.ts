import { Component } from '@angular/core';
import { CatsService } from 'src/app/services/cats.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  constructor(private catsService: CatsService) {}
  getCats() {
    this.catsService.fetchCats().subscribe((d) => {
      console.log(d);
    });
  }
}
