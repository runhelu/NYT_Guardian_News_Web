import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { FaBookmark } from "react-icons/fa";
import AsyncSelect from 'react-select/lib/Async';
import './Home.css';
import FavCard from './FavCard';
import {NavLink} from "react-router-dom";
import { withRouter } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';

class Favorites extends React.Component{
  constructor(props){
    super(props);
    let list = [];
		if(window.localStorage.getItem('list')){
      list = JSON.parse(window.localStorage.getItem('list'));
    }
		let option = null;
		this.state = {selectedOption: option, results: list};
		this.handleChange = this.handleChange.bind(this);
		this.loadoptions = this.loadoptions.bind(this);
	}
	
	
	handleChange(value){
    let query = value.value;
    let id = "Guardian";
    if(this.state.checked === false)
      id = "NYTimes";
		this.setState({selectedOption: value, keyWord: query}, ()=>{
      this.props.history.push('/search?q=' + encodeURI(query));
    });
      
	}

	loadoptions(inputValue, callback){
    if(!inputValue){
      callback([]);
    }
    else{
      
      let url = "https://leo1.cognitiveservices.azure.com/bing/v7.0/suggestions?q=" + inputValue;
      fetch(url, {headers: {"Ocp-Apim-Subscription-Key": "bb7176baabd945aaacabb06e566313ce"}}).then(
        function(response){
          return response.json();
        }
      ).then(
        (json) => {
        
          let result = [];
          if(json.suggestionGroups){
            for(let suggestion of json.suggestionGroups[0].searchSuggestions){
              let temp = new Object();
              temp.label = suggestion.displayText;
              temp.value = suggestion.query;
              result.push(temp);
            }
          }
          callback(result);
      }).catch(
        (error) => {
          alert(error);
        }
      );
    }
    
	};
	
	render(){
		let fav_cards = [];
    let num = 0;
    
    this.state.results.forEach((result) => {
      let card = <FavCard data={result} key={num}/>;
      fav_cards.push(card);
      num += 1;
    });

		return(
			<div className='main'>
        
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        
        <div className='select-container'>
          <AsyncSelect 
            
            placeholder = 'Enter keyword ..'
            loadOptions = {this.loadoptions}
            onChange = {this.handleChange}
            value = {this.state.selectedOption}
          />
        </div>
        
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={NavLink} to="/" href="/" activeClassName=''>Home</Nav.Link>
          <Nav.Link as={NavLink} to="/world" href="/world" activeClassName=''>World</Nav.Link>
          <Nav.Link as={NavLink} to="/politics" href="/politics" activeClassName=''>Politics</Nav.Link>
          <Nav.Link as={NavLink} to="/business" href="/business" activeClassName=''>Business</Nav.Link>
          <Nav.Link as={NavLink} to="/technology" href="/technology" activeClassName=''>Technology</Nav.Link>
          <Nav.Link as={NavLink} to="/sports" href="/sports" activeClassName=''>Sports</Nav.Link>
          
        </Nav>
        <Nav>
          <Nav.Link as={NavLink} to="/favorites" href="/favorites"><FaBookmark data-tip="Bookmark"/></Nav.Link>
        </Nav>
      </Navbar.Collapse>
      </Navbar>
      
      {this.state.results.length === 0 ? <div className='no-fav'> <h3>You have no saved articles</h3></div> : <h3 id='results'>Favorites</h3>}
      
      
      <div className='fav-articles' id='fav-articles'>
				{fav_cards}
      </div>
      <ReactTooltip/>
      </div>
		);
	}
}

export default withRouter(Favorites);