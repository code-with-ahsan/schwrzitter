import { Component } from '@angular/core';
import { IZeet } from './interfaces/zeet.interface';
// TODO: // uncomment these
// import { User, Auth, user } from '@angular/fire/auth';
// import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'schwrzitter';
  // TODO: // uncomment these
  // user$: Observable<User | null>;

  schwrzeets: IZeet[] = [];

  // TODO: // swap these
  // constructor(auth: Auth) {
  //   this.user$ = user(auth);
  // }

  constructor() {
  }
  addNewZeet(newZeet: Omit<IZeet, 'id'>) {
    this.schwrzeets.push({
      ...newZeet,
      id: Date.now().toString(),
    });
  }

  async onZeetLike(zeet: IZeet) {
    zeet.liked = !zeet.liked;
    if (zeet.liked) {
      zeet.likedBy.push(Date.now().toString());
    } else {
      zeet.likedBy.length = 0;
    }
    console.log(zeet);
  }

  async onZeetComment(event: { zeet: IZeet; comment: string }) {
    const { zeet, comment } = event;
    if (zeet.commentedBy.length === 0) {
      zeet.commentedBy.push(Date.now().toString());
    } else {
      zeet.commentedBy.length = 0;
    }
    console.log(zeet);
  }
}
