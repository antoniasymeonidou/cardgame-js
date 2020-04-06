import { Injectable, NgZone } from '@angular/core';
import {SseService} from './sse.service'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(
    private _zone: NgZone, 
    private _sseService: SseService
  ) { }

  getGameEvent(url: string) {
    return Observable.create(
      observer => {
        const eventSource = this._sseService.getEventSource(url);
        
        eventSource.onmessage = event => {
          this._zone.run(() => {
            observer.next(event)
          });
        };

        eventSource.onerror = error => {
          this._zone.run( () => {
            observer.error(error)
          });
        };
      }
    )
  }
}
