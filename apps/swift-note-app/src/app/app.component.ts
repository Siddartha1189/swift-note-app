import { Component, OnInit } from '@angular/core';
import { NotesService } from '@swift-note-app/shared';

@Component({
  selector: 'swift-note-app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'swift-note-app';
  constructor(private _notesService: NotesService) {}

  ngOnInit(): void {
    this._getNotes();
  }

  private _getNotes(): void {
    this._notesService.getNotes();
  }
}
