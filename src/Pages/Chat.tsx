import React, { useState } from "react";
import axios from "axios";
import "./Chat.css";

const apiKey = "your-api-key";
const endpoint = "https://api.openai.com/v1/chat/completions";

export const Chat = () => {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>(
    []
  );
  const [responses, setResponses]: any = useState([]);
  const [inputText, setInputText] = useState("");

  const handle_QUERY = (input: string) => {
    messages.push({
      role: "user",
      content: input,
    });
    fetch(`https://api.openai.com/v1/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        messages.push({
          role: "assistant",
          content: data.choices[0].message.content,
        });
        console.log(data);
        setResponses([
          ...responses,
          <h1 key={responses.length} className="user-input">
            {input}
          </h1>,
          <p key={Math.random()} className="response">
            {data.choices[0].message.content}
          </p>,
        ]);
        setInputText(""); // Clear the input field after submitting the question
      });
  };

  return (
    <div id="page-container">
      <h1 id="title">ChatBot</h1>
      <div id="results">
        <ul id="response-list">
          {responses.map((response: any, index: number) => (
            <li key={index}>{response}</li>
          ))}
        </ul>
      </div>
      <div id="input-container">
        <input
          id="input-text"
          type="text"
          value={inputText}
          onChange={(e) => {
            setInputText(e.target.value);
          }}
        />
        <button
          id="submit-button"
          onClick={() => {
            let input = inputText.toString();
            handle_QUERY(input);
          }}
        >
          submit
        </button>
      </div>
    </div>
  );
};
