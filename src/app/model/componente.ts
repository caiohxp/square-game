export class Component{
    line: number;
    collumn: number;
    composition: string;
    check: boolean;
    value: number;

    constructor(line: number, collumn: number, composition: string, check: boolean){
        this.line = line;
        this.collumn = collumn;
        this.composition = composition;
        this.check = check;
        this.value = this.composition === "square"? Math.ceil(Math.random() * 3) : 0;
    }
}