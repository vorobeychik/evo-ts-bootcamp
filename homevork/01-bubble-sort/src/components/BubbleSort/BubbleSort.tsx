import React from "react";
import BubbleSortLine from "./BubbleSortLine/BubbleSortLine";
import './BubbleSort.css'


type BubbleSortProps = {
    numbers:number[]
}

const BubbleSort:React.FC<BubbleSortProps> = ({numbers}) => {

    const lines = numbers.map((el) => <BubbleSortLine height={el * 10 + 10}/>)

    return (
        <div className={'bubble--sort_container'}>
            {lines}
        </div>
    )
}

export default BubbleSort