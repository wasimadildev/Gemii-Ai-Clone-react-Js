import './Sidebar.css';
import { assets } from '../../assets/assets';
import { useState, useContext } from 'react';
import { Context } from "../../Context/Context";

export const Sidebar = () => {
  const [extended, setExtended] = useState(false);
  const { prevPrompt, onSent, setRecentPrompt } = useContext(Context);

  return (
    <div className='sidebar'>
      <div className="top">
        <img 
          className='menu' 
          src={assets.menu_icon} 
          alt="menu icon" 
          onClick={() => setExtended(prev => !prev)} 
        />
        <div className="new-chat">
          <img src={assets.plus_icon} alt="plus icon" />
          {extended ? <p>New Chat</p> : null}
        </div>
        {extended && (
          <div className="recent">
            <p className="recent-title">Recent</p>
            {prevPrompt.map((item, index) => (
              <div className="recent-entry" key={index}>
                <img src={assets.message_icon} alt="message icon" />
                <p>{item}...</p>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="bottom">
        <div className="bottom-item recent-entry">
          <img src={assets.question_icon} alt="question icon" />
          {extended ? <p>Help</p> : null}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.history_icon} alt="history icon" />
          {extended ? <p>Activity</p> : null}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.setting_icon} alt="setting icon" />
          {extended ? <p>Setting</p> : null}
        </div>
      </div>
    </div>
  );
};
