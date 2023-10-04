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
  pseudo: String = ""

  /**
   * Message d'erreur
   */
  errorMessage: String = ""

  /**
   * Etat actuel de la préparation du Trivia sur la page
   */
  currentTriviaState: TriviaState = TriviaState.SAISIE

  /**
   * Wtf ? Donner possibilité à la page de voir le Typage de l'enum
   */
  TriviaState = TriviaState;

  /**
   * Savoir si oui ou non on affiche l'alert
   */
  isAlertOpen: boolean = false;


  /**
   * Savoir si oui ou non on affiche toast
   */
  isToastOpen: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  /**
   * Pour mettre a jour l'alert quand elle se ferme
   * @param isOpen 
   */
  setOpen(isOpen: boolean) {
    this.isAlertOpen = isOpen;
  }

  /**
  * Pour mettre a jour toast quand elle se ferme
  * @param isOpen 
  */
  setToastOpen(isOpen: boolean) {
    this.isToastOpen = isOpen;
  }

  /**
   * Event clique pour verifier la saisie
   */
  onSubmit() {
    // Si pseudo est trop petit
    if (this.pseudo.length < 4) {
      // Erreur
      this.errorMessage = "Veuillez entrer un pseudo d'au moins 3 caractères"
      // Ouvrir l'alert
      this.isAlertOpen = true;
      // c'est pareil avec => setOpen(true);
    }
    else {
      // C'est OK
      this.currentTriviaState = TriviaState.PLAY
    }
  }

  onReplyClick() {
    this.isToastOpen = true;
    // c'est pareil avec => setToastOpen(true);
  }

}