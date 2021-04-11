import React from "react";
import './BubbleSortLine.css'

type BubbleSortLineProps = {
    height:number,
}

const BubbleSortLine:React.FC<BubbleSortLineProps> = ({height}) =>{

    return (
        <div
            style={{height:`${height}px`}}
            className={'bubble--sort_line'}
        />
    )
}

export default BubbleSortLine