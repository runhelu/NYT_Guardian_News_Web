import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { FaRegBookmark } from "react-icons/fa";
import Switch from "react-switch";
import AsyncSelect from 'react-select/lib/Async';
import './Home.css';
import { css } from "@emotion/core";
import BounceLoader from "react-spinners/BounceLoader";
import NewsCard from './NewsCard';
import {NavLink} from "react-router-dom";
import { withRouter } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';

const override = css`
  margin-left: auto;
  margin-right: auto;
  margin-top: 20%;
  display: block;
`;


class World extends React.Component{
  constructor(props){
    super(props);
    let check = true;
    if(window.localStorage.getItem('checking')){
      if(window.localStorage.getItem('checking') === "false"){
        check = false;
      }
      
    }
    this.state = {selectedOption: null, checked: check, loading: false, results: []};
    window.localStorage.setItem('checking', check);
    this.loadoptions = this.loadoptions.bind(this);
    this.handleSwitch = this.handleSwitch.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount(){
    let url = "";
    this.setState({loading: true,});
    document.getElementsByClassName("loading")[0].style.display = '';
    if(!this.state.checked){
      url = 'ec2-54-89-99-60.compute-1.amazonaws.com:4000/api/NYWorld';
    }
    else{
      url = 'ec2-54-89-99-60.compute-1.amazonaws.com:4000/api/GuardianWorld';
    }
    fetch(url, {mode: 'cors'}).then(
      (response) =>{
        return response.json();
      }
    ).then(
      (res) => {
        let data = [];
        if(url === 'ec2-54-89-99-60.compute-1.amazonaws.com:4000/api/NYWorld'){
          data = res.results;
        }
        else{
          data = res.response.results;
        }
        
        this.setState({results:data, loading: false});
        document.getElementsByClassName("loading")[0].style.display = 'none';
      }
    );
  }

  handleChange(value){
    let query = value.value;
    let id = "Guardian";
    if(this.state.checked === false)
      id = "NYTimes";
    this.setState({selectedOption: value}, ()=>{
      this.props.history.push('/search?q=' + encodeURI(query));
    });
    
  }

  handleSwitch(checked){
    this.setState({checked: checked, results:[],});
    window.localStorage.setItem('checking', checked);
    document.getElementsByClassName("loading")[0].style.display = '';
    if(window.localStorage.getItem('checking') === 'false'){//NYTimes
      let url = "";
      this.setState({loading: true,});
      url = 'ec2-54-89-99-60.compute-1.amazonaws.com:4000/api/NYWorld';
      fetch(url, {mode: 'cors'}).then(
        (response) =>{
          return response.json();
        }
      ).then(
        (res) => {
          let data = res.results;
          this.setState({results:data, loading: false,});
          document.getElementsByClassName("loading")[0].style.display = 'none';
        }
      );
    }
    else{//Guardian
      let url = "";
      this.setState({loading: true,});
      url = 'ec2-54-89-99-60.compute-1.amazonaws.com:4000/api/GuardianWorld';
      fetch(url, {mode: 'cors'}).then(
        (response) =>{
          return response.json();
        }
      ).then(
        (res) => {
          let data = res.response.results;
          this.setState({results:data, loading: false,});
          document.getElementsByClassName("loading")[0].style.display = 'none';
        }
      );
    }
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
      if(!this.state.checked || window.localStorage.getItem('checking') === 'false'){
        data.type = "NYTimes";
        data.defaultImg = "https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg";
        if(!result.section)
          return true;
        if(!result.title)
          return true;
        if(!result.abstract)
          return true;
        if(!result.url)
          return true;
        if(!result.published_date)
          return true;
        if(!result.multimedia)
          return true;
        data.section = result.section;
        data.title = result.title;
        data.abstract = result.abstract;
        data.articleURL = result.url;
        data.id = "";
        data.date = result.published_date.substring(0, 10);
        for(let img of result.multimedia){
          if(img.width >= 2000){
            data.defaultImg = img.url;
            break;
          }
        }
        if(num < 10){
          let card = <NewsCard data={data} key={num}/>;
          article_cards.push(card);
        }
        
      }
        
      else if(this.state.checked || window.localStorage.getItem('checking') === 'true'){
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
          let card = <NewsCard data={data} key={num}/>;
          article_cards.push(card);
        }
      }
      num += 1;
      

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
          <Nav.Link as={NavLink} to="/world" href="/world" activeClassName='active'>World</Nav.Link>
          <Nav.Link as={NavLink} to="/politics" href="/politics" activeClassName=''>Politics</Nav.Link>
          <Nav.Link as={NavLink} to="/business" href="/business" activeClassName=''>Business</Nav.Link>
          <Nav.Link as={NavLink} to="/technology" href="/technology" activeClassName=''>Technology</Nav.Link>
          <Nav.Link as={NavLink} to="/sports" href="/sports" activeClassName=''>Sports</Nav.Link>
          
        </Nav>
        <Nav>
          <Nav.Link as={NavLink} to="/favorites" href="/favorites"><FaRegBookmark data-tip="Bookmark"/></Nav.Link>
          <Nav.Link>NYTimes</Nav.Link>
          <Switch
            onColor="#86d3ff"
            onHandleColor="#2693e6"
            handleDiameter={30}
            uncheckedIcon={false}
            checkedIcon={false}
            boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
            activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
            height={20}
            width={48}
            className="react-switch"
            id="material-switch"
            checked={this.state.checked}
            onChange={this.handleSwitch}
          />
          <Nav.Link>Guardian</Nav.Link>
          
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

      <div className='main-articles' id='main-articles'>
        {article_cards}
      </div>
      <ReactTooltip/>
      </div>
    );
  }
  
}
export default withRouter(World);
