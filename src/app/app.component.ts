import {
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AppState } from './states/app.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  @Select(AppState.selectIsLoading) isLoading$: Observable<any> | undefined;
  title = 'wht-agency-test';
}
