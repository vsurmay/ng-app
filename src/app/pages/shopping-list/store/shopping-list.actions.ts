import {createAction, props} from "@ngrx/store";
import {IIngredient} from "../../../shared/ingridient.model";

export namespace ShoppingListActions {

  export const getShoppingList = createAction("GET_SHOPPING_LIST", props<{ingredients: IIngredient[]}>());
  export const addedToShoppingList = createAction("ADDED_TO_SHOPPING_LIST", props<{ingredient: IIngredient}>());
  export const deleteFromShoppingList = createAction("DELETE_FROM_SHOPPING_LIST", props<{id: string}>());
  export const updateShoppingListItem = createAction("UPDATE_SHOPPING_LIST_ITEM", props<{ingredient: IIngredient}>());
  export const addedIngredientsToShoppingList = createAction("ADDED_INGREDIETNS_TO_SHOPPING_LIST", props<{ingredients: IIngredient[]}>());
  export const changeLoaderValue = createAction("CHANGE_LOADER", props<{loaderValue: boolean}>());
  export const changeErrorValue = createAction("CHANGE_ERROR", props<{errorValue: string}>())
}
