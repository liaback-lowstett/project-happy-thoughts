import React, { useState, useEffect } from "react";

import MessageForm from "./components/MessageForm";
import MessageList from "./components/MessageList";

import { API_URL, LIKES_URL } from "./reusable/urls";

export const App = () => {
  const [messageList, setMessageList] = useState([]);
  const [messageNew, setMessageNew] = useState([]);


  //Messages
  useEffect(() => {
    fetchMessageList();
  }, []);

  // Fetch messages
  const fetchMessageList = () => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((messages) => setMessageList(messages))
      .catch((err) => console.error(err));
  };

  const handelMessageNewChange = (event) => {
    setMessageNew(event.target.value);
  };

  // Post messages 
  const handelFormSubmit = (event) => {
    event.preventDefault();

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: messageNew }),
    };

    fetch(API_URL, options)
      .then((res) => res.json())
      .then(() => fetchMessageList())
      .catch((err) => console.error(err));
  };

  // Post likes
  const handleLikeIncreas = (id) => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    };

    fetch(LIKES_URL(id), options)
      .then((res) => res.json())
      .then(() => fetchMessageList())
      .catch((err) => console.error(err));
  };

  return (
    <div className="happy-thoughts-container">
      <div className="message-form-container">
        <MessageForm
          // send as props to child compontent
          messageNew={messageNew}
          onMessageNewChange={handelMessageNewChange}
          onFormSubmit={handelFormSubmit}
        />
      </div>
      <div className="message-list-container">
        <MessageList
          // send as props to child compontent
          messageList={messageList}
          handleLikeIncreas={handleLikeIncreas}
        />
      </div>
    </div>
  );
};
