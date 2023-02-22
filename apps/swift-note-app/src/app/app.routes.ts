import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadChildren: () =>
      import('@swift-note-app/notes-list').then((m) => m.NotesListModule),
  },
  {
    path: 'create-notes',
    loadChildren: () =>
      import('@swift-note-app/create-notes').then((m) => m.CreateNotesModule),
  },
  {
    path: 'edit/:noteId',
    loadChildren: () =>
      import('@swift-note-app/create-notes').then((m) => m.CreateNotesModule),
  },
];
