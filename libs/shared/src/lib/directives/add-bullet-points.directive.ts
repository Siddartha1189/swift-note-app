import {
  Directive,
  HostListener,
  ElementRef,
  Input,
  Output,
  OnInit,
  EventEmitter,
} from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[swiftNoteAppAddBulletPoints]',
})
export class AddBulletPointsDirective implements OnInit {
  @Input() descriptionArray!: string[];
  @Output() descriptionChange = new EventEmitter<string[]>();
  @HostListener('keydown.enter', ['$event']) onEnter(event: KeyboardEvent) {
    this.rawValue = this.rawValue += '\n• ';
    event.preventDefault();
  }
  @HostListener('change', ['$event']) change(event: any) {
    this.descriptionChange.emit(this.rawValue.split('\n• '));
  }

  constructor(private elementRef: ElementRef, private _ngControl: NgControl) {}

  ngOnInit(): void {
    let temp = '';
    this.descriptionArray =
      this.descriptionArray || this._ngControl.control?.value;
    if (this.descriptionArray && this.descriptionArray.length) {
      this.descriptionArray.forEach((item) => {
        if (temp) {
          temp += '\r\n';
        }
        if (item.trim() === '•') {
          temp += item;
        } else {
          temp += '• ' + item;
        }
      });
    }
    this.rawValue = temp;
    this._ngControl.control?.setValue(temp);
  }

  get rawValue(): string {
    return this.elementRef.nativeElement.value;
  }
  set rawValue(value: string) {
    this.elementRef.nativeElement.value = value;
  }
}
