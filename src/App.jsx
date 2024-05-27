import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [text, setText] = useState('');
  const [fontSize, setFontSize] = useState(16);
  const [fontFamily, setFontFamily] = useState('Arial');
  const [fontColor, setFontColor] = useState('#000000');
  const [history, setHistory] = useState([]);
  const [language, setLanguage] = useState('english');
  const [isTyping, setIsTyping] = useState(false);
  const [showEmojiList, setShowEmojiList] = useState(false);
  const [isUpperCase, setIsUpperCase] = useState(false);
  const [emojis] = useState([
    '😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '😊', '😇', '🙂', '🙃', '😉', '😌', '😍',
    '😘', '😗', '😙', '😚', '😋', '😛', '😜', '😝', '😎', '🤓', '🤠', '😈', '👿', '👹', '👺'
  ]);

  // Function to handle key press events
  const handleKeyPress = (char) => {
    setHistory(prevHistory => [...prevHistory, text]);
    setText(prev => prev + (isUpperCase ? char.toUpperCase() : char));
    setIsTyping(true);
  };

  // Function to handle delete button click
  const handleDelete = () => {
    setHistory(prevHistory => [...prevHistory, text]);
    setText(prev => prev.slice(0, -1));
  };

  // Function to handle clear button click
  const handleClear = () => {
    setHistory(prevHistory => [...prevHistory, text]);
    setText('');
  };

  // Function to handle undo button click
  const handleUndo = () => {
    setHistory(prevHistory => {
      if (prevHistory.length === 0) return prevHistory;
      const lastState = prevHistory[prevHistory.length - 1];
      setText(lastState);
      return prevHistory.slice(0, -1);
    });
  };

  // Function to handle font size change
  const handleFontSizeChange = (e) => {
    setFontSize(e.target.value);
  };

  // Function to handle font family change
  const handleFontFamilyChange = (e) => {
    setFontFamily(e.target.value);
  };

  // Function to handle font color change
  const handleFontColorChange = (color) => {
    setFontColor(color);
  };

  // Function to handle language change
  const handleLanguageChange = (lang) => {
    setLanguage(lang);
  };

  // Function to toggle uppercase mode
  const toggleUpperCase = () => {
    setIsUpperCase(prevState => !prevState);
  };

  // Function to handle emoji click event
  const handleEmojiClick = (emoji) => {
    handleKeyPress(emoji);
    setShowEmojiList(false);
  };

  return (
    <div className="editor-container">
      <h1 className="title">Text Editor</h1>
      <div className="toolbar">
        <div className="language-switcher">
          <button onClick={() => handleLanguageChange('english')}>English</button>
          <button onClick={() => handleLanguageChange('hebrew')}>עברית</button>
          <button onClick={() => setShowEmojiList(!showEmojiList)}>😀</button>
          {showEmojiList && (
            <div className="emoji-list">
              {emojis.map((emoji, index) => (
                <span key={index} onClick={() => handleEmojiClick(emoji)}>{emoji}</span>
              ))}
            </div>
          )}
        </div>
        <div className="formatting-buttons">
          <button onClick={handleDelete}>Delete</button>
          <button onClick={handleClear}>Clear</button>
          <button onClick={handleUndo}>Undo</button>
          <button onClick={toggleUpperCase}>UpperCase</button>
          <div className="font-size-selector">
            <label htmlFor="fontSize" className="labels">Font Size:</label>
            <select id="fontSize" value={fontSize} onChange={handleFontSizeChange}>
              {[...Array(13)].map((_, i) => (
                <option key={i} value={8 + i * 2}>{8 + i * 2}</option>
              ))}
            </select>
          </div>
          <div className="font-family-selector">
            <label htmlFor="fontFamily" className="labels">Font Family:</label>
            <select id="fontFamily" value={fontFamily} onChange={handleFontFamilyChange}>
              <option value="Arial">Arial</option>
              <option value="Times New Roman">Times New Roman</option>
              <option value="Courier New">Courier New</option>
              <option value="Georgia">Georgia</option>
              <option value="Verdana">Verdana</option>
              <option value="Tahoma">Tahoma</option>
            </select>
          </div>
          <div className="color-picker">
            <label htmlFor="fontColor" className="labels">Color:</label>
            <input id="fontColor" type="color" onChange={(e) => handleFontColorChange(e.target.value)} value={fontColor} />
          </div>
        </div>
      </div>
      <div className="keyboard">
        {language === 'english' && 'abcdefghijklmnopqrstuvwxyz0123456789!?@#$%^&*()_-+=/.,'.split('').map(char => (
          <button key={char} onClick={() => handleKeyPress(char)}>{char}</button>
        ))}
        {language === 'hebrew' && 'אבגדהוזחטיכלמנסעפצקרשת!?@#$%^&*()_-+=/.,0123456789'.split('').map(char => (
          <button key={char} onClick={() => handleKeyPress(char)}>{char}</button>
        ))}
      </div>
      <div className="text-display" style={{ fontSize: `${fontSize}px`, fontFamily: fontFamily, color: fontColor }}>
        {!isTyping && text === '' ? 'Write here...' : text}
      </div>
    </div>
  );
};

export default App;
















