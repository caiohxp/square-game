import { Component } from '@angular/core';
import { Component as comp } from './model/componente';
import { log } from 'console';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'pontinhos';
  player = 1;
  grafo = this.montarGrafo()
  array() {
    let array = [[1, 2], [3, 4], [5, 6]];
    return array
  }
  montarGrafo() {
    let o = 10;
    let grafo: comp[][] = []
    for (let i = 0; i < o * 2 - 1; i++) {
      grafo[i] = []
      for (let j = 0; j < o * 2 - 1; j++) {
        if (i % 2 == 0) {
          if (j % 2 == 0) {
            grafo[i].push(new comp(i, j, "vertex"))
          } else {
            grafo[i].push(new comp(i, j, "edgeH"))
          }
        }
        if (i % 2 == 1) {
          if (j % 2 == 0) {
            grafo[i].push(new comp(i, j, "edgeV"))
          } else {
            grafo[i].push(new comp(i, j, "square"))
          }
        }
      }
    }
    return grafo;
  }
  marcarAresta(edge: comp) {

    console.log(this.player);
    this.player == 1 ? this.player = 2 : this.player = 1;
    let idEdge = document.querySelector(`#i${edge.line}-j${edge.collumn}`);
    if (edge.composition === "edgeH") {
      idEdge?.setAttribute("style", "background: #fff; opacity: 1; transition: 0.5s")
      if (!edge.check) {
        edge.check = true;
      }
      let vRight = document.querySelector(`#i${edge.line}-j${edge.collumn + 1}`);
      let vLeft = document.querySelector(`#i${edge.line}-j${edge.collumn - 1}`);
      let sTop = document.querySelector(`#i${edge.line - 1}-j${edge.collumn}`);
      let sBot = document.querySelector(`#i${edge.line + 1}-j${edge.collumn}`);
      if (vLeft)
        if (this.player == 1)
          vLeft.setAttribute("style", "border-right-color: purple; transition: 0.5s");
        else if (this.player == 2)
          vLeft.setAttribute("style", "border-right-color: orange; transition: 0.5s");
      if (vRight)
        if (this.player == 1)
          vRight.setAttribute("style", "border-left-color: purple; transition: 0.5s");
        else if (this.player == 2)
          vRight.setAttribute("style", "border-left-color: orange; transition: 0.5s");
      if (this.grafo[edge.line][edge.collumn].check && this.grafo[edge.line - 1][edge.collumn - 1].check &&
        this.grafo[edge.line - 1][edge.collumn + 1].check && this.grafo[edge.line - 2][edge.collumn].check) {
        if (sTop && this.player == 1)
          sTop.setAttribute("style", "background: purple");
        else if (sTop && this.player == 2)
          sTop.setAttribute("style", "background: orange");
      } else if (this.grafo[edge.line][edge.collumn].check && this.grafo[edge.line + 1][edge.collumn - 1].check &&
        this.grafo[edge.line + 1][edge.collumn + 1].check && this.grafo[edge.line + 2][edge.collumn].check) {
        if (sBot && this.player == 1)
          sBot.setAttribute("style", "background: purple");
        else if (sBot && this.player == 2)
          sBot.setAttribute("style", "background: orange");
      }
    } else if (edge.composition === "edgeV") {
      idEdge?.setAttribute("style", "background: #fff; opacity: 1; transition: 0.5s")
      if (!edge.check) {
        edge.check = true;
      }
      let vTop = document.querySelector(`#i${edge.line - 1}-j${edge.collumn}`);
      let vBot = document.querySelector(`#i${edge.line + 1}-j${edge.collumn}`);
      let sRight = document.querySelector(`#i${edge.line}-j${edge.collumn + 1}`);
      let sLeft = document.querySelector(`#i${edge.line}-j${edge.collumn - 1}`);
      if (vTop)
        if (this.player == 1)
          vTop.setAttribute("style", "border-bottom-color: purple; transition: 0.5s");
        else if (this.player == 2)
          vTop.setAttribute("style", "border-bottom-color: orange; transition: 0.5s");
      if (vBot)
        if (this.player == 1)
          vBot.setAttribute("style", "border-top-color: purple; transition: 0.5s");
        else if (this.player == 2)
          vBot.setAttribute("style", "border-top-color: orange; transition: 0.5s");
      if (this.grafo[edge.line][edge.collumn].check && this.grafo[edge.line - 1][edge.collumn - 1].check &&
        this.grafo[edge.line + 1][edge.collumn - 1].check && this.grafo[edge.line][edge.collumn - 2].check) {
        if (sLeft && this.player == 1)
          sLeft.setAttribute("style", "background: purple");
        else if (sLeft && this.player == 2)
          sLeft.setAttribute("style", "background: orange");
      } else if (this.grafo[edge.line][edge.collumn].check && this.grafo[edge.line + 1][edge.collumn + 1].check &&
        this.grafo[edge.line - 1][edge.collumn + 1].check && this.grafo[edge.line][edge.collumn + 2].check) {
        if (sRight && this.player == 1)
          sRight.setAttribute("style", "background: purple");
        else if (sRight && this.player == 2)
          sRight.setAttribute("style", "background: orange");
      }
    }

  }
  colorir(i: any) {
    let qq = document.querySelector(`#x${i}`)
    qq?.setAttribute("style", "border-left-color: #4ff")
  }
}
