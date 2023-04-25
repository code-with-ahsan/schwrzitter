import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
// TODO: uncomment these
// import { Auth, user, getAuth, GoogleAuthProvider, signInWithPopup } from '@angular/fire/auth';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class HeaderComponent implements OnInit {
  isLoggedIn = false;
  // TODO: uncomment this
  // auth = inject(Auth);

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
