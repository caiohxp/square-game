export class Component{
    line: number;
    collumn: number;
    composition: string;
    check: boolean;

    constructor(line: number, collumn: number, composition: string){
        this.line = line;
        this.collumn = collumn;
        this.composition = composition;
        this.check = false;
    }
}