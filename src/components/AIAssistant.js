import React, { useState, useEffect, useMemo, useCallback } from 'react';
import './AIAssistant.css'; // Import CSS for styling
import { FaMicrophone, FaMicrophoneSlash } from 'react-icons/fa'; // Import microphone icons

const AIAssistant = () => {
  const [isListening, setIsListening] = useState(false); // Track if recognition is running
  const [speechResult, setSpeechResult] = useState(''); // Store speech recognition result
  const [response, setResponse] = useState(''); // Store AI response
  const [error, setError] = useState(''); // Track any errors

  // User preferences (can be expanded with real adaptive learning later)
  const [userPreferences] = useState({
    favoriteMusic: ['Rock', 'Pop', 'Jazz'],
    preferredRoutes: ['Route 1', 'Route 2'],
  });

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

    // Handling different commands for Co-Driver AI
    if (lowerCaseCommand.includes('hello') || lowerCaseCommand.includes('hi')) {
      responseText = 'Hello! How can I assist you on your drive today?';
    }
    else if (lowerCaseCommand.includes('traffic')) {
      // Static traffic response, could be dynamic with real data
      const trafficResponses = [
        'Traffic is smooth ahead, you will reach your destination in 20 minutes.',
        'There is a traffic jam ahead, it will take around 40 minutes.',
        'No traffic updates available at the moment, drive safe!'
      ];
      responseText = trafficResponses[Math.floor(Math.random() * trafficResponses.length)];
    }
    else if (lowerCaseCommand.includes('route')) {
      // Suggest preferred routes based on user preferences
      responseText = `I suggest taking ${userPreferences.preferredRoutes[0]} for a faster drive.`;
    }
    else if (lowerCaseCommand.includes('music')) {
      // Generate a playlist based on user preferences
      const musicGenre = userPreferences.favoriteMusic[Math.floor(Math.random() * userPreferences.favoriteMusic.length)];
      responseText = `I have selected a ${musicGenre} playlist for you. Enjoy the ride!`;
    }
    else if (lowerCaseCommand.includes('story')) {
      // Provide a story or relaxation content for passengers
      const stories = [
        'Once upon a time, in a kingdom far away...',
        'In a peaceful forest, animals lived harmoniously...',
        'On a stormy night, a brave knight set out on an adventure...'
      ];
      responseText = stories[Math.floor(Math.random() * stories.length)];
    }
    else if (lowerCaseCommand.includes('how are you')) {
      responseText = 'I’m doing great! Ready to assist you on your journey.';
    }
    else {
      responseText = `Sorry, I didn’t understand "${command}". Can you repeat it or try something else like asking for the route, traffic updates, or entertainment options?`;
    }

    setResponse(responseText);
    respondToCommand(responseText);
  }, [userPreferences]); // Dependency on user preferences to adapt the system

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

  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  return (
    <div className="container">
      <h1 className="title">AI Co-Driver Assistant</h1>
      <p className={`status ${isListening ? 'active' : 'inactive'}`}>
        Speech Recognition Status: {isListening ? 'Listening...' : 'Not Listening'}
      </p>

      <div className="button-container">
        <button className="button mute-btn" onClick={toggleListening}>
          {isListening ? <FaMicrophoneSlash size={30} /> : <FaMicrophone size={30} />}
        </button>
      </div>

      {speechResult && <p className="result"><strong>Recognized Speech: </strong>{speechResult}</p>}
      {response && <p className="response"><strong>AI Response: </strong>{response}</p>}
      {error && <p className="error"><strong>Error: </strong>{error}</p>}
    </div>
  );
};

export default AIAssistant;
