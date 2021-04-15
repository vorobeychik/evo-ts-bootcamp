import React, {useEffect, useState} from "react";
import logo from './logo.svg';
import './App.css';
import {getPhotos} from "./utils/utils";
import Image from "./components/Image/Image"
import {photo} from "./intefaces/interfaces";
import styled from "styled-components";

const Gallery = styled.div`
    padding: 2px;
    display: flex;
    flex-wrap: wrap;
    &::after {
      content: '';
      flex-grow: 999999999;
    }
  `;

const Button = styled.button`
  position: fixed;
  z-index: 20;
  bottom:0;
  border: none;
  border-radius: 15px;
  width: 90px;
  height: 25px;
  margin: 20px;
  outline: none;
  background-color: #FFFF00;
  font-weight: bold;
  
  &:hover{
    filter: brightness(1.1);
    cursor: pointer;
  }
  `

function App() {

  let [ photos,setPhotos ] = useState<photo[]>([]);

  async function handleClick(){
    const photos:photo[] = await getPhotos();
    setPhotos(prev =>[...prev,...photos])
  }

  const Photos = photos.map((el:photo,index):JSX.Element => {
     return <Image
         key={index}
         imageUrl={el.urls.small}
     />
  })



  return (
    <div className="App"  >
        <Button onClick={() => handleClick()}>Get images</Button>
      <Gallery>
        {Photos}
      </Gallery>
    </div>
  );
}

export default App;
