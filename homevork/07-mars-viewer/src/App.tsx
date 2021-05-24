import React, {useEffect} from 'react';
import Menu from './Components/Menu/Menu';
import {MarsImages} from './Components/MarsImages/MarsImages';

function App() {
  return (
    <div className="App">
      <Menu>
        <MarsImages />
      </Menu>
    </div>
  );
}

export default App;
