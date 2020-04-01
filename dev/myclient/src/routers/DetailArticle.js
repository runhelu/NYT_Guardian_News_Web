import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { FaRegBookmark } from "react-icons/fa";
import AsyncSelect from 'react-select/lib/Async';
import '../css/Home.css';
import { css } from "@emotion/core";
import BounceLoader from "react-spinners/BounceLoader";
import Article from '../components/Article';
import {NavLink} from "react-router-dom";
import { withRouter } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';

const override = css`
  margin-left: auto;
  margin-right: auto;
  margin-top: 20%;
  display: block;
`;


class DetailArticle extends React.Component{
  constructor(props){
    super(props);
	  let query = window.location.search.substring(4,).split("&")[0];
	  let news = window.location.search.substring(4,).split("&")[1].substring(7,);
	  let option = null;
	  this.state = {id: query, selectedOption: option, results:[], newsPaper: news, loading: true};
    this.handleChange = this.handleChange.bind(this);
    this.loadoptions = this.loadoptions.bind(this);
  }

  componentDidMount(){
    let url = '/api/detail?id=' + this.state.id + "&news=" + this.state.newsPaper;
    this.setState({loading: true,});
    document.getElementsByClassName("loading")[0].style.display = '';
    fetch(url, {mode: 'cors'}).then(
      (response) =>{
        return response.json();
      }
    ).then(
      (res) => {
        let data = [];
        //console.log(data);
        if(this.state.newsPaper === "NYTimes"){
          data.push(res.response.docs[0]);
        }
        else{
          data.push(res.response.content);
        }
        
        this.setState({results:data, loading: false});
        document.getElementsByClassName("loading")[0].style.display = 'none';
      }
    );
  }

  handleChange(value){
    let query = value.value;
    let id = "Guardian";
    if(window.localStorage.checking && window.localStorage.checking === 'false'){
      id = "NYTimes";
		}
    this.setState({selectedOption: value}, ()=>{
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
    
    let data = {};
    let results = this.state.results;
    let temp1 = [];
    data.id = this.state.id;
    results.forEach((result) => {
      if(this.state.newsPaper === "NYTimes"){
        data.type = "NYTimes";
        data.defaultImg = "https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg";
        data.title = result.headline.main;
        data.abstract = result.abstract;
        data.articleURL = result.web_url;
        data.date = result.pub_date.substring(0, 10);
        data.section = result.section_name;
        for(let img of result.multimedia){
          if(img.width >= 2000){
            data.defaultImg = "https://www.nytimes.com/" + img.url;
            break;
          }
        }
        
      }
          
      else{
        data.type = "Guardian";
        
        data.defaultImg = "https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png";
        
        data.title = result.webTitle;
        data.abstract = result.blocks.body[0].bodyTextSummary;
        data.articleURL = result.webUrl;
        data.date = result.webPublicationDate.substring(0, 10);
        data.section = result.sectionId;
        let assets = result.blocks.main.elements[0].assets;
          
        if(assets.length !== 0){
          if(assets[assets.length-1].file){
            data.defaultImg = assets[assets.length-1].file;
          }
        }
        
      }
      temp1 = <Article data={data}/>;
    });
    
      

    
    return (
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
          <Nav.Link as={NavLink} to="/favorites" href="/favorites"><FaRegBookmark id='nav-fav' data-tip="Bookmark"/></Nav.Link>
          
          
        </Nav>
      </Navbar.Collapse>
      </Navbar>
      
      <BounceLoader
        size={40}
        css={override}
        loading={this.state.loading}
        color={"#3E7BBA"}
      />
        
      <h4 className='loading'>
        <b>Loading</b>
      </h4>

      <div className='detail-article' id='detail-article'>
        {temp1}
      </div>
      <ReactTooltip/>
      </div>
    );
  }
  
}
export default withRouter(DetailArticle);
