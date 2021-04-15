import React, {useState} from "react";
import styled from "styled-components";

interface ImageProps{
    imageUrl: string ,
}
const Img = styled.img<{isSelected:boolean}>`
      max-width: ${props => props.isSelected ? '120%':'100%'};
      min-width: 100%;
      object-fit: cover;
      vertical-align: bottom;
      z-index: ${props => props.isSelected ? '10' : '3'};
      position: relative;
      height: 200px;
      transition: 1s;
      transform: ${props => props.isSelected ? 'scale(1.15)' : 'none' };
    `

const ImgContainer = styled.div<{isSelected:boolean}>`
      margin: 2px;
      position: relative;
      height: 200px;
      flex-grow: 1
      
`

export default function Image({imageUrl}:ImageProps){

    let [isElementSelected,setSelectedState] = useState<boolean>(false)


    return  (
        <ImgContainer
            onMouseOver={() => setSelectedState(true)}
            onMouseOut={() => setSelectedState(false)}
            isSelected={isElementSelected}
        >
            <Img src={imageUrl} isSelected={isElementSelected}/>
        </ImgContainer>
    )
}