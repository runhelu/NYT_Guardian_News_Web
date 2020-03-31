import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';
import Home from './Home';
import World from './World';
import Politics from './Politics';
import Business from './Business';
import Technology from './Technology';
import Sports from './Sports';
import Search from './Search';
import DetailArticle from "./DetailArticle";
import Favorites from "./Favorites";

class App extends React.Component{
  constructor(){
    super();
    
  }

  render(){
    return(
      <main>
        <Switch>
          <Route path="/" component={Home} exact/>
          
          <Route path="/world" component={World} exact/>
          <Route path="/politics" component={Politics} exact/>
          <Route path="/business" component={Business} exact/>
          <Route path="/technology" component={Technology} exact/>
          <Route path="/sports" component={Sports} exact/>
          <Route path="/favorites" component={Favorites} exact/>
          <Route path="/search" render={(props)=> <Search {...props} key={window.location.search}/>}/>
          <Route path="/article" render={(props)=> <DetailArticle {...props} key={window.location.search}/>}/>
        </Switch>
      </main>
    )
  }
}

export default App;