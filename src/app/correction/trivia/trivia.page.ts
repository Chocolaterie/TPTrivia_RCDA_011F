import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-trivia',
  templateUrl: './trivia.page.html',
  styleUrls: ['./trivia.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class TriviaPage implements OnInit {

  /**
   * Le pseudo
   */
  pseudo : String = ""

  /**
   * Message d'erreur
   */
  errorMessage : String = ""

  constructor() { }

  ngOnInit() {
  }

  /**
   * Event clique pour verifier la saisie
   */
  onSubmit() {
    // Si pseudo est trop petit
    if (this.pseudo.length < 4){
      // Erreur
      this.errorMessage = "Veuillez entrer un pseudo d'au moins 3 caractères"
    }
    else {
      // Succès
    }
  }

}