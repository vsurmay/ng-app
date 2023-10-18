import {IIngredient} from "../../../shared/ingridient.model";
import {createReducer, on} from "@ngrx/store";
import {ShoppingListActions} from "./shopping-list.actions";

export interface IShoppingListState {
  ingredients: IIngredient[],
  loader: boolean,
  error: string
}

const initialState: IShoppingListState = {
  ingredients: [],
  loader: false,
  error: ""
}

export const shoppingListReducer = createReducer(initialState,
  on(ShoppingListActions.addedToShoppingList, (state, action) => {
    return {...state, ingredients: [...state.ingredients, action.ingredient]};
  }),
  on(ShoppingListActions.getShoppingList, (state, action) => {
    return {...state, ingredients: action.ingredients};
  }),
  on(ShoppingListActions.updateShoppingListItem, (state, action) => {
    const ingredients = [...state.ingredients].map(el => {
      if (el.id === action.ingredient.id) {
        return action.ingredient;
      } else {
        return el;
      }
    })
    return {...state, ingredients};
  }),
  on(ShoppingListActions.deleteFromShoppingList, (state, action) => {
    const ingredients = [...state.ingredients].filter(el => el.id !== action.id);
    return {...state, ingredients};
  }),
  on(ShoppingListActions.addedIngredientsToShoppingList, (state, action) => {
    return {...state, ingredients: [...state.ingredients, ...action.ingredients]};
  }),
  on(ShoppingListActions.changeLoaderValue, (state, action) => {
    return {...state, loader: action.loaderValue};
  }),
  on(ShoppingListActions.changeErrorValue, (state, action) => {
    return {...state, error: action.errorValue};
  }))
