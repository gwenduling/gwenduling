import { Component, OnInit, Input } from '@angular/core';

import { EventDay } from '../../models/event.model';
import { EventsService } from '../../services/events.service';
@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss'],
})
export class EventComponent implements OnInit {
  @Input() event: EventDay | undefined;

  constructor(private eventsService: EventsService) {}

  ngOnInit(): void {}

  closeEvent(): void {
    this.eventsService.closeEvent();
  }
}
