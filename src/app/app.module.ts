import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { UserComponent } from './components/user/user.component';
import { UserdetailsComponent } from './components/userdetails/userdetails.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoadingInterceptor } from './shared/intercerptors/loading.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpcachInterceptor } from './shared/intercerptors/httpcach.interceptor';
import { FormBuilder, FormsModule } from '@angular/forms';
import { SearchPipe } from './shared/pipe/search.pipe';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    HeaderComponent,
    HomeComponent,
    UserComponent,
    UserdetailsComponent,
    SearchPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    FormsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpcachInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
