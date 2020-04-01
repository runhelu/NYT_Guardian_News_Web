import React from 'react';
import PropTypes from 'prop-types';
import ShareModal from './ShareModal';
import { withRouter } from 'react-router-dom';
import {MdDelete} from 'react-icons/md';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactTooltip from 'react-tooltip';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
toast.configure()

class FavCard extends React.Component{
  constructor(props){
    super(props);
    let data = props.data;
    this.state = {
      type: data.type,
      id: data.id,
      img: data.defaultImg,
      section: data.section,
      title: data.title,
      abstract: data.abstract,
      articleURL: data.articleURL,
      date: data.date,
      num: data.num,
      isRemoved: false,
    };
    this.showDetail = this.showDetail.bind(this);
    this.deleteFav = this.deleteFav.bind(this);
  }

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
          this.setState({isRemoved: true}, ()=>{
            if(list.length === 0){
              window.location.reload();
            }
          });
          break;
        }
        i+=1;
      }
    }
  }

  showDetail(event){
    console.log(event.nativeEvent.target.localName);
    if(event.nativeEvent.target.localName === "path" || event.nativeEvent.target.localName ==="svg" || event.nativeEvent.target.localName ==="span" || event.nativeEvent.target.localName ==="circle" || event.nativeEvent.target.localName ==="button")
      return;
    else{
      if(this.state.type === "NYTimes"){
        this.props.history.push('/article?id=' + this.state.articleURL + "&source=NYTimes");
      }
      else{
        this.props.history.push('/article?id=' + this.state.id + "&source=Guardian");
      }
    }
  }

  render(){

    
    
    
    return(
      <>
        {this.state.isRemoved ? <></> :
        <div className='fav-news-card' onClick={this.showDetail}>
          <h6 className='fav-title'>
            <b>
              {this.state.title}
              <ShareModal url={this.state.articleURL} title={this.state.title}/>
              <MdDelete onClick={this.deleteFav} data-tip="delete"/>
              <ReactTooltip/>
            </b>
          </h6>
          <div className = 'fav-img-container'>
            <img className = 'fav-img' src={this.state.img}></img>
          </div>
          
            <div className="fav-date-section">
            <Row xs={1}>
              <Col sm={3} xs={3}> 
                <div className="fav-date"> 
                  {this.state.date}
                </div>
              </Col>
              <Col sm={9} xs={9}>
                
                <div className='fav-type' id={this.state.type}>
                  {this.state.type.toUpperCase()}
                </div>
                <div className='fav-section' id={this.state.section}>
                  {this.state.section.toUpperCase()}
                </div>
              </Col>
                
                
              
            </Row>
              
              
              
           </div>
        </div>
        }
      </>
        
    )
  }

};

FavCard.propTypes = {
  data: PropTypes.object,
};

export default withRouter(FavCard);