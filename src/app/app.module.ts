import { NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TabViewModule } from "primeng/tabview";
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import {DialogModule  } from "primeng/dialog";
import { CardModule } from 'primeng/card';
import {ButtonModule  } from "primeng/button";
import {TableModule  } from "primeng/table";
import { DropdownModule } from "primeng/dropdown";
import { DataViewModule, DataViewLayoutOptions } from 'primeng/dataview';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SearchbarComponent } from './searchbar/searchbar.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UploadsanctionlistComponent } from './uploadsanctionlist/uploadsanctionlist.component';
import { EusanctionComponent } from './eusanction/eusanction.component';
import { UksanctionComponent } from './uksanction/uksanction.component';
import { UnsanctionComponent } from './unsanction/unsanction.component';
import { PepsanctionComponent } from './pepsanction/pepsanction.component';
import { UnentitysanctionComponent } from './unentitysanction/unentitysanction.component';
import { UnindividualsanctionComponent } from './unindividualsanction/unindividualsanction.component';
import { LoginComponent } from './login/login.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { AuthGuard } from './auth/auth.guard';
import { AuthInterceptor } from './auth/auth.interceptor';
import { UserService } from './auth/user.service';
import { UssanctionComponent } from './ussanction/ussanction.component';
import { UserManualComponent } from './user-manual/user-manual.component';
import { SigninComponent } from './signin/signin.component';
import { HomeComponent } from './home/home.component';
import { DividerModule } from 'primeng/divider';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalComponent } from './modal/modal.component';
import { SearchPipe } from './searchbar/search-pipe';
import { SearchUpperPipe } from './searchbar/search-upper-pipe';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SearchbarComponent,
    UserDetailComponent,
    UploadsanctionlistComponent,
    EusanctionComponent,
    UksanctionComponent,
    UnsanctionComponent,
    SearchPipe,
    SearchUpperPipe,
    PepsanctionComponent,
    UnentitysanctionComponent,
    UnindividualsanctionComponent,
    LoginComponent,
    ForbiddenComponent,
    UssanctionComponent,
    
    UserManualComponent,
    SigninComponent,
    HomeComponent,
    ModalComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FontAwesomeModule,
    DividerModule,
    FormsModule,
    DropdownModule,
    CardModule,
    DataViewModule,
    DialogModule,
    TabViewModule,
    ButtonModule,
    TableModule,
    HttpClientModule,
    AppRoutingModule
  ],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [
    DataViewLayoutOptions,
    
    AuthGuard,
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  },
  UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
