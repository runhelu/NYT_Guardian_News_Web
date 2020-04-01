import React from 'react';
import { MdShare } from "react-icons/md";
import PropTypes from 'prop-types';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import ReactToolTip from 'react-tooltip';
import {
    EmailShareButton,
    EmailIcon,
    FacebookShareButton,
    FacebookIcon,
    TwitterShareButton,
    TwitterIcon,
} from "react-share";

class ShareModal extends React.Component{
  constructor(props){
    super(props);
    this.state = {show: false, url: this.props.url, title: this.props.title};
    this.handleClose = this.handleClose.bind(this);
    this.handleShow = this.handleShow.bind(this);
    ReactToolTip.rebuild();
    this.clickModal = this.clickModal.bind(this)
  }
  
  clickModal(event){
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();
  }

  handleShow(event){
    this.setState({show: true});
    
  }

  handleClose(event){
    this.setState({show: false});
    
  }

  
  render(){
    let hashTagText = "CSCI_571_NewsApp";
    let emailBody = "#" + hashTagText;
    let hashTags = [];
    
    hashTags.push(hashTagText);
    return(
      <>
        <MdShare onClick={this.handleShow} data-tip="Share"/>
        <ReactToolTip/>
        <Modal show={this.state.show} onHide={this.handleClose} onClick={this.clickModal}>
          <Modal.Header closeButton>
            <Modal.Body>
              <b>{this.state.title}</b>
              
            </Modal.Body>
          </Modal.Header>
            <p style={{textAlign : 'center'}}>Share Via</p>
            <Container>
              <Row className="show-grid">
                <Col>
                  <div style={{textAlign : 'center'}}>
                    <FacebookShareButton url={this.state.url} hashtag={emailBody}>
                      <FacebookIcon size={32} round/>
                    </FacebookShareButton>
                  </div>
                </Col>
                <Col>
                  <div style={{textAlign : 'center'}}>
                    <TwitterShareButton url={this.state.url} title={this.state.title} hashtags={hashTags}>
                      <TwitterIcon size={32} round/>
                    </TwitterShareButton>
                  </div>
                
                </Col>
                <Col>
                  <div style={{textAlign : 'center'}}>
                    <EmailShareButton url={this.state.url} title={this.state.title} subject={emailBody}>
                      <EmailIcon size={32} round/>
                    </EmailShareButton>
                  </div>
                
                </Col>
              </Row>
              
            </Container>
            
        </Modal>
      </>
    );
  }
}

ShareModal.propTypes = {
  url: PropTypes.string,
  title: PropTypes.string,
}
export default ShareModal;