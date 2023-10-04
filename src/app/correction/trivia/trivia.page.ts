import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

/**
 * Etat du Trivia (avant le jeu, à la préparation)
 */
enum TriviaState {
  SAISIE,
  PLAY
}

enum GameState {
  SHOW_QUESTION,
  REPLY_RESULT,
  END_GAME
}


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

  /**
   * Etat actuel de la préparation du Trivia sur la page
   */
  currentTriviaState : TriviaState = TriviaState.SAISIE

  /**
   * Wtf ? Donner possibilité à la page de voir le Typage de l'enum
   */
  TriviaState = TriviaState;

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
      // C'est OK
      this.currentTriviaState = TriviaState.PLAY
    }
  }

}