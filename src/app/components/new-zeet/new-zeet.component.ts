import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { formatISO } from 'date-fns';
import { IZeet } from 'src/app/interfaces/zeet.interface';
import { User } from '@angular/fire/auth';

@Component({
  selector: 'app-new-zeet',
  templateUrl: './new-zeet.component.html',
  styleUrls: ['./new-zeet.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class NewZeetComponent implements OnInit {
  @Output() newZeet = new EventEmitter<Omit<IZeet, 'id'>>();
  @Input() user!: User;
  zeetMessage = '';
  constructor() {}

  get isZeetEmpty() {
    return this.zeetMessage.trim().length === 0;
  }

  ngOnInit(): void {}

  onSubmit($event: Event) {
    $event.preventDefault();
    if (this.isZeetEmpty) {
      return;
    }
    this.newZeet.emit({
      content: this.zeetMessage,
      likedBy: [],
      commentedBy: [],
      createdAt: formatISO(new Date()),
      by: {
        id: this.user.uid,
        name: this.user.displayName || this.user.email || '',
        username: '',
        profileURL: this.user.photoURL || '',
      },
    });
    this.zeetMessage = '';
  }
}
