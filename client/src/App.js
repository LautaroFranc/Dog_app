import React from 'react';
import { Route } from "react-router-dom";
import './App.css';
import Landing_page from './components/landing page/landing_page';
import Dogs from './components/inicio/Dogs';
import NavBar from './components/Nav/NavBar';
import CreatDogs from './components/FormularioDog/CreatDogs';
import DetallDog from './components/DetallDogs/DetallDog'
import Footer from './components/footer/Footer'
function App() {
  return (
    <React.Fragment>
      <NavBar />
      <Route exact path="/" component={Landing_page} />
      <Route path="/Dogs" component={Dogs} />
      <Route path="/CreatDog" component={CreatDogs} /> 
      <Route path="/DetallDog/:id" component={DetallDog} /> 
      <Footer />
    </React.Fragment>
  );
}

export default App;
