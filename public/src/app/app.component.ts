import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';
// import * as io from 'socket.io-client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  // socket: SocketIOClient.Socket;
  // users: any;
  // messages: any;

  constructor(){
    // this.socket = io.connect('http://localhost:8000');
  }
  ngOnInit(){
    // this.users = {};
    // this.messages = [];
    // this.socket.emit('init');
    // this.socket.on('connection', function(socket) {
    //   socket.on('new_user', function(data) {
    //     //add user to dictionary of users
    //     this.users[socket.id] = data.user;
    //     //show new user all existing messages
    //     socket.emit('showBoard', {messages: this.messages});
    //   });
    //   socket.on('new_message', function(data) {
    //     //create message object
    //     let msg = {message: data.message, user: this.users[socket.id]};
    //     //add message to array
    //     this.messages.push(msg);
    //     this.socket.emit('add_message', {message: msg});
    //   })
    // })
  }

}
