import { Component } from '@angular/core';
import { IZeet } from './interfaces/zeet.interface';
import { User, Auth, user } from '@angular/fire/auth';
// TODO: swap these
// import { collection, onSnapshot, query } from '@angular/fire/firestore';
import { collection} from '@angular/fire/firestore';
import { Observable } from 'rxjs/internal/Observable';
import { addDoc, getFirestore } from 'firebase/firestore';
import { take } from 'rxjs/operators';
// TODO: uncomment these
import { getAuth } from 'firebase/auth';
import { collectionChanges } from 'rxfire/firestore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'schwrzitter';
  user$: Observable<User | null>;

  schwrzeets: IZeet[] = [];

  constructor(auth: Auth) {
    this.user$ = user(auth);
    // TODO: uncomment this
    // this.getZeets();
  }

  // TODO: uncomment this
  // getZeets() {
  //   onSnapshot(collection(getFirestore(), 'zeets'), async (zeets) => {
  //     const user = await this.getUser();
  //     this.schwrzeets = zeets.docs.map((doc) => {
  //       const data = doc.data() as IZeet;
  //       const zeet = {
  //         ...data,
  //         id: doc.id,
  //         liked: !!user && !!data.likedBy.includes(user.uid),
  //       };
  //       return zeet;
  //     }) as IZeet[];
  //   });
  // }

  async getUser(): Promise<User | null> {
    const user = await this.user$.pipe(take(1)).toPromise();
    return user || null;
  }

  addNewZeet(newZeet: Omit<IZeet, 'id'>) {
    // TODO: 1 - Add Zeet
    addDoc(collection(getFirestore(), 'zeets'), newZeet);
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
