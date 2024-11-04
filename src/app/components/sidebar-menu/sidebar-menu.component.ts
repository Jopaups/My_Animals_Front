import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalService } from '../../services/modal.service'; 

@Component({
  selector: 'app-sidebar-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.css']
})
export class SidebarMenuComponent { 
  constructor(private modalService: ModalService) {}

  openAddAnimalModal() {
    this.modalService.open('add-animal'); // Ouvre la modale avec l'ID défini
  }
}
