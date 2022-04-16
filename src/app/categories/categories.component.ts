import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categories: Array<any> | undefined;
  categ: any;

  constructor(private _postService : PostService) { }

  ngOnInit(): void {
    this.categ = this._postService.getCategories().subscribe(category => {
      this.categories = category;
    })
  }

  ngOnDestroy(): void {
    if (this.categ) this.categ.unsubscribe();
  }
}
