import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Message } from './models/message';
import { Event } from './models/event'
import * as socketIo from 'socket.io-client';

const SERVER_URL = 'http://localhost:8000';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private socket;

  constructor(private _http: HttpClient) { }

  public initSocket(): void {
      this.socket = socketIo(SERVER_URL);
  }

  public send(message): void {
      console.log('hi');
      this.socket.emit('message', message);
  }

  public onMessage(): Observable<Message> {
      return new Observable<Message>(observer => {
          this.socket.on('message', (data: Message) => observer.next(data));
      });
  }

  public onEvent(event: Event): Observable<any> {
      return new Observable<Event>(observer => {
          this.socket.on(event, () => observer.next());
      });
  }

  getAllPets(){
    return this._http.get('/pets');
  }

  getOnePet(id){
    return this._http.get('/pet/' + id);
  }

  editPet(pet){
    return this._http.put('/update/' + pet._id, pet);
  }

  createPet(pet){
    return this._http.post('/create_pet', pet);
  }

  deletePet(pet){
    return this._http.delete('/delete/' + pet._id);
  }

  likePet(pet){
    return this._http.get('/like/' + pet._id);
  }

}
