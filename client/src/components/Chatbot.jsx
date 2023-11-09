import React, { useState } from 'react';

const Chatbot = () => {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/webhook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message })
      });

      const data = await response.json();
      setResponse(data.message);
    } catch (error) {
      console.error('Error:', error);
      setResponse("Sorry, there was an error processing your request.");
    }
  };

  return (
    <div className="max-w-sm mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-xl mb-4 font-bold">Chat Interface</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full p-2 border border-gray-300 mb-4 rounded"
          placeholder="Enter your message"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Send
        </button>
      </form>

      {response && (
        <div className="mt-4">
          <strong>Bot Response:</strong>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
