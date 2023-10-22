import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import {ShoppingListService} from "./shopping-list.service";
import {Subscription} from "rxjs";
import {IIngredient} from "../../shared/ingridient.model";
import {Store} from "@ngrx/store";
import {ShoppingListSelector} from "./store/shopping-list.selector";
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger"

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss'],
})
export class ShoppingListComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild("ulList", {static: false}) ulList: ElementRef;

  onChangeActiveIngredientSubscription: Subscription;
  getIngredientsSub: Subscription;
  activeIngredient: IIngredient | null;
  ingredients$ = this.store.select(ShoppingListSelector.ingredients);
  loader$ = this.store.select(ShoppingListSelector.loader);
  error$ = this.store.select(ShoppingListSelector.error);
  changedShoppingList: Subscription;

  constructor(
    private shoppingListService: ShoppingListService,
    private store: Store,
  ) {
  }

  ngOnInit() {
    this.getIngredientsSub = this.shoppingListService.getIngredientsList().subscribe();
    this.onChangeActiveIngredientSubscription = this.shoppingListService.activeIngredient.subscribe(ingredient => {
      this.activeIngredient = ingredient ? {...ingredient} : null;
    });
    this.changedShoppingList = this.shoppingListService.changedIngredientList.subscribe(res => {
      if (res.action === "added") {
        setTimeout(() => {
          this.startAnimationForListItem(this.ulList.nativeElement.lastElementChild);
        }, 0);
      }
      if (res.action === "edited") {
        setTimeout(() => {
          this.startAnimationForListItem(this.ulList.nativeElement.children[res.id]);
        }, 0);
      }
    })
  }

  ngAfterViewInit() {
    this.loader$.subscribe(res => {
      if (!res) {
        setTimeout(() => {
          this.startAnimationForAllItems();
        }, 0);
      }
    })
  }

  startAnimationForListItem(el: HTMLElement) {
    gsap.fromTo(el, {
      x: -100,
    }, {
      x: 0,
      opacity: 1,
      ease: "power3.inOut"
    })
  }

  startAnimationForAllItems() {
    gsap.fromTo(this.ulList.nativeElement.children, {
      x: -100,
    }, {
      opacity: 1,
      x: 0,
      stagger: 0.2,
      ease: "power3.inOut"
    })
  }


  onClickListItem(ingredient: IIngredient) {
    this.shoppingListService.activeIngredient.next(ingredient);
  }


  ngOnDestroy() {
    this.onChangeActiveIngredientSubscription.unsubscribe();
    this.getIngredientsSub.unsubscribe();
    this.changedShoppingList.unsubscribe();
  }

}
