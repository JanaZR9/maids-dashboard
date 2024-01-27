import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CachingService } from '../caching/caching.service';
import { of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'https://reqres.in/api/users';

  constructor(private http: HttpClient, private cachingService: CachingService) {}

  getUsers(page: number, searchTerm: string): Observable<any> {
    const cacheKey = `users_${page}_${searchTerm}`;
    const cachedData = this.cachingService.get(cacheKey);
  
    if (cachedData) {
      return of(cachedData);
    } else {
      const url = `${this.apiUrl}?page=${page}&q=${searchTerm}`;
      return this.http.get(url).pipe(
        tap((data) => this.cachingService.set(cacheKey, data)),
        catchError((error) => {
          console.error('Error fetching users:', error);
          return of(null); 
        })
      );
      }
    }
  getUserDetails(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get(url);
  }

}