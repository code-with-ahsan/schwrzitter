import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { first, Observable } from 'rxjs';
import { IZeet } from './interfaces/zeet.interface';
import firebase from 'firebase/compat';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'schwrzitter';
  user$: Observable<firebase.User | null>;
  schwrzeets: IZeet[] = [];
  constructor(private auth: AngularFireAuth, private afs: AngularFirestore) {
    this.user$ = this.auth.user;
    this.afs
      .collection<IZeet>('zeets', (ref) => ref.orderBy('createdAt', 'desc'))
      .snapshotChanges()
      .subscribe(async (zeets) => {
        const user = await this.auth.currentUser;
        console.log(zeets);
        this.schwrzeets = zeets.map((snapshot) => {
          const { doc } = snapshot.payload;
          const data = doc.data();
          const zeet = {
            ...data,
            id: doc.id,
            liked: !!user && !!data.likedBy.includes(user.uid),
          };
          return zeet;
        }) as IZeet[];
      });
  }
  addNewZeet(newZeet: Omit<IZeet, 'id'>) {
    this.afs.collection('zeets').add(newZeet);
  }

  async onZeetLike(zeet: IZeet) {
    const user = await this.auth.currentUser;
    if (!user) {
      return;
    }
    const docRef = this.afs.doc(`zeets/${zeet.id}/likes/${user.uid}`);
    const docExists = await docRef.ref.get().then((doc) => !!doc.exists);
    if (docExists) {
      zeet.likedBy = zeet.likedBy.filter((id) => id !== user.uid);
      await docRef.delete();
    } else {
      zeet.likedBy.push(user.uid);
      await docRef.set({
        id: user.uid,
        displayName: user.displayName,
        photoURL: user.photoURL,
      });
    }
    await this.afs
      .collection(`zeets`)
      .doc(zeet.id)
      .update({
        ...zeet,
      });
  }

  trackZeetsFn(_: any, zeet: IZeet) {
    return zeet.id;
  }

  async onZeetComment(event: { zeet: IZeet; comment: string }) {
    const { zeet, comment } = event;
    const user = await this.auth.currentUser;
    if (!user) {
      return;
    }
    const docRef = this.afs.doc(`zeets/${zeet.id}/comments/${user.uid}`);
    const docExists = await docRef.ref.get().then((doc) => !!doc.exists);
    if (docExists) {
      zeet.commentedBy = zeet.commentedBy.filter((id) => id !== user.uid);
      await docRef.delete();
    } else {
      zeet.commentedBy.push(user.uid);
      await docRef.set({
        id: user.uid,
        displayName: user.displayName,
        photoURL: user.photoURL,
        comment,
      });
    }
    await this.afs
      .collection(`zeets`)
      .doc(zeet.id)
      .update({
        ...zeet,
      });
  }
}
