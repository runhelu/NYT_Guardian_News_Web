import React from 'react';
import PropTypes from 'prop-types';
import ShareModal from './ShareModal';
import { withRouter } from 'react-router-dom';



class MiniNewsCard extends React.Component{
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
    };
    this.showDetail = this.showDetail.bind(this);
  }

  showDetail(event){
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
    let news_card_id = 'mini-news-card-' + this.state.num;
    
    return(
        
        <div className='mini-news-card' id={news_card_id} onClick={this.showDetail}>
          <h6 className='mini-title'>
            <b>
              {this.state.title}
              <ShareModal url={this.state.articleURL} title={this.state.title}/>
            </b>
          </h6>
          <div className = 'mini-img-container'>
            <img className = 'mini-img' src={this.state.img}></img>
          </div>
          
            <div className="mini-date-section">
              <div className="mini-date"> 
                {this.state.date}
              </div>
              <div className='mini-section' id={this.state.section}>
                {this.state.section.toUpperCase()}
              </div>
           </div>
        </div>
    )
  }

};

MiniNewsCard.propTypes = {
  data: PropTypes.object,
};

export default withRouter(MiniNewsCard);