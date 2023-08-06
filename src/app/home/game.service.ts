import { Injectable } from '@angular/core';
import { Player } from '../model/player';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  public size: number = 7;
  public player1: Player = new Player(1, 181, "Player 1", "rgb(0, 128, 100)");
  public player2: Player = new Player(2, 180, "Player 2", "purple");
  constructor() { }
}
