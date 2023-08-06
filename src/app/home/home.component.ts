import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { GameService } from './game.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  nameOrdem = "6x6";

  cores = ['purple', 'rgb(0, 128, 100)', 'orange', 'green', 'blue', 'red']
  constructor(public gameService: GameService){}
  changeSize(n: number){
    this.gameService.size = n;
    this.nameOrdem = `${n-1}x${n-1}`
  }

  escolherNomePlayer1($event: any){
    this.gameService.player1.name = $event.target.value;
  }
  escolherNomePlayer2($event: any){
    this.gameService.player2.name = $event.target.value;
  }
  corPlayer1(cor: string){
    this.gameService.player1.color = cor;
  }
  corPlayer2(cor: string){
    this.gameService.player2.color = cor;
  }
}
