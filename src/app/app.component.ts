import { Component } from '@angular/core';
import { Component as comp } from './model/componente';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'pontinhos';
  player = 1;
  size = 7;
  grafo = this.montarGrafo()
  montarGrafo() {
    let grafo: comp[][] = []
    for (let i = 0; i < this.size * 2 - 1; i++) {
      grafo[i] = []
      for (let j = 0; j < this.size * 2 - 1; j++) {
        if (i % 2 == 0) {
          if (j % 2 == 0) {
            grafo[i].push(new comp(i, j, "vertex", true))
          } else {
            grafo[i].push(new comp(i, j, "edgeH", false))
          }
        }
        if (i % 2 == 1) {
          if (j % 2 == 0) {
            grafo[i].push(new comp(i, j, "edgeV", false))
          } else {
            grafo[i].push(new comp(i, j, "square", true))
          }
        }
      }
    }
    return grafo;
  }
  checkEdge(edge: comp) {

    console.log(this.player);
    let idEdge = document.querySelector(`#i${edge.line}-j${edge.collumn}`);
    if (!edge.check)
      if (edge.composition === "edgeH") {
        edge.check = true;
        idEdge?.setAttribute("style", "background: #fff; opacity: 1; transition: 0.5s");
        this.player == 1 ? this.player = 2 : this.player = 1;
        let vRight = document.querySelector(`#i${edge.line}-j${edge.collumn + 1}`);
        let vLeft = document.querySelector(`#i${edge.line}-j${edge.collumn - 1}`);
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
        
        if(!(edge.line - 1 < 0)){
          let sTop = document.querySelector(`#i${edge.line - 1}-j${edge.collumn}`);
          console.log("stop");
          if (this.grafo[edge.line][edge.collumn].check && this.grafo[edge.line - 1][edge.collumn - 1].check &&
            this.grafo[edge.line - 1][edge.collumn + 1].check && this.grafo[edge.line - 2][edge.collumn].check) {
            if (sTop && this.player == 1)
              sTop.setAttribute("style", "background: purple");
            else if (sTop && this.player == 2)
              sTop.setAttribute("style", "background: orange");
          }
        }
        if(!(edge.line + 1 > this.size * 2 - 2)){
          let sBot = document.querySelector(`#i${edge.line + 1}-j${edge.collumn}`);
          console.log("sbot");
          
          if (this.grafo[edge.line][edge.collumn].check && this.grafo[edge.line + 1][edge.collumn - 1].check &&
            this.grafo[edge.line + 1][edge.collumn + 1].check && this.grafo[edge.line + 2][edge.collumn].check) {
            if (sBot && this.player == 1)
              sBot.setAttribute("style", "background: purple");
            else if (sBot && this.player == 2)
              sBot.setAttribute("style", "background: orange");
          }
        }
      } else if (edge.composition === "edgeV") {
        this.player == 1 ? this.player = 2 : this.player = 1;
        edge.check = true;
        idEdge?.setAttribute("style", "background: #fff; opacity: 1; transition: 0.5s")
        let vTop = document.querySelector(`#i${edge.line - 1}-j${edge.collumn}`);
        let vBot = document.querySelector(`#i${edge.line + 1}-j${edge.collumn}`);
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

        if(!(edge.collumn - 1 < 0)){
          let sLeft = document.querySelector(`#i${edge.line}-j${edge.collumn - 1}`);
          console.log("sleft");
          if (this.grafo[edge.line][edge.collumn].check && this.grafo[edge.line - 1][edge.collumn - 1].check &&
            this.grafo[edge.line + 1][edge.collumn - 1].check && this.grafo[edge.line][edge.collumn - 2].check) {
            if (sLeft && this.player == 1)
              sLeft.setAttribute("style", "background: purple");
            else if (sLeft && this.player == 2)
              sLeft.setAttribute("style", "background: orange");
          }
        }
        if(!(edge.collumn + 1 >= this.size * 2 - 1)){
          let sRight = document.querySelector(`#i${edge.line}-j${edge.collumn + 1}`);
          console.log("sright");
          if (this.grafo[edge.line][edge.collumn].check && this.grafo[edge.line + 1][edge.collumn + 1].check &&
            this.grafo[edge.line - 1][edge.collumn + 1].check && this.grafo[edge.line][edge.collumn + 2].check) {
            if (sRight && this.player == 1)
              sRight.setAttribute("style", "background: purple");
            else if (sRight && this.player == 2)
              sRight.setAttribute("style", "background: orange");
          }
        }
      }

  }
}
