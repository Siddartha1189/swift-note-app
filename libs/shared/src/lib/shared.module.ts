import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UtilsService, NotesService } from './services';

@NgModule({
  imports: [CommonModule],
  providers: [UtilsService, NotesService],
})
export class SharedModule {}
