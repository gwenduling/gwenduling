import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {
  @Output() callback = new EventEmitter();

  constructor() { }

  ngOnInit(): void {}

  emitCallback() {
    this.callback.emit();
  }
}
