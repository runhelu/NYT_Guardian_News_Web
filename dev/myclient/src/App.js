import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Home from './routers/Home';
import World from './routers/World';
import Politics from './routers/Politics';
import Business from './routers/Business';
import Technology from './routers/Technology';
import Sports from './routers/Sports';
import Search from './routers/Search';
import DetailArticle from "./routers/DetailArticle";
import Favorites from "./routers/Favorites";

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