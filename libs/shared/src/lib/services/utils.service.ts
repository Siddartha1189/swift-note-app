import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { createdNotes, INotes } from '../models/notes.interface';

@Injectable()
export class UtilsService implements OnDestroy {
  private _notes$ = new BehaviorSubject<INotes[]>([] as unknown as INotes[]);
  public notes$ = this._notes$.asObservable();

  private _message$ = new ReplaySubject<string>(1);
  public message$ = this._message$.asObservable();

  public setNotes(notes: INotes[]): void {
    localStorage.setItem(createdNotes, JSON.stringify(notes));
    this._notes$.next(notes);
  }

  public setMessage(message: string): void {
    this._message$.next(message);
  }

  public generateRandomNumber(): number {
    const randomNumber = Math.random() * 10000 + 100;
    return Math.floor(randomNumber);
  }

  public ngOnDestroy(): void {
    this._notes$.complete();
    this._message$.complete();
  }
}
