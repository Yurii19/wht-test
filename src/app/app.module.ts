import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainComponent } from './components/main/main.component';
import { NgxsModule } from '@ngxs/store';
import { CatsService } from './services/cats.service';

import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { AppState } from './states/app.state';

@NgModule({
  declarations: [AppComponent, MainComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgxsModule.forRoot([AppState]),
    HttpClientModule,
    MatButtonModule,
  ],
  providers: [CatsService],
  bootstrap: [AppComponent],
})
export class AppModule {}
