import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { formatISO } from 'date-fns';
import { IZeet } from 'src/app/interfaces/zeet.interface';
import firebase from 'firebase/compat';

@Component({
  selector: 'app-new-zeet',
  templateUrl: './new-zeet.component.html',
  styleUrls: ['./new-zeet.component.scss'],
})
export class NewZeetComponent implements OnInit {
  @Output() newZeet = new EventEmitter<Omit<IZeet, 'id'>>();
  @Input() user!: firebase.User;
  zeetMessage = '';
  constructor() {}

  get isZeetEmpty() {
    return this.zeetMessage.trim().length === 0;
  }

  ngOnInit(): void {}

  onSubmit($event: Event) {
    $event.preventDefault();
    if (this.isZeetEmpty) {
      return;
    }
    this.newZeet.emit({
      content: this.zeetMessage,
      likedBy: [],
      commentedBy: [],
      createdAt: formatISO(new Date()),
      by: {
        id: '',
        name: '',
        username: '',
        profileURL:
          'https://robohash.org/a3b8f07a68aed4366639cbc05521d06f?set=set3&bgset=&size=400x400',
      },
    });
    this.zeetMessage = '';
  }
}
