import React, { useState, useEffect, useMemo } from 'react';
import './AIAssistant.css';

const AIAssistant = () => {
  const [isListening, setIsListening] = useState(false); // Track if recognition is running
  const [speechResult, setSpeechResult] = useState(''); // Store speech recognition result
  const [error, setError] = useState(''); // Track any errors

  // Memoize the recognition object to ensure it doesn't get recreated on every render
  const recognition = useMemo(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognitionInstance = new SpeechRecognition();
    recognitionInstance.continuous = true; // Enable continuous recognition
    recognitionInstance.lang = 'en-US'; // Set language to English
    return recognitionInstance;
  }, []); // Empty array ensures it runs only once, on mount

  useEffect(() => {
    // Handle speech recognition result
    recognition.onresult = (event) => {
      const transcript = event.results[event.results.length - 1][0].transcript;
      setSpeechResult(transcript);

      // Trigger response using Speech Synthesis
      respondToCommand(transcript); // Call a function to respond to recognized speech
    };

    // Handle error events
    recognition.onerror = (event) => {
      setError(`Error occurred: ${event.error}`);
    };

    return () => {
      recognition.stop(); // Clean up on unmount
    };
  }, [recognition]);

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

  const respondToCommand = (command) => {
    const speech = new SpeechSynthesisUtterance(); // Create a new speech synthesis instance
    speech.text = `You said: ${command}`; // Set the speech text based on the recognized command

    // Customize speech properties
    speech.volume = 1; // Volume level from 0 to 1
    speech.rate = 1; // Speed of speech (1 is normal)
    speech.pitch = 1; // Pitch level (1 is normal)

    window.speechSynthesis.speak(speech); // Speak the text
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
      {error && <p className="error"><strong>Error: </strong>{error}</p>}
    </div>
  );
};

export default AIAssistant;
