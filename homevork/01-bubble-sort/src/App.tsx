import React from 'react';

import './App.css';
import {generateRandomNumbers,sortStep} from "./utils/utils";
import BubbleSort from "./components/BubbleSort/BubbleSort";


type AppProps = {

}

type AppState = {
    numbers: number[],
    isSolved:boolean,
    isSortRunning:boolean,
    interval:number,
}

class App extends React.Component<AppProps,AppState>{
  private sortInterval: NodeJS.Timeout | undefined;

  constructor(props:AppProps) {
    super(props);
    this.state = {
        numbers: generateRandomNumbers(50,20),
        isSolved:false,
        isSortRunning:false,
        interval:100,
    }
  }




  private startSort():void{
      if(!this.state.isSolved){
          this.sortInterval = setInterval(() => {
              const [sortedNumbers,isSortEnd]:[number[],boolean] = sortStep(this.state.numbers)
              if(isSortEnd && this.sortInterval){
                  clearInterval(this.sortInterval)
                  this.setState({isSolved:true,isSortRunning:false,})
              }
              this.setState({numbers:sortedNumbers,isSortRunning:true,})
          },this.state.interval);
      }

  }

  private stopSort():void{
      if (this.sortInterval) {
          clearInterval(this.sortInterval)
          this.setState({isSortRunning:false})
      }
  }

  private newSet():void{
      if(this.sortInterval){
          clearInterval(this.sortInterval)
      }
      this.setState({
          isSolved:false,
          isSortRunning:false,
          numbers: generateRandomNumbers(50,20),
      })
  }

  private changeInputState(event:React.ChangeEvent<HTMLInputElement>){
      console.log(event.target.value)
      this.setState({interval: +event.target.value})
  }


  render():JSX.Element{

    return (
        <div className={'bubble--sort'}>
          <h1 className={'bubble--sort_header'}>Bubble Sort Visualization</h1>
          <BubbleSort numbers={this.state.numbers}/>
          <div className={'bubble--sort_buttons--panel'}>
              {this.state.isSortRunning && !this.state.isSolved ?
                  <button onClick={() => this.stopSort()}>Pause</button>
                  :
                  <button onClick={() => this.startSort()} disabled={this.state.isSolved}>Start</button>
              }
              <button onClick = {() => this.newSet()}>New Set</button>
          </div>
          <div className={'bubble--sort_interval--panel'}>
              <p>sort interval in ms:</p>
              <input
                  value={this.state.interval}
                  onChange={(event) => this.changeInputState(event)}
                  disabled={this.state.isSortRunning}
                  className={'bubble--sort_interval--input'}
              />
          </div>
          <p>{this.state.isSolved ? 'solved' : 'not solved'}</p>
        </div>)
  }

}

export default App;
