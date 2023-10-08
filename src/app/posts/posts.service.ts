import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {IPostModel} from "./post.model";
import {map, Subject} from "rxjs";

@Injectable()
export class PostsService {

  isLoaderActive = new Subject<boolean>();
  posts = new Subject<IPostModel[]>()

  constructor(
    private http: HttpClient
  ) {
  }

  createPost(postValue: IPostModel) {
    this.http.post<{
      name: string
    }>(`https://ng-app-recipes-2103f-default-rtdb.europe-west1.firebasedatabase.app/posts.json`, postValue).subscribe(res => {
      console.log(res);
    });
  }

  getPostList() {
    this.isLoaderActive.next(true);
    this.http.get<{
      [key: string]: IPostModel
    }>(`https://ng-app-recipes-2103f-default-rtdb.europe-west1.firebasedatabase.app/posts.json`).pipe(map((res) => {
      console.log(res);
      const postArray = [];
      for (let key in res) {
        if (res.hasOwnProperty(key)) {
          const item = res[key];
          postArray.push({
            ...item,
            id: key
          })
        }
      }
      return postArray;
    })).subscribe(res => {
      this.posts.next(res);
      this.isLoaderActive.next(false);
    })
  }

}
