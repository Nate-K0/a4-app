import { Component, OnInit } from '@angular/core';
import { BlogPost } from '../BlogPost';
import { PostService } from '../post.service';

@Component({
  selector: 'app-footer-posts',
  templateUrl: './footer-posts.component.html',
  styleUrls: ['./footer-posts.component.css']
})
export class FooterPostsComponent implements OnInit {
  posts:Array<BlogPost> | undefined;
  psts: any;

  constructor(private _postService : PostService) { }

  ngOnInit(): void {
    this.psts = this._postService.getPosts(1, "", "").subscribe(post => {
      this.posts = post.slice(0,3);
    })
  }

  ngOnDestroy(): void {
    if (this.psts) this.psts.unsubscribe();
  }
}
