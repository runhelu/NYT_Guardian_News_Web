import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { FaRegBookmark } from "react-icons/fa";
import AsyncSelect from 'react-select/lib/Async';
import './Home.css';
import { css } from "@emotion/core";
import BounceLoader from "react-spinners/BounceLoader";
import MiniNewsCard from './MiniNewsCard';
import PropTypes from 'prop-types';
import {NavLink} from "react-router-dom";
import { withRouter } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';

const override = css`
  margin-left: auto;
  margin-right: auto;
  margin-top: 20%;
  display: block;
`;

class Search extends React.Component{
  constructor(props){
		super(props);
		
		let query = window.location.search.substring(3,);
    let news = "Guardian";
    if(window.localStorage.checking){
      if(window.localStorage.checking === 'false'){
        news = "NYTimes";
      }
    }
		let option = {label: decodeURI(query), option: decodeURI(query)};
		this.state = {keyWord: query, selectedOption: option, results:[], newsPaper: news, loading: true};
		this.handleChange = this.handleChange.bind(this);
		this.loadoptions = this.loadoptions.bind(this);
	}
	
	componentDidMount(){
    let keyword = encodeURI(this.state.keyWord);
    document.getElementsByClassName("loading")[0].style.display = '';
		let news = this.state.newsPaper;
		let url = "api/search?keyword=" + keyword + "&news=" + news;
		fetch(url, {mode: 'cors'}).then(
			(response) => {
				return response.json();
			}
		).then(
			(res) => {
				if(this.state.newsPaper === 'NYTimes'){
          this.setState({results: res.response.docs,loading:false,});
          
        }
        else{
          this.setState({results: res.response.results,loading:false,});
        }
        document.getElementsByClassName("loading")[0].style.display = 'none';
			}
		)
	}
	
	handleChange(value){
    let query = value.value;
    let id = "Guardian";
    if(window.localStorage.checking && window.localStorage.checking === 'false'){
      id = "NYTimes";
		}
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
		let article_cards = [];
    let num = 0;
    
    this.state.results.forEach((result) => {
      let data = new Object();
      data.num = num;
      if(this.state.newsPaper === "NYTimes"){
        data.type = "NYTimes";
        data.defaultImg = "https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg";
        if(!result.news_desk)
          return true;
        if(!result.headline)
          return true;
        if(!result.headline.main)
          return true;
        if(!result.abstract)
          return true;
        if(!result.web_url)
          return true;
        if(!result.pub_date)
          return true;
        if(!result.multimedia)
          return true;
        data.section = result.news_desk;
        data.title = result.headline.main;
        data.abstract = result.abstract;
        data.articleURL = result.web_url;
        data.id = "";
        data.date = result.pub_date.substring(0, 10);
        for(let img of result.multimedia){
          if(img.width >= 2000){
            data.defaultImg = "https://www.nytimes.com/" + img.url;
            break;
          }
        }
        if(num < 10){
          let card = <MiniNewsCard data={data} key={num}/>;
          article_cards.push(card);
        }
        
      }
        
      else{
        data.type = "Guardian";
        if(!result.id)
          return true;
        if(!result.sectionId)
          return true;
        if(!result.webTitle)
          return true;
        if(!result.blocks)
          return true;
        if(!result.blocks.body)
          return true;
        if(!result.blocks.body[0])
          return true;
        if(!result.blocks.body[0].bodyTextSummary)
          return true;
        if(!result.webUrl)
          return true;
        if(!result.webPublicationDate)
          return true;
        if(!result.blocks.main)
          return true;
        if(!result.blocks.main.elements)
          return true;
        if(!result.blocks.main.elements[0])
          return true;
        if(!result.blocks.main.elements[0].assets)
          return true;
        data.id = result.id;
        data.defaultImg = "https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png";
        data.section = result.sectionId;
        data.title = result.webTitle;
        data.abstract = result.blocks.body[0].bodyTextSummary;
        data.articleURL = result.webUrl;
        data.date = result.webPublicationDate.substring(0, 10);
        let assets = result.blocks.main.elements[0].assets;
        
        if(assets.length !== 0){
          if(assets[assets.length-1].file){
            data.defaultImg = assets[assets.length-1].file;
          }
        }
        if(num < 10){
          let card = <MiniNewsCard data={data} key={num}/>;
          article_cards.push(card);
        }
      }
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
          <Nav.Link as={NavLink} to="/favorites" href="/favorites"><FaRegBookmark data-tip="Bookmark"/></Nav.Link>
        </Nav>
      </Navbar.Collapse>
      </Navbar>
      
      
      <h3 id='results'>Results</h3>
      <BounceLoader
        size={40}
        css={override}
        loading={this.state.loading}
        color={"#3E7BBA"}
      />
      <h4 className='loading'>
        <b>Loading</b>
      </h4>
      <div className='result-articles' id='result-articles'>
				
				{article_cards}
      </div>
      <ReactTooltip/>
      </div>
		);
	}
}
Search.propTypes = {
	newsPaper: PropTypes.string,
}

export default withRouter(Search);