import React, { useState, useEffect, useMemo, useCallback } from 'react';
import './AIAssistant.css'; // Import CSS for styling

const AIAssistant = () => {
  const [isListening, setIsListening] = useState(false); // Track if recognition is running
  const [speechResult, setSpeechResult] = useState(''); // Store speech recognition result
  const [response, setResponse] = useState(''); // Store AI response
  const [error, setError] = useState(''); // Track any errors

  // Memoize SpeechRecognition to avoid re-creating it on every render
  const recognition = useMemo(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognitionInstance = new SpeechRecognition();
    recognitionInstance.continuous = true; // Enable continuous recognition
    recognitionInstance.lang = 'en-US'; // Set language to English
    return recognitionInstance;
  }, []); // Empty dependency array ensures recognition is only created once

  // Process the command and generate an AI response dynamically
  const processCommand = useCallback((command) => {
    let responseText = '';
    const lowerCaseCommand = command.toLowerCase();

    // Example responses based on common commands
    if (lowerCaseCommand.includes('hello') || lowerCaseCommand.includes('hi')) {
      const greetings = ['Hello! How can I assist you today?', 'Hi there! What can I do for you?', 'Greetings! What’s up?'];
      responseText = greetings[Math.floor(Math.random() * greetings.length)];
    } 
    else if (lowerCaseCommand.includes('weather')) {
      const weatherResponses = [
        'The weather is sunny and clear today.',
        'It looks like it might rain later. Stay prepared!',
        'The temperature is around 72°F with a light breeze.'
      ];
      responseText = weatherResponses[Math.floor(Math.random() * weatherResponses.length)];
    } 
    else if (lowerCaseCommand.includes('time')) {
      const currentTime = new Date().toLocaleTimeString();
      responseText = `The current time is ${currentTime}.`;
    } 
    else if (lowerCaseCommand.includes('how are you')) {
      const moodResponses = [
        'I’m doing great, thanks for asking!',
        'I’m good! Ready to assist you.',
        'I’m always happy to help you out!'
      ];
      responseText = moodResponses[Math.floor(Math.random() * moodResponses.length)];
    } 
    else if (lowerCaseCommand.includes('what is your name')) {
      responseText = "I am your friendly AI Assistant!";
    } 
    else {
      responseText = `Sorry, I didn’t understand "${command}". Can you repeat it? Or try something else like asking the time, weather, or just say hello!`;
    }

    setResponse(responseText);
    respondToCommand(responseText);
  }, []); // Memoize the processCommand function to avoid unnecessary re-renders

  // Respond to the command using text-to-speech
  const respondToCommand = (responseText) => {
    const speechSynthesis = window.speechSynthesis;
    const speech = new SpeechSynthesisUtterance(responseText);
    speechSynthesis.speak(speech);
  };

  // Set up the recognition logic inside useEffect
  useEffect(() => {
    // This will handle the result when speech is recognized
    recognition.onresult = (event) => {
      const transcript = event.results[event.results.length - 1][0].transcript;
      setSpeechResult(transcript);

      // Process the recognized command
      processCommand(transcript);
    };

    // Handle error events
    recognition.onerror = (event) => {
      setError(`Error occurred: ${event.error}`);
    };

    return () => {
      recognition.stop(); // Clean up on unmount
    };
  }, [recognition, processCommand]); // Include processCommand in the dependency array

  const startListening = () => {
    if (!isListening) {
      setIsListening(true);
      recognition.start();
    } else {
      setError('Recognition is already in progress.');
    }
  };

  const stopListening = () => {
    if (isListening) {
      recognition.stop();
      setIsListening(false);
    } else {
      setError('Recognition is not active.');
    }
  };

  return (
    <div className="container">
      <h1 className="title">AI Assistant</h1>
      <p className={`status ${isListening ? 'active' : 'inactive'}`}>
        Speech Recognition Status: {isListening ? 'Listening...' : 'Not Listening'}
      </p>
      <div className="button-container">
        <button className="button start-btn" onClick={startListening} disabled={isListening}>
          Start Listening
        </button>
        <button className="button stop-btn" onClick={stopListening} disabled={!isListening}>
          Stop Listening
        </button>
      </div>

      {speechResult && <p className="result"><strong>Recognized Speech: </strong>{speechResult}</p>}
      {response && <p className="response"><strong>AI Response: </strong>{response}</p>}
      {error && <p className="error"><strong>Error: </strong>{error}</p>}
    </div>
  );
};

export default AIAssistant;
