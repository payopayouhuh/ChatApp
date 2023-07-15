import React, { useEffect ,useState} from 'react';
import './App.css';
import axios from 'axios';
import TweetIndex from "./TweetIndex.js";

const App = () => {
  const [items, setItems] = useState([]);
  const [user, setUser] = useState('You');
  const [text, setText] = useState('');
  const [messages, setMessages] = useState([]);
  const [isInitialRender, setIsInitialRender] = useState(true);

  useEffect(() => {
    if (isInitialRender) {
      const fetchData = async () => {
        try {
          const response = await axios.get('http://localhost:5000/aimessage');
          const data = response.data;
          const newMessages = data.map((item) => ({
            id: item.id,
            text: item.text,
          }));
          setMessages(newMessages);
          setIsInitialRender(false);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      fetchData();
      setIsInitialRender(false);
    }
  }, [isInitialRender]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (user === "") {
      alert('not user')
      return;
    } else if (text === "") {
      alert('発言の入力が必要です')
      return;
    }
    const newItem = {
      id: user,
      text: text,
    };
    axios.post('http://localhost:5000/message', newItem)
      .then(response => console.log(response))
      .catch(error => console.log(error));
    setItems(items.concat(newItem));
    setUser('You');
    setText('');
  };

  return (
    <React.Fragment>
      <header>
        <p className="title">議論：AI技術の未来</p>
      </header>
      <div className="tweet-main">
        <TweetIndex items={messages} />
      </div>
      <div className="container">
        <form onSubmit={handleSubmit} autoComplete="off">
          <textarea onChange={(event) => setUser(event.target.value)} value={user} id='name' placeholder="name"/><br/>
          <textarea id="tweet" onChange={(event) => setText(event.target.value)} value={text} placeholder="発言"/><br/>
          <button className="btn btn-success" type="submit">送信</button>
        </form>
      </div>
    </React.Fragment>
  );
}

export default App;