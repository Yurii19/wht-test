import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { CatsService } from '../services/cats.service';
import { map, tap } from 'rxjs/operators';
import { GetCats, GetBreeds, GetCatsWithFilter } from '../actions/app.actions';
import { IBreed } from '../types';

export class CatsStateModel {
  cats: any;
  breeds: IBreed[] = [];
}

@State<CatsStateModel>({
  name: 'appstate',
  defaults: {
    cats: [
      {
        url: 'https://icons.iconarchive.com/icons/iconsmind/outline/256/Cat-icon.png',
      },
    ],
    breeds: [{ id: '', name: 'All' }],
  },
})
@Injectable()
export class AppState {
  constructor(private catsService: CatsService) {}

  @Selector()
  static selectStateCats(state: CatsStateModel) {
    return state.cats;
  }

  @Selector()
  static selectStateBreeds(state: CatsStateModel) {
    return state.breeds;
  }

  @Action(GetCats)
  getDataFromState(ctx: StateContext<CatsStateModel>) {
    return this.catsService.fetchCats().pipe(
      tap((returnData) => {
        const state = ctx.getState();

        ctx.setState({
          ...state,
          cats: returnData,
        });
      })
    );
  }

  @Action(GetCatsWithFilter)
  updateDataOfState(
    ctx: StateContext<CatsStateModel>,
    { payload }: GetCatsWithFilter
  ) {
    return this.catsService.fetchCatsWithFilter(payload).pipe(
      tap((returnData) => {
        const state = ctx.getState();
        ctx.setState({
          ...state,
          cats: [...returnData],
        });
      })
    );
  }

  @Action(GetBreeds)
  getBreedsFromState(ctx: StateContext<CatsStateModel>) {
    return this.catsService.fetchBreeds().pipe(
      map((breeds) =>
        breeds.map((breed: any) => ({ id: breed.id, name: breed.name }))
      ),
      tap((returnData) => {
        const state = ctx.getState();

        ctx.setState({
          ...state,
          breeds: [...state.breeds, ...returnData],
        });
      })
    );
  }
}
