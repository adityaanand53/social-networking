import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { User } from 'src/app/common/interfaces';

@Component({
  selector: 'app-list-tile',
  templateUrl: './list-tile.component.html',
  styleUrls: ['./list-tile.component.scss']
})
export class ListTileComponent implements OnInit {

  @Input() users: User[];
  @Input() isFriends: boolean;
  @Output() addFriendEvent = new EventEmitter<number>();
  @Output() removeFriendEvent = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  addFreindHandler(id: number) {
    this.addFriendEvent.emit(id)
  }

  removeFreindHandler(id: number) {
    this.removeFriendEvent.emit(id)
  }
}
