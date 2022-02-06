import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
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
      .collection('zeets', (ref) => ref.orderBy('createdAt', 'desc'))
      .valueChanges()
      .subscribe((zeets) => {
        this.schwrzeets = zeets as IZeet[];
      });
  }
  addNewZeet(newZeet: Omit<IZeet, 'id'>) {
    this.afs.collection('zeets').add(newZeet);
  }
}
