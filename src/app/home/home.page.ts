import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { NgForOf, NgSwitchCase, NgSwitch } from '@angular/common';

export enum State { WAIT, PLAY }

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, NgForOf, FormsModule, NgSwitchCase, NgSwitch],
})
export class HomePage {

  pseudo: String = "";
  difficulties = ["Easy", "Medium", "Hard"]
  errorText: String = "";
  currentState = State.WAIT

  // Ok wtf
  State = State

  constructor() { }

  onSubmit() {
    // Si le pseuo est pourri
    if (this.pseudo.length < 4) {
      // Erreur
      this.errorText = "Veuillez rentrer un pseudo de 3 caractères minimum"

    }
    else {
      // on joue
      this.currentState = State.PLAY;
    }
  }
}
