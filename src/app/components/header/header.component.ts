import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Auth, user, getAuth, GoogleAuthProvider, signInWithPopup } from '@angular/fire/auth';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class HeaderComponent implements OnInit {
  isLoggedIn = false;
  auth = inject(Auth);

  ngOnInit(): void {
    user(this.auth).subscribe((user) => {
      this.isLoggedIn = !!user;
    });
  }

  login() {
    signInWithPopup(getAuth(), new GoogleAuthProvider());
  }

  logout() {
    getAuth().signOut();
  }
}
