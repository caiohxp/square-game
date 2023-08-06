import { Component, OnInit } from '@angular/core';
import { Component as comp } from '../../model/componente';
import { Player } from '../../model/player';
import { GameService } from '../game.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  title = 'pontinhos';
  winner = '';
  startGame = false;
  endGame = false;
  turn = 1;
  player1: Player = this.gameService.player1;
  player2: Player = this.gameService.player2;
  grafo: comp[][] = this.montarGrafo();

  ngOnInit(): void {
    this.updateTimer();
  }

  constructor(private gameService: GameService) { }


  montarGrafo(): comp[][] {
    let grafo: comp[][] = [];
    for (let i = 0; i < this.gameService.size * 2 - 1; i++) {
      grafo[i] = []
      for (let j = 0; j < this.gameService.size * 2 - 1; j++) {
        if (i % 2 == 0) {
          if (j % 2 == 0) {
            grafo[i].push(new comp(i, j, "vertex", true));
          } else {
            grafo[i].push(new comp(i, j, "edgeH", false));
          }
        }
        if (i % 2 == 1) {
          if (j % 2 == 0) {
            grafo[i].push(new comp(i, j, "edgeV", false));
          } else {
            grafo[i].push(new comp(i, j, "square", true, Math.ceil(Math.random() * 3)));
          }
        }
      }
    }
    return grafo;
  }

  updateTimer() {
    setInterval(() => {
      if (this.player1.timer > 0 && this.player2.timer > 0 && !this.endGame) {
        this.turn === 1 ? this.player1.timer-- : this.player2.timer--;
        this.player1.time = `${Math.floor(this.player1.timer / 60)}:${this.player1.timer % 60}`;
        this.player2.time = `${Math.floor(this.player2.timer / 60)}:${this.player2.timer % 60}`;
        this.turnBorder();
      } else if (this.player1.timer <= 0) {
        this.winner = 'Player 2 Venceu';
        this.endGame = true;
      } else if (this.player2.timer <= 0) {
        this.winner = 'Player 1 Venceu';
        this.endGame = true;
      }
    }, 1000);
  }

  turnBorder(){
    const contentP1 = document.querySelector(".player-content__p1");
    const contentP2 = document.querySelector(".player-content__p2");
    if(contentP1 && contentP2)
      if(this.turn === 1){
        contentP1.classList.add('player-content__turn');
        contentP2.classList.remove('player-content__turn');
      } else if(this.turn === 2){
        contentP1.classList.remove('player-content__turn');
        contentP2.classList.add('player-content__turn');
      }
  }

  checkEdge(edge: comp) {
    this.startGame = true;
    let idEdge = document.querySelector(`#i${edge.line}-j${edge.collumn}`);
    if (!edge.check && !this.endGame)
      if (edge.composition === "edgeH") {
        edge.check = true;
        idEdge?.setAttribute(`style`, `background: #fff; opacity: 1; transition: 0.5s`);
        let vRight = document.querySelector(`#i${edge.line}-j${edge.collumn + 1}`);
        let vLeft = document.querySelector(`#i${edge.line}-j${edge.collumn - 1}`);
        if (vLeft)
          if (this.turn == this.player2.index)
            vLeft.setAttribute(`style`, `border-right-color: ${this.player2.color}; transition: 0.5s`);
          else if (this.turn == this.player1.index)
            vLeft.setAttribute(`style`, `border-right-color: ${this.player1.color}; transition: 0.5s`);
        if (vRight)
          if (this.turn == this.player2.index)
            vRight.setAttribute(`style`, `border-left-color: ${this.player2.color}; transition: 0.5s`);
          else if (this.turn == this.player1.index)
            vRight.setAttribute(`style`, `border-left-color: ${this.player1.color}; transition: 0.5s`);

        if (!(edge.line - 1 < 0)) {
          let sTop = document.querySelector(`#i${edge.line - 1}-j${edge.collumn}`);
          let squareValue = this.grafo[edge.line - 1][edge.collumn].value;
          if (this.grafo[edge.line][edge.collumn].check && this.grafo[edge.line - 1][edge.collumn - 1].check &&
            this.grafo[edge.line - 1][edge.collumn + 1].check && this.grafo[edge.line - 2][edge.collumn].check) {
            if (sTop && this.turn == this.player2.index) {
              sTop.setAttribute(`style`, `background: ${this.player2.color}`);
              this.player2.score += squareValue;
              this.checkGame();
            }
            else if (sTop && this.turn == this.player1.index) {
              sTop.setAttribute(`style`, `background: ${this.player1.color}`);
              this.player1.score += squareValue;
              this.checkGame();
            }
          }
        }
        if (!(edge.line + 1 > this.gameService.size * 2 - 2)) {
          let sBot = document.querySelector(`#i${edge.line + 1}-j${edge.collumn}`);
          let squareValue = this.grafo[edge.line + 1][edge.collumn].value;

          if (this.grafo[edge.line][edge.collumn].check && this.grafo[edge.line + 1][edge.collumn - 1].check &&
            this.grafo[edge.line + 1][edge.collumn + 1].check && this.grafo[edge.line + 2][edge.collumn].check) {
            if (sBot && this.turn == this.player2.index) {
              sBot.setAttribute(`style`, `background: ${this.player2.color}`);
              this.player2.score += squareValue;
              this.checkGame();
            }
            else if (sBot && this.turn == this.player1.index) {
              sBot.setAttribute(`style`, `background: ${this.player1.color}`);
              this.player1.score += squareValue;
              this.checkGame();
            }
          }
        }
        this.turn = this.turn === this.player1.index ? this.player2.index : this.player1.index;
      } else if (edge.composition === "edgeV") {
        edge.check = true;
        idEdge?.setAttribute(`style`, `background: #fff; opacity: 1; transition: 0.5`)
        let vTop = document.querySelector(`#i${edge.line - 1}-j${edge.collumn}`);
        let vBot = document.querySelector(`#i${edge.line + 1}-j${edge.collumn}`);
        if (vTop)
          if (this.turn == this.player2.index)
            vTop.setAttribute(`style`, `border-bottom-color: ${this.player2.color}; transition: 0.5s`);
          else if (this.turn == this.player1.index)
            vTop.setAttribute(`style`, `border-bottom-color: ${this.player1.color}; transition: 0.5s`);
        if (vBot)
          if (this.turn == this.player2.index)
            vBot.setAttribute(`style`, `border-top-color: ${this.player2.color}; transition: 0.5s`);
          else if (this.turn == this.player1.index)
            vBot.setAttribute(`style`, `border-top-color: ${this.player1.color}; transition: 0.5s`);

        if (!(edge.collumn - 1 < 0)) {
          let sLeft = document.querySelector(`#i${edge.line}-j${edge.collumn - 1}`);
          let squareValue = this.grafo[edge.line][edge.collumn - 1].value;
          if (this.grafo[edge.line][edge.collumn].check && this.grafo[edge.line - 1][edge.collumn - 1].check &&
            this.grafo[edge.line + 1][edge.collumn - 1].check && this.grafo[edge.line][edge.collumn - 2].check) {
            if (sLeft && this.turn == this.player2.index) {
              sLeft.setAttribute(`style`, `background: ${this.player2.color}`);
              this.player2.score += squareValue;
              this.checkGame();
            }
            else if (sLeft && this.turn == this.player1.index) {
              sLeft.setAttribute(`style`, `background: ${this.player1.color}`);
              this.player1.score += squareValue;
              this.checkGame();
            }
          }
        }
        if (!(edge.collumn + 1 >= this.gameService.size * 2 - 1)) {
          let sRight = document.querySelector(`#i${edge.line}-j${edge.collumn + 1}`);
          let squareValue = this.grafo[edge.line][edge.collumn + 1].value;
          if (this.grafo[edge.line][edge.collumn].check && this.grafo[edge.line + 1][edge.collumn + 1].check &&
            this.grafo[edge.line - 1][edge.collumn + 1].check && this.grafo[edge.line][edge.collumn + 2].check) {
            if (sRight && this.turn == this.player2.index) {
              sRight.setAttribute(`style`, `background: ${this.player2.color}`);
              this.player2.score += squareValue;
              this.checkGame();
            }
            else if (sRight && this.turn == this.player1.index) {
              sRight.setAttribute(`style`, `background: ${this.player1.color}`);
              this.player1.score += squareValue;
              this.checkGame();
            }
          }
        }
        this.turn = this.turn === this.player1.index ? this.player2.index : this.player1.index;
      }

  }

  checkGame(){
    let count: number = 0;
    this.grafo.forEach(l => l.forEach(c => c.check ? count = count : count++));

    if(count === 0){
      this.winner = this.player1.score > this.player2.score ? `Player 1 Venceu` : this.player1.score === this.player2.score ? "Empate" : "Player 2 Venceu"
      this.endGame = true;
    }
  }
}
