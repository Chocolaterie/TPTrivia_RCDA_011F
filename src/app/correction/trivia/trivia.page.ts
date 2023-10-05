import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Question } from '../question';
import { Anwser } from '../anwser';
import { Game } from 'src/app/home/home.page';

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
  currentTriviaState: TriviaState = TriviaState.PLAY

  /**
   * Wtf ? Donner possibilité à la page de voir le Typage de l'enum
   */
  TriviaState = TriviaState;

  /**
   * State pour le jeu
   */
  currentGameState: GameState = GameState.SHOW_QUESTION
  GameState = GameState;

  /**
   * Savoir si oui ou non on affiche l'alert
   */
  isAlertOpen: boolean = false;


  /**
   * Savoir si oui ou non on affiche toast
   */
  isToastOpen: boolean = false;

  /**
   * Le message toast
   */
  toastMessage: String = ""

  /**
   * Savoir quelle est la question actuellement utilisée/affichée
   */
  currentQuestionIndex: number = 0;

  /**
   * Le score
   */
  score: number = 0;

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

  /**
   * Lors du clique de anwser
   * @param anwser 
   */
  onReplyClick(anwser: Anwser) {
    // Tester si c'est la bonne réponse
    let isCorrectAnwser: boolean = false
    let correctAnwser!: Anwser;

    this.getCurrentQuestion().anwsers.forEach((tmpAnwser, index) => {
      if (tmpAnwser.label == anwser.label) {
        if (this.getCurrentQuestion().correctAnwser == index) {
          isCorrectAnwser = true
        }
      }

      // Dans tout les cas je veux quand meme avoir la bonne réponse en variable
      if (this.getCurrentQuestion().correctAnwser == index) {
        // Stocker la bonne réponse dans une varaible
        correctAnwser = tmpAnwser
      }
    })

    // Si correct
    if (isCorrectAnwser) {
      // Score ++
      this.score++;

      // Le toast qui te dit que tu as bien répondu
      this.isToastOpen = true;
      this.toastMessage = "Vous avez bien répondu"
    }
    // Sinon (c'est pas correct)
    else {
      // Le toast qui te dit que tu t'es trompé
      this.isToastOpen = true;
      this.toastMessage = "Non ! La bonne réponse était " + correctAnwser.label
    }

    // Ajouter le score dans le toast 
    this.toastMessage += " | Score : " + this.score

    // ATTENTION : On affiche le Question Suivante si il reste des question
    // Si on a repondu a toute les questions
    if (this.currentQuestionIndex + 1 >= this.getQuestions().length) {
      this.currentGameState = GameState.END_GAME
    }
    // On affiche la question suivante si il reste des questions
    else {
      this.currentGameState = GameState.REPLY_RESULT;
    }

  }

  /**
   * Clique sur Question Suivante
   */
  onClickQuestionSuivante() {
    this.currentQuestionIndex++;
    this.currentGameState = GameState.SHOW_QUESTION;
  }

  /**
   * Clique sur Rejouer
   */

  onClickReplay() {
    // Reset le score
    this.score = 0;
    // Reset les questions
    this.currentQuestionIndex = 0;
    // re affiche les questions
    this.currentGameState = GameState.SHOW_QUESTION;
  }

  /**
   * Recupérer des questions
   * @returns 
   */
  getQuestions(): Question[] {
    const question1 = new Question("In Fairy Tail, what is the nickname of Natsu Dragneel?", 0, [
      new Anwser("The Salamander"), new Anwser("The Dragon Slayer"), new Anwser("The Dragon"), new Anwser("The Demon")])

    const question2 = new Question("Return to Castle Wolfenstein was the only game of the Wolfenstein series where you don't play as William Blazkowicz", 0, [
      new Anwser("Oui"), new Anwser("Non")])

    return [
      question1,
      question2
    ]
  }

  /**
   * Récuperer la question actuelle
   * @returns 
   */
  getCurrentQuestion(): Question {
    return this.getQuestions()[this.currentQuestionIndex];
  }
}