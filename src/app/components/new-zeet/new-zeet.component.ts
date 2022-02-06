import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { formatISO } from 'date-fns';
import { IZeet } from 'src/app/interfaces/zeet.interface';

@Component({
  selector: 'app-new-zeet',
  templateUrl: './new-zeet.component.html',
  styleUrls: ['./new-zeet.component.scss'],
})
export class NewZeetComponent implements OnInit {
  @Output() newZeet = new EventEmitter<Omit<IZeet, 'id'>>();
  zeetMessage = '';
  constructor() {}

  ngOnInit(): void {}

  onSubmit($event: Event) {
    $event.preventDefault();
    this.newZeet.emit({
      content: this.zeetMessage,
      likes: 0,
      comments: 0,
      createdAt: formatISO(new Date()),
      by: {
        id: 0,
        name: 'Muhammad Ahsan Ayaz',
        username: 'codewith_ahsan',
        profileURL:
          'https://robohash.org/3e765907b7ea4256eb13399ce0146372?set=set4&bgset=&size=400x400',
      },
    });
  }
}
