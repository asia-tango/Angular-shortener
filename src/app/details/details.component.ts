import { Component, OnInit, Output } from '@angular/core';
import { Shortening } from "./../models/shortening-response.interface";
import { StorageService } from "./../storage.service";
import {
  Router,
  ActivatedRoute,
  Params,
  NavigationExtras
} from "@angular/router";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  id: string;
  shortening: Shortening;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private storageService: StorageService
  ) 
  { 
    this.shortening = this.storageService.getAllShortening(this.id);
  }

  ngOnInit() {}

  onDelete(titleId) {
    if (confirm("Are you sure?")) {
      this.storageService.deleteLiItem(this.id);
      this.router.navigateByUrl("/shortener");
    }
  }



}
