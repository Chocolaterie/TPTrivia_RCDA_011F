import { Component } from '@angular/core';
import { AlertController, IonicModule, ToastController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { NgForOf, NgSwitchCase, NgSwitch } from '@angular/common';

export enum State { WAIT, PLAY }

export enum GameState { AWAIT, SELECT_REPLY, QUESTION_RESULT, END }

/**
 * Reponse
 */
export class Reply {
  constructor(public replyMessage : String, public isCorrect : boolean = false){}
}

/**
 * La gestion du jeu
 */
export class Game{

  /**
   * Les réponses actuelles
   */
  replies : Reply[] = []

  /**
   * Default game state
   */
  currentState = GameState.AWAIT
  // Ok wtf
  State = GameState

  score = 0

}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, NgForOf, FormsModule, NgSwitchCase, NgSwitch],
})
export class HomePage {

  pseudo: String = "KikooLol";
  difficulties = ["Easy", "Medium", "Hard"]
  currentState = State.WAIT

  // Ok wtf
  State = State
  game = new Game()

  /**
   * 
   * @param alertController Injection alert
   * @param toastController Injection toast
   */
  constructor(private alertController : AlertController, private toastController : ToastController) { }

  nextQuestion(){
    this.game.replies = [new Reply("Blanc", true), new Reply("Noir"), new Reply("Marron"), new Reply("Je ne sais pas")]
  }

  showQuestionResult(){

  }

  getBtnColorResult(reply: Reply) : String {
    if (this.game.currentState == GameState.QUESTION_RESULT){
      return reply.isCorrect ? "success" : "danger";
    }
    return "light";
  }

  /**
   * Show error alert
   */
  async showErrorAlert() {
    const alert = await this.alertController.create({
      header: 'Information Manquante',
      message: "Veuillez rentrer un pseudo de 3 caractères minimum",
      buttons: ['OK'],
    });

    await alert.present();
  }

  
  /**
   * Afficher la réponse selectionnée en toast
   * @param reply La réponse
   */
  async showToastReply(message : string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1500,
      position: 'bottom',
    });

    await toast.present();
  }

  /**
   * On click commencer
   */
  onSubmit() {
    // Si le pseuo est pourri
    if (this.pseudo.length < 4) {
      // Erreur
      this.showErrorAlert();
    }
    else {
      // on joue
      this.nextQuestion()
      this.currentState = State.PLAY;
    }
  }

  onClickReply(reply : Reply){
    // Show result
    this.game.currentState = GameState.QUESTION_RESULT;

    // si bonne réponse 
    if (reply.isCorrect){
      this.game.score ++;
    }
    this.showToastReply(`Votre est de : ${this.game.score}`);

  }
}
