import {getRandomNumber} from "./utils/utils";

export class GameArea{
    public gameArea:GameCell[];

    constructor(public width:number,public height:number) {
        this.gameArea =  this.getNewGameArea(width,height)
    }

    private getNewGameArea(width:number,height:number):GameCell[]{
        let gameArea:GameCell[] = [];
        for(let i = 0;i < height;i++){

            let stage:GameCell[] = [];

            for (let j = 0;j < width;j++){
                stage.push(new GameCell(j,i,false))
            }


            const randomNumber = getRandomNumber(width)
            stage[randomNumber].isWindow = true

            gameArea.push(...stage)
        }

        return gameArea
    }

    public getWindows(){
        return this.gameArea.filter((el) => el.isWindow)
    }
}




export class GameCell{
    constructor(public x:number,public y:number,public isWindow:boolean) {
    }
}

