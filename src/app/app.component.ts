import { Component } from '@angular/core';
import { formatISO } from 'date-fns';
import formatDistance from 'date-fns/formatDistance';
import { IZeet } from './interfaces/zeet.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'schwrzitter';
  schwrzeets = new Array(10).fill(0).map(() => {
    return {
      id: 2,
      content: `I'm going to join @AngularAir today to talk about some #Angular stuff and
      recent projecs I built Join in. It's going to start at 5:45 PM CET.`,
      likes: 30,
      comments: 10,
      createdAt: formatISO(new Date(2022, 1, 3, 12, 45)),
      by: {
        id: 2,
        name: 'Muhammad Ahsan Ayaz',
        username: 'codewith_ahsan',
        profileURL:
          'https://robohash.org/3e765907b7ea4256eb13399ce0146372?set=set4&bgset=&size=400x400',
      },
    };
  });
  addNewZeet(newZeet: Omit<IZeet, 'id'>) {
    this.schwrzeets.unshift({
      ...newZeet,
      id: Math.random(),
    });
  }
}
