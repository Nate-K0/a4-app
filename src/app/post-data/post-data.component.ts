import { Component, OnInit } from '@angular/core';
import { BlogPost } from '../BlogPost';
import { PostService } from '../post.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post-data',
  templateUrl: './post-data.component.html',
  styleUrls: ['./post-data.component.css']
})
export class PostDataComponent implements OnInit {
  // post:BlogPost | undefined;
  post:BlogPost = new BlogPost();
  querySub : any;
  commentName!: string;
  commentText!: string;

  constructor(private _postService : PostService, private route : ActivatedRoute) { }

  ngOnInit(): void {
    this.querySub = this.route.params.subscribe(params =>{
      //TODO: Get post by Id params['id'] and store the result in this.post
      this._postService.getPostbyId(params['id']).subscribe(pst => {
        this.post = pst;
      })
    })
  }

  submitComment() :void {
    this.post?.comments.push(
      {
        author: this.commentName,
        comment: this.commentText,
        date: new Date().toLocaleDateString()
      }
    );

    this._postService.updatePostById(this.post._id, this.post).subscribe(() => {
      this.commentName = "";
      this.commentText = "";
    });
  }

  ngOnDestroy(): void {
    if(this.querySub) this.querySub.unsubscribe();
  }
}
