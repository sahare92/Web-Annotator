import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule }     from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


import { AppComponent } from './app.component';
import { RegisterUserComponent } from './components/users/registerUser.component';
import { LoginUserComponent } from './components/users/loginUser.component';
import { HomePageComponent } from './components/pages/homePage.component';
import { AboutPageComponent } from './components/pages/aboutPage.component';
import { WorkspacePageComponent } from './components/pages/workspacePage.component';
import { AnnotationComponent } from './components/pages/workspace/annotation.component';
import { ManuscriptsComponent } from './components/pages/manuscripts.component';

@NgModule({
  imports: [
              BrowserModule,
              HttpModule,
              FormsModule,
              AppRoutingModule,
              NgbModule,
              NgbModule.forRoot()
            ],
  declarations: [
                  AppComponent,
                  RegisterUserComponent,
                  LoginUserComponent,
                  HomePageComponent,
                  AboutPageComponent,
                  WorkspacePageComponent,
                  AnnotationComponent,
                  ManuscriptsComponent
                ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
