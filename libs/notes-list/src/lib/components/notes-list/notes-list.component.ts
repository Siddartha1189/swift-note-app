import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { INotes, UtilsService } from '@swift-note-app/shared';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'swift-note-app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.scss'],
})
export class NotesListComponent implements OnInit {
  public notes$!: Observable<INotes[]>;
  public message$!: Observable<string>;
  public showMessage = false;
  constructor(
    private _utilsService: UtilsService,
    private _router: Router
  ) {}
  public ngOnInit(): void {
    this.notes$ = this._utilsService.notes$;
    this.message$ = this._utilsService.message$.pipe(tap(()=> {
      this.showMessage = true;
      setTimeout(()=>{this.showMessage= false}, 2000);
    }))
  }

  public createNotes(): void {
    this._router.navigate(['/create-notes']);
  }

  public editNote(noteId: number): void{
    this._router.navigate([ 'edit', noteId]);
  }
}
