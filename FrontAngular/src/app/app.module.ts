import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations' 
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { LoginModule } from './login/login.module';
import { RegisterModule } from './register/register.module';
import { UserProfileModule } from './user-profile/user-profile.module';
import { TokenService } from './core/token/token.service';
import { AuthInterceptor } from './core/auth/auth.interceptor';
import { AlertModule } from './shared/components/alert/alert.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AlertModule,
    BrowserAnimationsModule,
    LoginModule,
    RegisterModule,
    UserProfileModule,
    AppRoutingModule,
  ],
  providers: [TokenService, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
