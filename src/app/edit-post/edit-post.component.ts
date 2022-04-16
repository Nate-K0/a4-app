import { Component, Input, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { Router, ActivatedRoute } from '@angular/router';
import { BlogPost } from '../BlogPost';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {
  @Input() blogPost: BlogPost = new BlogPost();
  tags!: string;
  blgpsts: any;

  constructor(private _postService : PostService, private router : Router, private activatedRoute : ActivatedRoute) { }

  ngOnInit(): void {
    this.blgpsts = this._postService.getPostbyId(this.activatedRoute.snapshot.params['id']).subscribe(post => {
      this.blogPost = post;
      this.tags = this.blogPost.tags.toString();
    })
  }

  formSubmit(): void {
    this.blogPost.tags = this.tags.split(",").map(tag => tag.trim());
    this.blgpsts = this._postService.updatePostById(this.blogPost._id, this.blogPost).subscribe(() => this.router.navigate(['/admin']));
  }

  deletePost(id:string) {
    this.blgpsts = this._postService.deletePostById(id).subscribe(() => this.router.navigate(['/admin']));
  }

  ngOnDestroy() {
    if (this.blgpsts) this.blgpsts.unsubscribe();
  }
}
