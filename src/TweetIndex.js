import React from 'react';
import './App.css';
import icon from './icon.png';
import youIcon from './your_icon.png';

class TweetIndex extends React.Component {


    constructor(props) {
        super(props);
        this.bottomRef = React.createRef();  // 最下部への参照を作成
      }
    
      componentDidUpdate() {
        this.scrollToBottom();  // 更新がある度にスクロール
      }
    
      scrollToBottom() {
        this.bottomRef.current.scrollIntoView({ behavior: "smooth" });
      }    

    render() {
      return (
        <React.Fragment>
          <ul>
            {this.props.items.map((item, i) => (
              <li key={i}>
              <div className={`tweet-bc ${item.user === 'You' ? 'you-tweet' : ''}`}>
                <div className="balloon6">
                  <div className="faceicon">
                    <img src={item.user === 'You' ? youIcon : icon}/>
                    {item.user}
                  </div>
                  <div className="tweeting">
                    <div className="tweets">
                      <p>{item.text}</p>
                    </div>
                  </div>
                </div>
              </div>
              </li>
            ))}
            <div ref={this.bottomRef}></div>
          </ul>
        </React.Fragment>
      );
    }
  }
  
  export default TweetIndex;
  
