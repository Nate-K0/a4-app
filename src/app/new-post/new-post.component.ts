import { Component, Input, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { Router } from '@angular/router';
import { BlogPost } from '../BlogPost';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {
  blogPost: BlogPost = new BlogPost();
  tags!: string;
  blgpsts: any;

  constructor(private _postService : PostService, private _router : Router) { }

  ngOnInit(): void {
    
  }

  formSubmit(): void {
    this.blogPost.tags = this.tags.split(",").map(tag => tag.trim()); // convert the string to an array and remove whitespace
    this.blogPost.isPrivate = false;
    this.blogPost.postDate = new Date().toLocaleDateString();
    this.blogPost.postedBy = "BTI425 Student";
    this.blogPost.views = 0;
    this.blgpsts = this._postService.newPost(this.blogPost).subscribe(() => this._router.navigate(['/admin']));
  }

  ngOnDestroy() {
    if (this.blgpsts) this.blgpsts.unsubscribe();
  }
}
