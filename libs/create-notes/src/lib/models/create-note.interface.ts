import { FormControl } from '@angular/forms';

export interface ICreateNoteForm {
  tittle: FormControl<string>;
  description: FormControl<string | string[]>;
}
