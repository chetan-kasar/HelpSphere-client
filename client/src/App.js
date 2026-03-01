import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown'; // npm install react-markdown
import send from "./images/send.png";
import girl from "./images/girl.png";
import bot from "./images/bot.png";
import axios from 'axios';

// ✅ Moved outside App and receives props
const Response = ({ prompt, output }) => {
  return (
    <div className='response'>
      <div className='user'>
        <img src={girl} alt="user" />
        <p><span style={{ color: "black" }}>User : </span>{prompt}</p>
      </div>
      <div className='bot'>
        <img src={bot} alt="bot" />
        <div>
          <span style={{ color: "black" }}>HelpSphere : </span>
          {/* ✅ This renders bold, lists, bullet points properly */}
          <ReactMarkdown>{output}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const [prompt, setPrompt] = useState("");
  const [output, setOutput] = useState("");
  

  const handleClick = () => {
    setOutput("Thinking.....");
    const data = { prompt: prompt };

    axios.post("https://help-sphere-server.vercel.app/", data)
      .then(response => {
        setOutput(response.data);
        setHistory(prev => [{ user: prompt, model: response.data }, ...prev]);
      })
      .catch(error => {
        console.log("Error in request", error);
        setOutput("Something went wrong. Please try again.");
      });
  };

  return (
    <div>
      <div className='title'>
        <h1>Help<span>Sphere</span></h1>
      </div>
      <div className='window'>
        <div className='prompt-div'>
          <input
            type="text"
            placeholder='Message HelpSphere......'
            onChange={(e) => setPrompt(e.target.value)}
            className='prompt'
          />
          <img onClick={handleClick} src={send} className='send-btn' alt="send" />
        </div>

        {/* ✅ Pass prompt and output as props */}
        {output ? <Response prompt={prompt} output={output} /> : ""}
      </div>

      <div className='footer'>
        <a href="https://image-sense.vercel.app/" className='imageSense-footer'>Try ImageSense</a><br />
        <span className='copy-right'>&copy; Chetan Kasar</span>
      </div>
    </div>
  );
};

export default App;
