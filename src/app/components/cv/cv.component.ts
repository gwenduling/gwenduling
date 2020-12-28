import { Component, OnInit } from '@angular/core';

import { CVData } from '../../models/cv.model';
import { cvData } from '../../data/cv.data';
import { AgeService } from '../../services/age.service';
import { MetaService } from '../../services/meta.service';
import { noFollowMeta } from '../../data/meta.data';

@Component({
  selector: 'app-cv',
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.scss'],
})
export class CvComponent implements OnInit {
  data: CVData = cvData;
  age: number | undefined;

  constructor(
    private ageService: AgeService,
    private metaService: MetaService
  ) {}

  ngOnInit(): void {
    this.age = this.ageService.getAge();
    this.metaService.setMetaTags({
      ...noFollowMeta,
      url: '/cv',
      title: noFollowMeta.title + ' | Curriculum Vitae',
    });
  }
}
