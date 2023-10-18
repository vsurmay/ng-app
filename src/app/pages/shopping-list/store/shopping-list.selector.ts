import {createFeatureSelector, createSelector} from "@ngrx/store";
import {IShoppingListState} from "./shopping-list.reducer";

export namespace ShoppingListSelector {
  export const featureShoppingList = createFeatureSelector<IShoppingListState>("shoppingList");
  export const ingredients = createSelector(featureShoppingList, state => state.ingredients);
  export const loader = createSelector(featureShoppingList, state => state.loader);
  export const error = createSelector(featureShoppingList, state => state.error);
}
