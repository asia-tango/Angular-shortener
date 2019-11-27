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
  url = '';
  name = '';
  id = '';
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

    this.shortAPI.shortenUrl(this.url).subscribe((res) => {
      this.storageService.saveShortening(res.result);
      res.result.name = this.name;
      this.updateShortenings();
    });
  }

  updateShortenings() {
    this.shortenings = this.storageService.getShortenings();
  }
}
