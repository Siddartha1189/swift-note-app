import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UtilsService, INotes } from '@swift-note-app/shared';
import { Subscription, take, map } from 'rxjs';

import { ICreateNoteForm } from '../../models/create-note.interface';

@Component({
  selector: 'swift-note-app-create-notes',
  templateUrl: './create-notes.component.html',
  styleUrls: ['./create-notes.component.scss'],
})
export class CreateNotesComponent implements OnInit, OnDestroy {
  private _subscriptions = new Subscription();

  public notesFormGroup!: FormGroup<ICreateNoteForm>;
  public noteDescription: string[] = [];
  public routeParamNoteId: string | null = null;

  constructor(
    private _utilsService: UtilsService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) {}

  public ngOnInit(): void {
    this.routeParamNoteId =
      this._activatedRoute.snapshot.paramMap.get('noteId');

    if (this.routeParamNoteId) {
      this._initializeFormWithDefaultValues();
    } else {
      this._initFormGroup();
    }
  }

  private _initializeFormWithDefaultValues(): void {
    this._subscriptions.add(
      this._utilsService.notes$.pipe(take(1)).subscribe((notes: INotes[]) => {
        const selectedNote = notes.find(
          (note) => note.noteId === +(this.routeParamNoteId || 0)
        );
        if (selectedNote) {
          this.noteDescription = selectedNote.noteDescription || [];
          this.notesFormGroup = new FormGroup<ICreateNoteForm>({
            tittle: new FormControl(selectedNote.noteTitle || '', {
              nonNullable: true,
            }),
            description: new FormControl(this.noteDescription || '', {
              nonNullable: true,
            }),
          });
        } else {
          this.routeParamNoteId = null;
          this._initFormGroup();
        }
      })
    );
  }
  private _initFormGroup(): void {
    this.notesFormGroup = new FormGroup<ICreateNoteForm>({
      tittle: new FormControl('', { nonNullable: true }),
      description: new FormControl('', { nonNullable: true }),
    });
  }

  public onTextAreaChange(description: string[]): void {
    this.noteDescription = description;
  }

  public addNote(): void {
    this._subscriptions.add(
      this._utilsService.notes$
        .pipe(
          take(1),
          map((notes: INotes[]) => {
            const availableNotes = [...notes];
            const formValues = this.notesFormGroup.getRawValue();
            let message = '';
            if (this.routeParamNoteId) {
              const selectdRoute: INotes | undefined = notes.find(
                (note) => note.noteId === +(this.routeParamNoteId || 0)
              );
              if (selectdRoute) {
                selectdRoute['noteDescription'] = this.noteDescription;
                selectdRoute['noteTitle'] = formValues.tittle;
              }
              message = 'Note changes saved successfully';
              this._utilsService.setMessage(message);
            } else if (formValues.tittle || formValues.description) {
              const noteId = this._utilsService.generateRandomNumber();
              const newNote: INotes = {
                noteId,
                noteTitle: formValues.tittle,
                noteDescription: this.noteDescription,
              };
              availableNotes.push(newNote);
              message = 'Note created successfully';
              this._utilsService.setMessage(message);
            }
            return availableNotes;
          })
        )
        .subscribe((notes: INotes[]) => {
          this._utilsService.setNotes(notes);
          this._router.navigate(['']);
        })
    );
  }

  public deleteNote(): void {
    this._subscriptions.add(
      this._utilsService.notes$.pipe(take(1)).subscribe((notes: INotes[]) => {
        const filteredNotes = notes.filter(
          (note) => note.noteId !== +(this.routeParamNoteId || 0)
        );
        const message = 'Note successfully deleted';
        this._utilsService.setMessage(message);
        this._utilsService.setNotes(filteredNotes);
        this._router.navigate(['']);
      })
    );
  }

  public goBack(): void {
    this._router.navigate(['']);
  }
  public ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }
}
