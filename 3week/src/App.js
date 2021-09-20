import React from 'react';
import './style/reset.css';
import './App.css';
import { StateProvider } from './context';
import Calendar from './feature/Calendar';



function App() {
  return (<>
    <StateProvider>
      <Calendar />
    </StateProvider>
  </>

  );
}

export default App;
