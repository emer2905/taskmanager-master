import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders ,HttpClientModule} from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../modelos/user';


const LOGIN_URL = 'https://app-nvc5nplm7q-uc.a.run.app/api/users';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor(private http: HttpClient) {}

  
  login(user: User): Observable<any> {
    return this.http.get<User>(LOGIN_URL + "/"+ user.email); 
  }

  createUser(user: User): Observable<any> {
    const body = { Email: user.email };   
    return this.http.post<any>(LOGIN_URL, body);
  }

  
}