import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { HttpService } from '../http.service';
import { Injectable } from '@angular/core';
import { Message } from '../models/message';
import { Action } from '../models/action';
import { Event } from '../models/event';
import { User } from '../models/user';
import * as io from 'socket.io-client';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  socket: SocketIOClient.Socket;
  user: User;
  action = Action;
  messages: Message[] = [];
  messageContent: string;
  ioConnection: any;


  constructor(private route: ActivatedRoute, private router: Router, private _httpService: HttpService) {
  }

  ngOnInit(): void{
    this.initToConnection();
  }

  private initToConnection(): void{
    this._httpService.initSocket();

    this.ioConnection = this._httpService.onMessage()
      .subscribe((message: Message) => {
        this.messages.push(message);
      });

    this._httpService.onEvent(Event.CONNECT)
      .subscribe(() => {
        console.log('connected');
      });

      this._httpService.onEvent(Event.DISCONNECT)
      .subscribe(() => {
        console.log('disconnected');
      });
  }

  public sendMessage(message: string): void {
    if (!message) {
      return;
    }
    this._httpService.send({
      from: this.user,
      content: message
    });
    this.messageContent = null;
  }

}
