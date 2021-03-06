import { Component, Input, OnInit } from '@angular/core';
import { BlogPost } from '../BlogPost';
import { PostService } from '../post.service';

@Component({
  selector: 'app-latest-posts',
  templateUrl: './latest-posts.component.html',
  styleUrls: ['./latest-posts.component.css']
})
export class LatestPostsComponent implements OnInit {
  posts:Array<BlogPost> | undefined;
  psts: any;

  constructor(private _postService : PostService) { }

  ngOnInit(): void {
    this.psts = this._postService.getPosts(1, "", "").subscribe(post => {
      this.posts = post.slice(0,3);
    })
  }

  ngOnDestroy(): void { // need to unsubscribe to protect program from memory leaks
    if (this.psts) this.psts.unsubscribe();
  }

}
