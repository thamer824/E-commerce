import React from 'react';
import { BrowserRouter ,Routes , Route } from 'react-router-dom';
import { DataProvider} from './GlobalState';
import Header from './components/headers/header';
import MainPages from './components/mainpages/Pages'


function App() {
  return (
  <DataProvider>
    <BrowserRouter>
       
      <div className="Appo">
        <Header />
        {/* <button>gehzgh</button> bch jarabet hkeya */}
        <MainPages/>
      </div>


       {/* <Route index element={<Home />} />   hedhi manetha tkhal l home hiya awel blasa todkhlelha dub mathel site mta3 L Page*/ } 
    </BrowserRouter>
     
  
  </DataProvider>
  );
}

export default App;
