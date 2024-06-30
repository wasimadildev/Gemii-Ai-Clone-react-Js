import React, { createContext, useState } from "react";
import run from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompt, setPrevPrompts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  // Function to handle delay and append each word with a delay
  const delayPara = (index, nextWord) => {
    setTimeout(() => {
      setResultData(prev => prev + nextWord);
    }, 75 * index);
  };

  // Function to format response based on Markdown-like syntax
  const formatResponse = (response) => {
    let formattedResponse = response;
  
    // Handle ## for headings
    formattedResponse = formattedResponse.replace(/^##(.*)$/gm, '<h2>$1</h2>');
  
    // Handle new lines after headings and other formatting
    formattedResponse = formattedResponse.replace(/<\/h2>(.*)/g, '</h2>\n$1');
  
    // Handle ** for bold
    formattedResponse = formattedResponse.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');
  
    // Handle * for list items
    formattedResponse = formattedResponse.replace(/^\*(.*)$/gm, '<li>$1</li>');
    formattedResponse = formattedResponse.replace(/<\/li>(.*)/g, '</li>\n$1');
    formattedResponse = '<ul>\n' + formattedResponse + '\n</ul>';
  
    // Handle numbered list items (1., 2., 3., ...)
    formattedResponse = formattedResponse.replace(/^\d+\.(.*)$/gm, '<li>$1</li>');
    formattedResponse = formattedResponse.replace(/<\/li>(.*)/g, '</li><br>$1');
    formattedResponse = '<ul>\n' + formattedResponse + '\n</ul>';
  
    return formattedResponse;
  };
  

  // Function to handle user input submission
  const onSent = async () => {
    setResultData("");
    setLoading(true);
    setShowResult(true);

    // Format and set recent prompt
    const formattedTitle = input.trim();
    setRecentPrompt(formattedTitle);
    setPrevPrompts(prev => [...prev, formattedTitle]);

    // Execute async operation (e.g., fetching data)
    try {
      const response = await run(input);
      const formattedResponse = formatResponse(response);
      setResultData(formattedResponse);
    } catch (error) {
      console.error("Error fetching data:", error);
      setResultData("Error fetching data. Please try again.");
    } finally {
      setLoading(false);
      setInput("");
    }
  };

  const contextValue = {
    prevPrompt,
    setPrevPrompts,
    onSent,
    setRecentPrompt,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
    setLoading,
    setShowResult,
    setResultData,
  };

  return (
    <Context.Provider value={contextValue}>
      {props.children}
    </Context.Provider>
  );
};

export default ContextProvider;
