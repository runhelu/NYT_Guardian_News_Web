import React from 'react';
import PropTypes from 'prop-types';
import ShareModal from './ShareModal';
import { withRouter } from 'react-router-dom';


class NewsCard extends React.Component{
  constructor(props){
    super(props);
    let data = props.data;
    this.state = {
      type: data.type,
      img: data.defaultImg,
      section: data.section,
      title: data.title,
      abstract: data.abstract,
      articleURL: data.articleURL,
      date: data.date,
      num: data.num,
      id: data.id,
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
    let news_card_id = 'news-card-' + this.state.num;
    
    return(
        
      <div className='news-card' id={news_card_id} onClick={this.showDetail}>
          
        <div className = 'a-img-container'>
          <img className = 'a-img' src={this.state.img}></img>
        </div>
        <div className='news-card-container'>
          <h5 className='title'>
            <b>
              {this.state.title}
                
              <ShareModal url={this.state.articleURL} title={this.state.title}/>
                
            </b>
          </h5>
          <div className='des1'> 
            {this.state.abstract}
          </div>
          <br/>
          <div className="date-section">
            <div className="date"> 
              {this.state.date}
            </div>
            <div className='section' id={this.state.section}>
              {this.state.section.toUpperCase()}
            </div>
         </div>
        </div>
          
      </div>
        
        
    )
  }

};

NewsCard.propTypes = {
  data: PropTypes.object,
};

export default withRouter(NewsCard)