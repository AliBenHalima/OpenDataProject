import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export const HttpGet = (
  HttpClient: HttpClient,
  Url: String,
  token: String
): Observable<any> => {
  return HttpClient.get<any>(Url.toString());
};
//  {
//   headers: { Authorization: `Bearer ${token}`,'Content-Type': 'application/json' }
// }

export const HttpPost = (
  HttpClient: HttpClient,
  Url: String,
  body: any,
  token: String
): Observable<any> => {
  return HttpClient.post<any>(Url.toString(), body);
};

export const HttpPut = (
  HttpClient: HttpClient,
  Url: String,
  body: any,
  token: String
): Observable<any> => {
  return HttpClient.put<any>(Url.toString(), body);
};

export const HttpDelete = (
  HttpClient: HttpClient,
  Url: String,
  token: String
): Observable<any> => {
  return HttpClient.delete<any>(Url.toString());
};


