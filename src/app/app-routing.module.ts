import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UploadsanctionlistComponent } from './uploadsanctionlist/uploadsanctionlist.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { AppComponent } from './app.component';
import { UksanctionComponent } from './uksanction/uksanction.component';
import { UnsanctionComponent } from './unsanction/unsanction.component';
import { UnentitysanctionComponent } from './unentitysanction/unentitysanction.component';
import { UnindividualsanctionComponent } from './unindividualsanction/unindividualsanction.component';
import { PepsanctionComponent } from './pepsanction/pepsanction.component';
import { EusanctionComponent } from './eusanction/eusanction.component';
import { LoginComponent } from './login/login.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { AuthGuard } from './auth/auth.guard';
import { UssanctionComponent } from './ussanction/ussanction.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  
  { path: 'login', component: LoginComponent },
  {
    path: 'home', component: HomeComponent,
    canActivate: [AuthGuard], data: { role: "USER" }
  },

  // { path: '**', component: ForbiddenComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
