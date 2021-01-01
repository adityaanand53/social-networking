import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class APIInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = sessionStorage.getItem('token');
    if (token) {
      const authReq =req.clone({ setHeaders: {'x-access-token': token } });


      console.log('Intercepted HTTP call', authReq);

      return next.handle(authReq);
    }
    return next.handle(req);
  }
}
