import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { Router } from '@angular/router';
import { BlogPost } from '../BlogPost';

@Component({
  selector: 'app-posts-table',
  templateUrl: './posts-table.component.html',
  styleUrls: ['./posts-table.component.css']
})
export class PostsTableComponent implements OnInit {
  blogPosts: Array<BlogPost> = []
  blgpsts: any;

  constructor(private _postService : PostService, private router : Router) { }

  ngOnInit(): void {
    this.blgpsts = this._postService.getAllPosts().subscribe(post => {
      this.blogPosts = post;
    })
  }

  rowClicked(e:Event,id: any) {
    this.router.navigate(['/admin/post', id]);
  }

  ngOnDestroy(): void { // need to unsubscribe to protect program from memory leaks
    if (this.blgpsts) this.blgpsts.unsubscribe();
  }

}
