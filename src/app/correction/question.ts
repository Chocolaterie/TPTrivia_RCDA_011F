import { Anwser } from "./anwser"

export class Question {

    difficulty : String = ""
    label : String = ""
    correctAnwser : number = 0
    
    anwsers : Anwser[] = []

    constructor(_label : String, _correctAwnser : number, _anwsers : Anwser[]) {
        this.label = _label
        this.correctAnwser = _correctAwnser
        this.anwsers = _anwsers
    }
}