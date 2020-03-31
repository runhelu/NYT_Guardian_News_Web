import React from 'react';
import './Home.css';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { FaRegBookmark, FaBookmark } from "react-icons/fa";
import {IoIosArrowDown} from "react-icons/io";
import {IoIosArrowUp} from "react-icons/io";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {
  EmailShareButton,
  EmailIcon,
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
} from "react-share";
import commentBox from 'commentbox.io';
import ReactTooltip from 'react-tooltip';
import * as Scroll from 'react-scroll';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure()

var scroller = Scroll.scroller;
var Element = Scroll.Element;

class Article extends React.Component{
  constructor(props){
    super(props);
    let data = props.data;
    let isFav = false;
    if(window.localStorage.getItem('list')){
      let list = JSON.parse(window.localStorage.getItem('list'));

      list.forEach((item) =>{
        if(item.articleURL === data.articleURL){
          isFav = true;
        }
      });
    }
    
    this.state = {
      type: data.type,
      img: data.defaultImg,
      title: data.title,
      abstract: data.abstract,
      articleURL: data.articleURL,
      date: data.date,
      id: data.id,
      isFav: isFav,
      data: data,
    };
    this.scrollToTop = this.scrollToTop.bind(this);
    this.scrollToBottom = this.scrollToBottom.bind(this);
    this.showLess = this.showLess.bind(this);
    this.showMore = this.showMore.bind(this);
    this.addFav = this.addFav.bind(this);
    this.deleteFav = this.deleteFav.bind(this);
  }

  componentDidMount(){
    
    document.getElementsByClassName('article-des-big')[0].style.display = 'none';
    
    if(document.getElementsByClassName('article-des-small')[0].scrollHeight !== document.getElementsByClassName('article-des-small')[0].clientHeight){
      document.getElementById('toBottom').style.display = '';
    }
    else{
      document.getElementById('toBottom').style.display = 'none';
    }
    if(this.state.isFav){
      document.getElementById('blank-fav').style.display = 'none';
      document.getElementById('full-fav').style.display = '';
    }
    else{
      document.getElementById('blank-fav').style.display = '';
      document.getElementById('full-fav').style.display = 'none';
    }
    this.removeComentBox = commentBox('5708191706906624-proj');
  }

  showMore(event){
    
    document.getElementsByClassName('article-des-small')[0].style.display = 'none';
    document.getElementsByClassName('article-des-big')[0].style.display = '';
    document.getElementById('toBottom').style.display = 'none';
    document.getElementById('toTop').style.display = '';
    this.scrollToBottom();
  }

  showLess(event){
    document.getElementsByClassName('article-des-small')[0].style.display = '';
    document.getElementsByClassName('article-des-big')[0].style.display = 'none';
    document.getElementById('toBottom').style.display = '';
    document.getElementById('toTop').style.display = 'none';
    this.scrollToTop();
  }
  
  scrollToTop() {
    scroller.scrollTo('scrollToTop',{
      smooth: true,
    });
  };
  scrollToBottom() {
    scroller.scrollTo('scrollToBottom',{
      smooth: true,
    });
  };

  deleteFav(){
    let removedContext = "Removing " + this.state.title;
    toast(removedContext, {
      position: "top-center",
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: true,
      autoClose: 5000,
    });
    if(window.localStorage.getItem('list')){
      let list = JSON.parse(window.localStorage.getItem('list'));
      let i=0;
      for(let item of list){
        if(item.articleURL === this.state.articleURL){
          list.splice(i, 1);
          window.localStorage.setItem('list', JSON.stringify(list));
          break;
        }
        i+=1;
      }
      this.setState({isFav: false});
      document.getElementById('blank-fav').style.display = '';
      document.getElementById('full-fav').style.display = 'none';
    }
  }

  addFav(){
    let toastWords = "Saving " + this.state.title;
    toast(toastWords,{
      position: "top-center",
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: true,
      autoClose: 5000,
    });
    if(window.localStorage.getItem('list')){
      let list = JSON.parse(window.localStorage.getItem('list'));
      list.push(this.state.data);
      window.localStorage.setItem('list', JSON.stringify(list));
    }
    else{
      let list = [];
      list.push(this.state.data);
      console.log(list);
      window.localStorage.setItem('list', JSON.stringify(list));
    }
    this.setState({isFav: true});
    document.getElementById('blank-fav').style.display = 'none';
    document.getElementById('full-fav').style.display = '';
  }

  render(){
    let hashTagText = "CSCI_571_NewsApp";
    let emailBody = "#" + hashTagText;
    let hashTags = [];
    hashTags.push(hashTagText);
    return(
      <> 
        <div className='article-card'>
          <h5 className='article-title'>
            <b>
              {this.state.title}
            </b>
          </h5>
          <div className="article-date-share-fav">
            <Row xs={1}>
              <Col sm={3} xs={5}> 
                <p className="article-date">
                  {this.state.date}
                </p>
              </Col>
              <Col sm={8} xs={5}>
                <div className="article-share">
                  <FacebookShareButton url={this.state.articleURL} hashtag={emailBody} data-tip="Facebook">
                    <FacebookIcon size={20} round/>
                  </FacebookShareButton>
                  <TwitterShareButton url={this.state.articleURL} title={this.state.title} hashtags={hashTags} data-tip="Twitter">
                    <TwitterIcon size={20} round/>
                  </TwitterShareButton>
                  <EmailShareButton url={this.state.articleURL} title={this.state.title} subject={emailBody} data-tip="Email">
                    <EmailIcon size={20} round/>
                  </EmailShareButton>
                </div>
              </Col>
              <Col sm={1} xs={2}>
                <div className='article-fav'>
                  <FaRegBookmark id='blank-fav' onClick={this.addFav} data-tip="Bookmark"/>
                  <FaBookmark id='full-fav' onClick={this.deleteFav} data-tip="Bookmark"/>
                </div>
              </Col>
            </Row>
          </div>
          <Element name='scrollToTop'/>
          <div className = 'article-img-container'>
            <img className = 'article-img' src={this.state.img}></img>
          </div>
          
          <div className='article-des-small'> 
            {this.state.abstract}
          </div>
          <div className='article-des-big'>
            {this.state.abstract}
          </div>
          <div id='toBottom' className="arrow">
            <IoIosArrowDown id='arrow-down' onClick={this.showMore}/>
          </div>
          <div id='toTop' className='arrow' style={{display: 'none'}}>
            <IoIosArrowUp id='arrow-up' onClick={this.showLess}/>
          </div>
          <Element name='scrollToBottom'/>
        </div>
        <div className="commentbox" id={this.state.id}/>
        <ReactTooltip />
      </>
    )
  }
}

Article.propTypes = {
  data: PropTypes.object,
}

export default withRouter(Article);