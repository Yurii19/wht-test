import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { CatsService } from '../services/cats.service';
import { map, tap } from 'rxjs/operators';
import { GetCats } from '../actions/app.actions';

export class CatsStateModel {
  cats: any;
}

@State<CatsStateModel>({
  name: 'appstate',
  defaults: {
    cats: [
      {
        url: 'https://icons.iconarchive.com/icons/iconsmind/outline/256/Cat-icon.png',
      },
    ],
  },
})
@Injectable()
export class AppState {
  constructor(private catsService: CatsService) {}

  @Selector()
  static selectStateData(state: CatsStateModel) {
    return state.cats;
  }

  @Action(GetCats)
  getDataFromState(ctx: StateContext<CatsStateModel>) {
    return this.catsService.fetchCats().pipe(
      tap((returnData) => {
        const state = ctx.getState();

        ctx.setState({
          ...state,
          cats: returnData, //here the data coming from the API will get assigned to the users variable inside the appstate
        });
      })
    );
  }

  // @Action(AddUsers)
  // addDataToState(ctx: StateContext<UserStateModel>, { payload }: AddUsers) {
  //     return this._du.addUsers(payload).pipe(tap(returnData => {
  //         const state=ctx.getState();
  //         ctx.patchState({
  //             users:[...state.users,returnData]
  //         })
  //     }))
  // }

  // @Action(UpdateUsers)
  // updateDataOfState(ctx: StateContext<UserStateModel>, { payload, id, i }: UpdateUsers) {
  //     return this._du.updateUser(payload, i).pipe(tap(returnData => {
  //         const state=ctx.getState();

  //         const userList = [...state.users];
  //         userList[i]=payload;

  //         ctx.setState({
  //             ...state,
  //             users: userList,
  //         });
  //     }))
  // }

  // @Action(DeleteUsers)
  // deleteDataFromState(ctx: StateContext<UserStateModel>, { id }: DeleteUsers) {
  //     return this._du.deleteUser(id).pipe(tap(returnData => {
  //         const state=ctx.getState();
  //         console.log("The is is",id)
  //         //Here we will create a new Array called filteredArray which won't contain the given id and set it equal to state.todo
  //         const filteredArray=state.users.filter(contents=>contents.id!==id);

  //         ctx.setState({
  //             ...state,
  //             users:filteredArray
  //         })
  //     }))
  // }
}
