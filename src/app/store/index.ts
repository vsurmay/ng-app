import {ActionReducerMap} from '@ngrx/store';
import {IShoppingListState, shoppingListReducer} from "../pages/shopping-list/store/shopping-list.reducer";

export interface State {
  shoppingList: IShoppingListState
}

export const reducers: ActionReducerMap<State> = {
  shoppingList: shoppingListReducer
};
