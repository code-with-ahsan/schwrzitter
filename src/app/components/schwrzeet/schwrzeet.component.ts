import { Component, Input, OnInit } from '@angular/core';
import { format, formatDistance, parseISO } from 'date-fns';
import { IZeet } from 'src/app/interfaces/zeet.interface';

@Component({
  selector: 'app-schwrzeet',
  templateUrl: './schwrzeet.component.html',
  styleUrls: ['./schwrzeet.component.scss'],
})
export class SchwrzeetComponent implements OnInit {
  @Input() zeet: IZeet | null = null;
  constructor() {}

  get zeetCreatedAt(): string {
    if (!this.zeet) {
      return '';
    }
    return formatDistance(parseISO(this.zeet?.createdAt), new Date());
  }

  ngOnInit(): void {}
}
