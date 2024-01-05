import React, { useEffect, useState } from 'react';
import send from "./images/send.png";
import girl from "./images/girl.png";
import bot from "./images/bot.png";
import axios from 'axios';

const App = () => {

  const [prompt, setPrompt] = useState("");
  const [output, setOutput] = useState("");
  const [history, setHistory] = useState([]);

  const handleClick = ()=>{
    setOutput(" Thinking.....");

    const data = {
      prompt:prompt
    }
    try {
      axios.post("https://help-sphere-server.vercel.app/", data).then(
        response=>{
          setOutput(response.data);
          const updateHistory = [{user:prompt , model:response.data}, ...history];
          setHistory(updateHistory);
          console.log(history);
    });
    } catch (error) {
      console.log("Error in request");
    }  
  }

  const Response = ()=>{
    return (
      <div className='response'>
          <div className='user'>
            <img src={girl}/><p><span style={{color:"black"}}>User : </span>{prompt}</p>
          </div>

          <div className='bot'>
            <img src={bot}/><p><span style={{color:"black"}}>HelpSphere : </span>{output}</p>
          </div>
      </div>
    )
  }

  return (
    <div>

      <div className='title'>
        <h1>Help<span>Sphere</span></h1>
      </div>

      <div className='window'>
        <div className='prompt-div'>
          <input text="text" placeholder='Message HelpSphere......' onChange={(e)=>{setPrompt(e.target.value)}} className='prompt'/>
          <img onClick={handleClick} src={send} className='send-btn'/>
        </div>

        {output? <Response/> : ""}
        {/*
          history.slice().reverse().map((ele)=>{
            return (
              <>
                <p>User : {ele.user}</p>
                <p>Model : {ele.model}</p>
              </>
            )
          })
        */}
      </div>
      <div className='footer'>
        <span className='imageSense-footer'>Try ImageSense</span><br/>
        <span className='copy-right'> &copy; Chetan Kasar </span>
        </div>
    </div>
  )
}

export default App
