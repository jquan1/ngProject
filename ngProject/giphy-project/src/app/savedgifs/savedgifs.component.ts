import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Router } from "@angular/router";
import { Giphy } from '../giphy';
import { GiphyService } from '../giphy.service';
import { OnChanges } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-savedgifs',
  templateUrl: './savedgifs.component.html',
  styleUrls: ['./savedgifs.component.css']
})
export class SavedgifsComponent implements OnInit{//, OnChanges 

  gifs = new Array<Giphy>();

  private sub: Subscription;

  constructor(private giphySvc: GiphyService, private router: Router) { }

  ngOnInit() {
    this.loadUserSavedGif();
    this.giphySvc.viewSavedGifsEvent.next();
  }
  // ngOnLoad() {
  //   this.loadUserSavedGif();
  // }
  // ngOnChanges() {
  //   this.loadUserSavedGif();
  // }

  loadUserSavedGif() {
    this.sub = this.giphySvc.viewSavedGifsEvent.subscribe(
      (data) =>{
        this.gifs = new Array<Giphy>();

        this.giphySvc.getAllSavedGiphy()
        .then((result) => {
            for(let data of result){
              this.gifs.push({
                url: data["url_link"],
                imageUrl: data["url_link"],
                title: data["gif_title"]
              });
              console.log('>>> load result: ', result);
            }
        });
        
        // console.log('>>> load user saved gif: ', this.gifs);
        // console.log('>>> load user saved gif: ', data);


      })

  }

  goBack() {
    console.log('>>> back button was clicked');
    this.router.navigate( ['/']);
  }
}
