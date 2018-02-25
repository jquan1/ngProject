import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { GiphyService } from '../giphy.service';
import { Router } from "@angular/router";

import { QueryStrings } from '../queryStrings';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  @ViewChild('giphyForm')
  giphyForm: NgForm;

  constructor(private giphySvc: GiphyService , private router: Router) { }

  ngOnInit() {
  }

  searchGiphy(){
    console.log('>> keyword: ', this.giphyForm.value.keyword);

    let giphy = new QueryStrings();
    giphy.search = this.giphyForm.value.keyword;
    //default rating = 'G'
    //set ratings here
    //default offset = 0
    this.giphySvc.searchEvent.next(giphy);
  }
}
