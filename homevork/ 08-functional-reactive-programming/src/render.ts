import {GameArea,GameCell} from "./gameArea";

const appElement = document.querySelector('.app')!
const scoreElement = document.querySelector('.game_score')!



export const renderGameArea = (gameArea:GameArea) => {
 const gameField = document.createElement('div')
 gameField.className = 'game_area'
 gameField.style.width = `${gameArea.width * 50}px`
 gameField.style.height = `${gameArea.width * 50}px`

 gameField.insertAdjacentHTML('beforeend',`<div class="cat"></div>`)
 gameArea.gameArea.forEach((cell) => {
  const top:number = cell.y * 50;
  const left:number = cell.x * 50;
  const divClassName = cell.isWindow ? "game_cell game_cell_window" : "game_cell game_cell_wall"

  gameField.insertAdjacentHTML("beforeend",`<div class="${divClassName}" style="top:${top}px;left: ${left}px"/>`)
  appElement.append(gameField)
 })

}

export function renderCat(cell:GameCell){

 const catElement = document.querySelector<HTMLElement>('.cat')!

 catElement.style.left = `${cell.x * 50}px`
 catElement.style.top = `${cell.y * 50}px`
}

export function changeScore(newScore:number){
  scoreElement.innerHTML = `Score:${newScore}`
}