import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from "@angular/router";

import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { ListComponent } from './list/list.component';
import { GiphyService } from './giphy.service';
import { SavedgifsComponent } from './savedgifs/savedgifs.component';

const ROUTES: Routes = [
  {path: "", component: ListComponent},
  {path: "gifs", component: ListComponent},
  {path: "savedgifs", component: SavedgifsComponent},
  {path: "**", redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    ListComponent,
    SavedgifsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [GiphyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
