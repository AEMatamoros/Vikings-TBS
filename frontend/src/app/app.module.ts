import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreatePlayerComponent } from './components/create-player/create-player.component';
import { SelectPlayerComponent } from './components/select-player/select-player.component';
import { BatleComponent } from './components/batle/batle.component';

import { Router, RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CardComponent } from './components/card/card.component';
 // Router
const routes: Routes = [
  { path: '', component: CreatePlayerComponent },
  { path: 'select', component: SelectPlayerComponent },
  { path: 'batle/:p1/:p2', component: BatleComponent },
];
@NgModule({
  declarations: [
    AppComponent,
    CreatePlayerComponent,
    SelectPlayerComponent,
    BatleComponent,
    CardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
