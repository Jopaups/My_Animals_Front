import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import { SpeciesService } from '../../services/species.service';
import { AnimalService } from '../../services/animal.service';
import { BreedService } from '../../services/breed.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Animal } from '../../models/animal.model';
import { Breed } from '../../models/breed.model';
import { Species } from '../../models/species.model';

@Component({
  selector: 'app-add-animal-modal',
  standalone: true,
  templateUrl: './add-animal-modal.component.html',
  styleUrls: ['./add-animal-modal.component.css'],
  imports: [FormsModule, CommonModule],
})
export class AddAnimalModalComponent implements OnInit {
  isOpen = false;
  modalId = 'add-animal'; // Identifiant de cette modale

  newAnimal: Animal = {
    id: '',
    name: '',
    birthDate: '',
    hasAllergies: false,
    sex: { id: '', type: '', symbolUrl: '' },
    species: { id: '', name: '' },
    breed: { id: '', name: '', species: { id: '', name: '' } },
  };

  newBreedName = '';
  breedList: Breed[] = [];
  speciesList: Species[] = [];
  
  // Options de sexe
  sexOptions = [
    { id: 1, type: 'Mâle' },
    { id: 2, type: 'Féminin' }
  ];

  constructor(
    private modalService: ModalService,
    private speciesService: SpeciesService,
    private breedService: BreedService,
    private animalService: AnimalService
  ) {}

  ngOnInit() {
    // Abonnement au service de modale
    this.modalService.openModal$.subscribe(({ isOpen, modalId }) => {
      if (modalId === this.modalId) {
        this.isOpen = isOpen;
      }
    });

    // Chargement des espèces
    this.speciesService.getAllSpecies().subscribe((data) => {
      this.speciesList = data;
    });
  }

  close() {
    this.isOpen = false;
    this.modalService.close(this.modalId); // Ferme la modale via le service
  }

  onSpeciesChange() {
    if (this.newAnimal.species.id) {
      // Appel au service pour récupérer les races associées à l'espèce sélectionnée
      this.breedService.getBreedsBySpeciesId(this.newAnimal.species.id).subscribe((data) => {
        this.breedList = data;
      }, error => {
        console.error('Erreur lors de la récupération des races:', error);
      });
    } else {
      this.breedList = []; // Réinitialiser la liste si aucune espèce n'est sélectionnée
    }
  }
  
  

  addBreed() {
    const newBreed: Breed = {
      id: '',
      name: this.newBreedName,
      speciesId: this.newAnimal.species.id, // Utilise speciesId au lieu de species
    };
  
    this.breedService.addBreed(newBreed).subscribe((breed) => {
      this.breedList.push(breed);
      this.newBreedName = ''; 
    });
  }

  addAnimal() {
    // Vérifie que l'espèce, la race et le sexe ont été sélectionnés
    if (!this.newAnimal.species.id || !this.newAnimal.breed.id || !this.newAnimal.sex.id) {
        console.error('Erreur: Espèce, race ou sexe non sélectionné.');
        return;
    }

    // Assure-toi que l'objet sexe est bien formé
    this.newAnimal.sex = {
        id: this.newAnimal.sex.id, // Utilise l'ID de sexe sélectionné
        type: '', // Tu peux ignorer si tu n'as pas besoin de ce champ
        symbolUrl: '' // Tu peux également ignorer si ce n'est pas nécessaire
    };

    console.log('Ajout d\'un animal:', this.newAnimal);
    this.animalService.addAnimal(this.newAnimal).subscribe({
        next: () => {
            console.log('Animal ajouté avec succès');
            this.close();
        },
        error: (err) => {
            console.error('Erreur lors de l\'ajout de l\'animal:', err);
        }
    });
}
}
