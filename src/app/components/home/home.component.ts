import { Component, OnInit } from '@angular/core';

import { AgeService } from '../../services/age.service';
import { MetaService } from '../../services/meta.service';
import { defaultMeta } from '../../data/meta.data';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  age: number | undefined;

  constructor(
    private ageService: AgeService,
    private metaService: MetaService
  ) { }

  ngOnInit(): void {
    this.age = this.ageService.getAge();
    this.metaService.setMetaTags(defaultMeta);
  }

}
