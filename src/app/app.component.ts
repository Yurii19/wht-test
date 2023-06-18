import { AfterViewInit, ChangeDetectionStrategy, Component } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable, of } from 'rxjs';
import { AppState } from './states/app.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements AfterViewInit {
  @Select(AppState.selectIsLoading) isLoading$: Observable<any> | undefined;
  title = 'wht-agency-test';

  ngAfterViewInit(): void {
    console.log('Hello');
  }
  //isLoading$: Observable<boolean> = of(true);
}
