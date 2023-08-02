import { Component, AfterViewInit } from '@angular/core';
import { Component as comp } from '../model/componente';
import { Player } from '../model/player';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements AfterViewInit {
  title = 'pontinhos';
  turn = 1;
  players: Array<Player> = [new Player(1), new Player(2)];
  size = 7;
  grafo = this.montarGrafo();

  ngAfterViewInit(): void {
    this.enumerarSquares();
  }

  montarGrafo() {
    let grafo: comp[][] = []
    for (let i = 0; i < this.size * 2 - 1; i++) {
      grafo[i] = []
      for (let j = 0; j < this.size * 2 - 1; j++) {
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
            grafo[i].push(new comp(i, j, "square", true));
          }
        }
      }
    }
    return grafo;
  }

  enumerarSquares() {
    let squares = document.querySelectorAll(".square");
    squares.forEach(s =>
      this.grafo.forEach(cgrafo => cgrafo.forEach(e => {
        if (e.composition === "square")
          if (s.id == `i${e.line}-j${e.collumn}`)
            s.innerHTML = `${e.value}`;
      })
      )
    )
  }

  checkEdge(edge: comp) {
    let idEdge = document.querySelector(`#i${edge.line}-j${edge.collumn}`);
    if (!edge.check)
      if (edge.composition === "edgeH") {
        edge.check = true;
        idEdge?.setAttribute("style", "background: #fff; opacity: 1; transition: 0.5s");
        let vRight = document.querySelector(`#i${edge.line}-j${edge.collumn + 1}`);
        let vLeft = document.querySelector(`#i${edge.line}-j${edge.collumn - 1}`);
        if (vLeft)
          if (this.turn == this.players[1].index)
            vLeft.setAttribute("style", "border-right-color: purple; transition: 0.5s");
          else if (this.turn == this.players[0].index)
            vLeft.setAttribute("style", "border-right-color: rgb(0, 128, 100); transition: 0.5s");
        if (vRight)
          if (this.turn == this.players[1].index)
            vRight.setAttribute("style", "border-left-color: purple; transition: 0.5s");
          else if (this.turn == this.players[0].index)
            vRight.setAttribute("style", "border-left-color: rgb(0, 128, 100); transition: 0.5s");

        if (!(edge.line - 1 < 0)) {
          let sTop = document.querySelector(`#i${edge.line - 1}-j${edge.collumn}`);
          let squareValue = this.grafo[edge.line-1][edge.collumn].value;
          if (this.grafo[edge.line][edge.collumn].check && this.grafo[edge.line - 1][edge.collumn - 1].check &&
            this.grafo[edge.line - 1][edge.collumn + 1].check && this.grafo[edge.line - 2][edge.collumn].check) {
            if (sTop && this.turn == this.players[1].index) {
              sTop.setAttribute("style", "background: purple");
              this.players[1].score += squareValue;
            }
            else if (sTop && this.turn == this.players[0].index) {
              sTop.setAttribute("style", "background: rgb(0, 128, 100)");
              this.players[0].score += squareValue;
            }
          }
        }
        if (!(edge.line + 1 > this.size * 2 - 2)) {
          let sBot = document.querySelector(`#i${edge.line + 1}-j${edge.collumn}`);
          let squareValue = this.grafo[edge.line+1][edge.collumn].value;

          if (this.grafo[edge.line][edge.collumn].check && this.grafo[edge.line + 1][edge.collumn - 1].check &&
            this.grafo[edge.line + 1][edge.collumn + 1].check && this.grafo[edge.line + 2][edge.collumn].check) {
            if (sBot && this.turn == this.players[1].index) {
              sBot.setAttribute("style", "background: purple");
              this.players[1].score += squareValue;
            }
            else if (sBot && this.turn == this.players[0].index) {
              sBot.setAttribute("style", "background: rgb(0, 128, 100)");
              this.players[0].score += squareValue;
            }
          }
        }
        this.turn = this.turn === this.players[0].index ? this.players[1].index : this.players[0].index;
      } else if (edge.composition === "edgeV") {
        edge.check = true;
        idEdge?.setAttribute("style", "background: #fff; opacity: 1; transition: 0.5s")
        let vTop = document.querySelector(`#i${edge.line - 1}-j${edge.collumn}`);
        let vBot = document.querySelector(`#i${edge.line + 1}-j${edge.collumn}`);
        if (vTop)
          if (this.turn == this.players[1].index)
            vTop.setAttribute("style", "border-bottom-color: purple; transition: 0.5s");
          else if (this.turn == this.players[0].index)
            vTop.setAttribute("style", "border-bottom-color: rgb(0, 128, 100); transition: 0.5s");
        if (vBot)
          if (this.turn == this.players[1].index)
            vBot.setAttribute("style", "border-top-color: purple; transition: 0.5s");
          else if (this.turn == this.players[0].index)
            vBot.setAttribute("style", "border-top-color: rgb(0, 128, 100); transition: 0.5s");

        if (!(edge.collumn - 1 < 0)) {
          let sLeft = document.querySelector(`#i${edge.line}-j${edge.collumn - 1}`);
          let squareValue = this.grafo[edge.line][edge.collumn-1].value;
          if (this.grafo[edge.line][edge.collumn].check && this.grafo[edge.line - 1][edge.collumn - 1].check &&
            this.grafo[edge.line + 1][edge.collumn - 1].check && this.grafo[edge.line][edge.collumn - 2].check) {
            if (sLeft && this.turn == this.players[1].index) {
              sLeft.setAttribute("style", "background: purple");
              this.players[1].score += squareValue;
            }
            else if (sLeft && this.turn == this.players[0].index) {
              sLeft.setAttribute("style", "background: rgb(0, 128, 100)");
              this.players[0].score += squareValue;
            }
          }
        }
        if (!(edge.collumn + 1 >= this.size * 2 - 1)) {
          let sRight = document.querySelector(`#i${edge.line}-j${edge.collumn + 1}`);
          let squareValue = this.grafo[edge.line][edge.collumn+1].value;
          if (this.grafo[edge.line][edge.collumn].check && this.grafo[edge.line + 1][edge.collumn + 1].check &&
            this.grafo[edge.line - 1][edge.collumn + 1].check && this.grafo[edge.line][edge.collumn + 2].check) {
            if (sRight && this.turn == this.players[1].index) {
              sRight.setAttribute("style", "background: purple");
              this.players[1].score += squareValue;
            }
            else if (sRight && this.turn == this.players[0].index) {
              sRight.setAttribute("style", "background: rgb(0, 128, 100)");
              this.players[0].score += squareValue;
            }
          }
        }
        this.turn = this.turn === this.players[0].index ? this.players[1].index : this.players[0].index;
      }

  }
}
