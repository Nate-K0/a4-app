import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BlogPost } from './BlogPost';
import { HttpClient } from '@angular/common/http';

const perPage:number = 6;

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  getPosts(page:number, tag:string, category:string) : Observable<BlogPost[]> {
    if (typeof tag !== 'undefined' || tag != null) {
      return this.http.get<BlogPost[]>("https://blueberry-pie-37015.herokuapp.com/api/posts?page="+page+"&perPage="+perPage+"&tag="+tag);
    }

    if (typeof category !== 'undefined' || category != null) {
      return this.http.get<BlogPost[]>("https://blueberry-pie-37015.herokuapp.com/api/posts?page="+page+"&perPage="+perPage+"&category="+category);
    }

    return this.http.get<BlogPost[]>("https://blueberry-pie-37015.herokuapp.com/api/posts?page="+page+"&perPage="+perPage);
  }

  getPostbyId(id:number): Observable<BlogPost> {
    return this.http.get<BlogPost>("https://blueberry-pie-37015.herokuapp.com/api/posts/"+id);
  }

  getCategories(): Observable<any> {
    return this.http.get<any>("https://blueberry-pie-37015.herokuapp.com/api/categories");
  }

  getTags(): Observable<string[]> {
    return this.http.get<string[]>("https://blueberry-pie-37015.herokuapp.com/api/tags");
  }

  getAllPosts(): Observable<BlogPost[]> {
    return this.http.get<BlogPost[]>("https://blueberry-pie-37015.herokuapp.com/api/posts?page=" + 1 + "&perPage=" + Number.MAX_SAFE_INTEGER + "");
  }

  newPost(data: BlogPost): Observable<any> {
    return this.http.post<any>(`https://blueberry-pie-37015.herokuapp.com/api/posts`, data);
  }

  updatePostById(id: string, data: BlogPost): Observable<any> {
    return this.http.put<any>(`https://blueberry-pie-37015.herokuapp.com/api/posts/${id}`, data);
  }

  deletePostById(id: string): Observable<any> {
    return this.http.delete<any>(`https://blueberry-pie-37015.herokuapp.com/api/posts/${id}`);
  }
}
