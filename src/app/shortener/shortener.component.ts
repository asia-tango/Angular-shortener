import { Component, OnInit } from '@angular/core';
import { ShortenerApiService } from '../shortener-api.service';
import { StorageService } from '../storage.service';
import { Shortening } from '../models/shortening-response.interface';

@Component({
  selector: 'app-shortener',
  templateUrl: './shortener.component.html',
  styleUrls: ['./shortener.component.css']
})
export class ShortenerComponent implements OnInit {
  url = "";
  name = "";
  shortenings: Shortening[] = [];

  constructor(
    private shortAPI: ShortenerApiService,
    private storageService: StorageService,
  ) {
    this.updateShortenings();
    this.shortenings = this.shortenings;
   }

  ngOnInit() {
     this.updateShortenings();
  }

  onSubmit() {
    if (!this.url) {
      return;
    }

    const ONE_HUNDRED = 100;
    const empty = '*** Empty title ***';
    let tempName = this.name;
    this.shortAPI.shortenUrl(this.url).subscribe((res) => {
      
      if(res.result.titleName === undefined) {
        res.result.titleName = empty;
      } else {
        res.result.titleName = tempName;
      }
     
      res.result.id = (Math.floor(Math.random() * (ONE_HUNDRED + 1))).toString();
      this.storageService.saveShortening(res.result);
      this.updateShortenings();
      console.log(res.result.titleName);
      console.log(res.result);
    });
  }

  updateShortenings() {
    this.shortenings = this.storageService.getShortenings(); 
  }

  onDelete(titleId) {
    if (confirm("Are you sure?")) {
      this.storageService.deleteLiItem(titleId);
      this.updateShortenings();
    }
  }
}
  
