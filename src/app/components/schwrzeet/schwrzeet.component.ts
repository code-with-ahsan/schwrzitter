import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { format, formatDistance, parseISO } from 'date-fns';
import { IZeet } from 'src/app/interfaces/zeet.interface';

@Component({
  selector: 'app-schwrzeet',
  templateUrl: './schwrzeet.component.html',
  styleUrls: ['./schwrzeet.component.scss'],
})
export class SchwrzeetComponent implements OnInit {
  @Input() zeet: IZeet | null = null;
  @Output() zeetLiked = new EventEmitter<IZeet>();
  @Output() zeetCommented = new EventEmitter<IZeet>();
  constructor() {}

  get zeetCreatedAt(): string {
    if (!this.zeet) {
      return '';
    }
    return formatDistance(parseISO(this.zeet?.createdAt), new Date());
  }

  ngOnInit(): void {}
}
