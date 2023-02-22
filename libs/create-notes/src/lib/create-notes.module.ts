import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateNotesComponent } from './components/create-notes/create-notes.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { BulletPointModule } from '@swift-note-app/shared';

const routes: Routes = [
  {
    path: '',
    component: CreateNotesComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    BulletPointModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(routes),
  ],
  declarations: [CreateNotesComponent],
})
export class CreateNotesModule {}
