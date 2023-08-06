export class Player{
    name: string;
    color: string;
    index: number;
    score: number;
    timer: number;
    time: string;

    constructor(index: number, timer: number, name: string, color: string){
        this.name = name;
        this.index = index;
        this.score = 0;
        this.timer = timer;
        this.time = '';
        this.color = color;
    }
}