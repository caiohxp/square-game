import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'pontinhos';
  grafo = this.montarGrafo()
  array(){
    let array = [[1,2],[3,4],[5,6]];
    return array
  }
  montarGrafo(){
    let o = 9;
    let grafo: any[][] = []
    for(let i = 0; i < o*2-1; i++){
      grafo[i] = []
      for(let j = 0; j < o*2-1; j++){
        if(i%2==0){
          if(j%2==0){
            grafo[i].push({line: i, collumn: j, composicao: "vertex"}) 
          }else{
            grafo[i].push({line: i, collumn: j, composicao: "edgeH"})
          }
        }
        if(i%2==1){
          if(j%2==0){
            grafo[i].push({line: i, collumn: j, composicao: "edgeV"}) 
          }else{
            grafo[i].push({line: i, collumn: j, composicao: "space"})
          }
        }
      }
    }
    return grafo;
  }
  marcarAresta(edge: any){
    let idEdge = document.querySelector(`#i${edge.line}-j${edge.collumn}`);
    idEdge?.setAttribute("style", "background: #325ff0; opacity: 1; transition: 0.5s")
    let ax = document.querySelector(`#x${edge.line}`)
    ax?.setAttribute("style", "border-right-color: #4ff")
    if(edge.composicao === "edgeH"){
      console.log(edge.line, edge.collumn);
      
      let vRight = document.querySelector(`#i${edge.line}-j${edge.collumn+1}`);
      let vLeft = document.querySelector(`#i${edge.line}-j${edge.collumn-1}`);
      if(vLeft){
        vLeft.classList.add('borderRightActive');
      }
      if(vRight){
        vRight.classList.add('borderLeftActive');
      }
      console.log(vRight);
    } else if(edge.composicao === "edgeV"){
      let vTop = document.querySelector(`#i${edge.line-1}-j${edge.collumn}`);
      let vBot = document.querySelector(`#i${edge.line+1}-j${edge.collumn}`);
      if(vTop){
        vTop.classList.add('borderBotActive');
      }
      if(vBot){
        vBot.classList.add('borderTopActive');
      }
    } 
    
  }
  colorir(i:any){
    let qq = document.querySelector(`#x${i}`)
    qq?.setAttribute("style", "border-left-color: #4ff")
  }
}
