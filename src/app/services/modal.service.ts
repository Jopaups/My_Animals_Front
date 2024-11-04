import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private openModalSubject = new Subject<{ isOpen: boolean; modalId?: string }>();
  openModal$ = this.openModalSubject.asObservable();

  open(modalId: string) {
    this.openModalSubject.next({ isOpen: true, modalId });
  }

  close(modalId: string) {
    this.openModalSubject.next({ isOpen: false, modalId });
  }
}