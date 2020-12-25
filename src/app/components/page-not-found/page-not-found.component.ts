import { Component, OnInit } from '@angular/core';

import { MetaService } from '../../services/meta.service';
import { noFollowMeta } from '../../data/meta.data';
@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit {

  constructor(private metaService: MetaService) { }

  ngOnInit(): void {
    this.metaService.setMetaTags({...noFollowMeta, title: noFollowMeta.title + '| 404'});
  }

}
