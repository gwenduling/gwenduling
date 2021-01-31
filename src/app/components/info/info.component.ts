import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
})
export class InfoComponent implements OnInit {
  @Input() link?: string | undefined;
  @Input() content: string | undefined;
  @Input() emoji?: string = '🚩';

  constructor() {}

  ngOnInit(): void {}
}
