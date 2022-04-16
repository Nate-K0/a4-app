import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit {
  tags!: Array<string>;
  tgs: any;

  constructor(private _postService : PostService) { }

  ngOnInit(): void {
    this.tgs = this._postService.getTags().subscribe(tag => {
      this.tags = tag;
    })
  }

  ngOnDestroy(): void {
    if (this.tgs) this.tgs.unsubscribe();
  }
}
