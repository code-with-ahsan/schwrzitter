import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { format, formatDistance, parseISO } from 'date-fns';
import { IZeet } from 'src/app/interfaces/zeet.interface';

@Component({
  selector: 'app-schwrzeet',
  templateUrl: './schwrzeet.component.html',
  styleUrls: ['./schwrzeet.component.scss'],
})
export class SchwrzeetComponent implements OnInit {
  @Input() zeet!: IZeet;
  @Output() zeetLiked = new EventEmitter<IZeet>();
  @Output() zeetCommented = new EventEmitter<{
    zeet: IZeet;
    comment: string;
  }>();
  constructor() {}

  get zeetCreatedAt(): string {
    if (!this.zeet) {
      return '';
    }
    return formatDistance(parseISO(this.zeet?.createdAt), new Date());
  }

  commentOnZeet() {
    const comment = prompt("What's your comment?");
    if (comment && comment.trim().length) {
      this.zeetCommented.emit({
        zeet: this.zeet,
        comment,
      });
    }
  }

  ngOnInit(): void {}
}
