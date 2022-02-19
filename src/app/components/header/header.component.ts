import { Component, OnInit } from '@angular/core';
// TODO: uncomment these
// import { Auth, user, getAuth } from '@angular/fire/auth';
// import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isLoggedIn = false;
  // TODO: uncomment this
  // constructor(private auth: Auth) {}

  ngOnInit(): void {
    // TODO: uncomment this
    // user(this.auth).subscribe((user) => {
    //   this.isLoggedIn = !!user;
    // });
  }

  login() {
    // TODO: uncomment this
    // signInWithPopup(getAuth(), new GoogleAuthProvider());
  }

  logout() {
    // TODO: uncomment this
    // getAuth().signOut();
  }
}
