import { Component, inject } from '@angular/core';
import { IZeet } from './interfaces/zeet.interface';
import { User, Auth, user } from '@angular/fire/auth';
import {
  collection,
  collectionChanges,
  addDoc,
  // TODO: uncomment these
  // doc,
  // getDoc,
  // updateDoc,
  // setDoc,
  // deleteDoc,
  getFirestore,
  orderBy,
  query,
  CollectionReference,
  DocumentChange,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs/internal/Observable';
import { take } from 'rxjs/operators';
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
  user$: Observable<User | null>;
  auth = inject(Auth);
  schwrzeets: IZeet[] = [];
  
  constructor() {
    this.user$ = user(this.auth);
    this.getZeets();
  }

  async getZeets() {
    const user = await this.getUser();
    collectionChanges<IZeet>(
      query<IZeet>(
        collection(getFirestore(), 'zeets') as CollectionReference<IZeet>,
        orderBy('createdAt', 'desc')
      )
    ).subscribe((zeets) => {
      console.log(zeets);
      zeets.map((snapshot) => {
        this.onZeetSnapshot(snapshot, user);
      });
    });
  }

  onZeetSnapshot(change: DocumentChange<IZeet>, user: User | null) {
    const data = change.doc.data() as IZeet;
    switch (change.type) {
      case 'added':
        const zeet = {
          ...data,
          id: change.doc.id,
          liked: !!user && !!data.likedBy.includes(user.uid),
        };
        this.schwrzeets.splice(change.newIndex, 0, zeet);
        break;
      case 'removed':
        this.schwrzeets.splice(change.oldIndex, 1);
        break;
      case 'modified':
        if (change.newIndex === change.oldIndex) {
          this.schwrzeets[change.oldIndex] = {
            ...data,
            id: change.doc.id,
            liked: !!user && !!data.likedBy.includes(user.uid),
          };
        } else {
          this.schwrzeets.splice(change.oldIndex, 1);
          this.schwrzeets.splice(change.newIndex, 0, {
            ...data,
            id: change.doc.id,
            liked: !!user && !!data.likedBy.includes(user.uid),
          });
        }
        break;
    }
  }

  async getUser(): Promise<User | null> {
    const user = await this.user$.pipe(take(1)).toPromise();
    return user || null;
  }

  addNewZeet(newZeet: Omit<IZeet, 'id'>) {
    addDoc(collection(getFirestore(), 'zeets'), newZeet);
  }

  async onZeetLike(zeet: IZeet) {
    const user = await this.getUser();
    if (!user) {
      return;
    }
    // TODO: uncomment this
    // const likeDocRef = doc(
    //   getFirestore(),
    //   `zeets/${zeet.id}/likes/${user.uid}`
    // );
    // const document = await getDoc(likeDocRef);
    // const docExists = document.exists();
    // if (docExists) {
    //   zeet.likedBy = zeet.likedBy.filter((id) => id !== user.uid);
    //   await deleteDoc(likeDocRef);
    // } else {
    //   zeet.likedBy.push(user.uid);
    //   await setDoc(likeDocRef, {
    //     id: user.uid,
    //     displayName: user.displayName,
    //     photoURL: user.photoURL,
    //   });
    // }
    // const docRef = doc(getFirestore(), `zeets/${zeet.id}`);
    // updateDoc(docRef, {
    //   ...zeet,
    // });
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
