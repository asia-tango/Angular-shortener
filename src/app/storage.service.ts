import { Injectable } from '@angular/core';
import { Shortening } from './models/shortening-response.interface';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  shortenings: Shortening[] = [];

  constructor() {
    this.shortenings = this.getShortenings();
  }

  saveShortening(shortening: Shortening): void {
    this.shortenings.push(shortening);
    this.updateStorage(this.shortenings);
  }

  getShortenings(): Shortening[] {
    const shorteningsString = localStorage.getItem('shortenings');

    if (!shorteningsString) {
      return [];
    }

    try {
      return JSON.parse(shorteningsString);
    } catch {
      return [];
    }
  }

  updateStorage(shortenings: Shortening[]): void {
    localStorage.setItem('shortenings', JSON.stringify(shortenings));
  }

  deleteLiItem(deleteId: string): void {
    this.shortenings = this.shortenings.filter(item => item.id !== deleteId);
    this.updateStorage(this.shortenings);
  }

  getAllShortening(id: string): Shortening {
    return this.getShortenings().filter(item => item.id === id)[id];
  }

  saveShortenings(shortening: Shortening): void {
    this.shortenings.push(shortening);
    this.updateStorage(this.shortenings);
  }

}
