import { Component, inject } from '@angular/core';
import { IZeet } from './interfaces/zeet.interface';
// TODO: // uncomment these
// import { User, Auth, user } from '@angular/fire/auth';
// import { Observable } from 'rxjs/internal/Observable';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NewZeetComponent } from './components/new-zeet/new-zeet.component';
import { SchwrzeetComponent } from './components/schwrzeet/schwrzeet.component';
import { HeaderComponent } from './components/header/header.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NewZeetComponent,
    SchwrzeetComponent,
    HeaderComponent,
  ],
})
export class AppComponent {
  title = 'schwrzitter';
  // TODO: // uncomment these
  // user$: Observable<User | null>;
  // auth = inject(Auth);

  schwrzeets: IZeet[] = [];

  // TODO: // uncomment these
  // constructor() {
    // this.user$ = user(this.auth);
  // }

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
