import {renderGameArea,renderCat,changeScore} from "./render";
import {GameArea, GameCell} from "./gameArea";
import './index.css'
import {fromEvent, interval} from "rxjs";
import {map, scan, tap} from "rxjs/operators";
import {getRandomNumber} from "./utils/utils";


const gameArea = new GameArea(10,10);
const windows:GameCell[] = gameArea.getWindows()

renderGameArea(gameArea)
renderCat(windows[0])

const cat$ = interval(1000).pipe(
    map(() => windows[getRandomNumber(windows.length)]),
    tap((val:GameCell) => renderCat(val))
)

const catElement = document.querySelector('.cat')!

const catClick$ = fromEvent(catElement,'click').pipe(
    scan((totalClicks) => totalClicks + 1,0),
    tap((score:number) => changeScore(score))

)

cat$.subscribe()
catClick$.subscribe()

