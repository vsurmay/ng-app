import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {map, Subscription} from "rxjs";
import {IPostModel} from "./post.model";
import {PostsService} from "./posts.service";


@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  form: FormGroup;
  posts: IPostModel[];
  isLoaderActive: boolean;
  loadingSubscription: Subscription;
  postsSubscription: Subscription

  constructor(
    private fb: FormBuilder,
    private postsService: PostsService
  ) {
  }

  ngOnInit() {
    this.createForm();
    this.postsService.getPostList();
    this.loadingSubscription = this.postsService.isLoaderActive.subscribe(loader => {
      this.isLoaderActive = loader;
    });
    this.postsSubscription = this.postsService.posts.subscribe(posts => {
      this.posts = posts;
    });
  }

  createForm() {
    this.form = this.fb.group({
      title: ["", Validators.required],
      content: ["", Validators.required]
    })
  }

  save() {
    if (this.form.invalid || this.form.untouched) return;
    this.postsService.createPost(this.form.getRawValue());
  }

}
