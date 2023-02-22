import { Injectable } from '@angular/core';
import { createdNotes } from '../models/notes.interface';
import { UtilsService } from './utils.service';

@Injectable()
export class NotesService {
  constructor(private _utilsService: UtilsService) {}

  public getNotes(): void {
    const notes = localStorage.getItem(createdNotes);
    if (notes) {
      this._utilsService.setNotes(JSON.parse(notes));
    }
  }
}
