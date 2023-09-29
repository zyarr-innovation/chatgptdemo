import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SocketService {
    private socket: Socket;

    constructor() {
        const hostname = window.location.hostname;
        const portNumber = window.location.port;
        this.socket = io('http://' + hostname + ":" + portNumber);
    }

    public disconnect(): void {
        if (this.socket) {
            this.socket.disconnect();
        }
    }

    public emit(event: string, data?: any): void {
        if (this.socket) {
            this.socket.emit(event, data);
        }
    }

    public on(event: string): Observable<any> {
        return new Observable<any>(observer => {
            if (this.socket) {
                this.socket.on(event, (data: any) => {
                    observer.next(data);
                });
            }
        });
    }
}
