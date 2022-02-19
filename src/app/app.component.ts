import { Component } from '@angular/core';
import { IZeet } from './interfaces/zeet.interface';
import { User, Auth, user } from '@angular/fire/auth';
// TODO: uncomment these
// import {
//   collection,
//   collectionChanges,
//   addDoc,
//   getFirestore,
//   orderBy,
//   query,
//   CollectionReference,
//   DocumentChange,
// } from '@angular/fire/firestore';
import { Observable } from 'rxjs/internal/Observable';
import { take } from 'rxjs/operators';

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
  // async getZeets() {
  //   const user = await this.getUser();
  //   collectionChanges<IZeet>(
  //     query<IZeet>(
  //       collection(getFirestore(), 'zeets') as CollectionReference<IZeet>,
  //       orderBy('createdAt', 'desc')
  //     )
  //   ).subscribe((zeets) => {
  //     console.log(zeets);
  //     zeets.map((snapshot) => {
  //       this.onZeetSnapshot(snapshot, user);
  //     });
  //   });
  // }

  // TODO: uncomment this
  // onZeetSnapshot(change: DocumentChange<IZeet>, user: User | null) {
  //   const data = change.doc.data() as IZeet;
  //   switch (change.type) {
  //     case 'added':
  //       const zeet = {
  //         ...data,
  //         id: change.doc.id,
  //         liked: !!user && !!data.likedBy.includes(user.uid),
  //       };
  //       this.schwrzeets.splice(change.newIndex, 0, zeet);
  //       break;
  //     case 'removed':
  //       this.schwrzeets.splice(change.oldIndex, 1);
  //       break;
  //     case 'modified':
  //       if (change.newIndex === change.oldIndex) {
  //         this.schwrzeets[change.oldIndex] = {
  //           ...data,
  //           id: change.doc.id,
  //           liked: !!user && !!data.likedBy.includes(user.uid),
  //         };
  //       } else {
  //         this.schwrzeets.splice(change.oldIndex, 1);
  //         this.schwrzeets.splice(change.newIndex, 0, {
  //           ...data,
  //           id: change.doc.id,
  //           liked: !!user && !!data.likedBy.includes(user.uid),
  //         });
  //       }
  //       break;
  //   }
  // }

  async getUser(): Promise<User | null> {
    const user = await this.user$.pipe(take(1)).toPromise();
    return user || null;
  }

  addNewZeet(newZeet: Omit<IZeet, 'id'>) {
    // TODO: uncomment this
    // addDoc(collection(getFirestore(), 'zeets'), newZeet);
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
