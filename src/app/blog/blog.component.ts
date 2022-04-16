import { Component, OnInit } from '@angular/core';
// import blogData from '../blogData.json';
import { BlogPost } from '../BlogPost';
import { PostService } from '../post.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  // blogPosts: Array<BlogPost> = blogData; old code from a3
  blogPosts!: Array<BlogPost>;
  page :number = 1;
  tag :string = ''; // blank instead of null
  category :string = ''; // blank instead of null
  querySub :any;

  constructor(private _postService : PostService, private route : ActivatedRoute) { }

  ngOnInit(): void {
    this.querySub = this.route.queryParams.subscribe(params => {
      if (params['tag']) { 
        this.tag = params['tag']; 
        this.category = '';
      } else {
        this.tag = '';
      }

      if (params['category']) { 
        this.category = params['category']; 
        this.tag = '';
      } else {
        this.category = '';
      }

      this.getPage(+params['page'] || 1); 
    });
  }

  getPage(num:number) {
    this._postService.getPosts(num, this.tag, this.category).subscribe(post => {
      if (post.length > 0) {
        this.blogPosts = post;
        this.page = num;
      }
    });
  }

  ngOnDestroy() {
    if(this.querySub) this.querySub.unsubscribe();
  }

  newPage(p:number) {
    if (p) {
      this.getPage(p);
    }
  }
}
