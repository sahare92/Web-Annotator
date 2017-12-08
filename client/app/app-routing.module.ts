import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomePageComponent } from './components/pages/homePage.component';
import { AboutPageComponent } from './components/pages/aboutPage.component';
import { WorkspacePageComponent } from './components/pages/workspacePage.component';
import { ManuscriptsComponent } from './components/pages/manuscripts.component';
import { ApproveUsersComponent } from './components/users/approveUsers.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home',  component: HomePageComponent },
  { path: 'about',  component: AboutPageComponent },
  { path: 'workspace',  component: WorkspacePageComponent },
  { path: 'manuscripts',  component: ManuscriptsComponent },
  { path: 'approve',  component: ApproveUsersComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}

/*
Copyright 2017 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/