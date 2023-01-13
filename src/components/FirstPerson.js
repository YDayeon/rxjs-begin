import { useLayoutEffect, useState } from "react";
import chatStore from "../store/chat";

const FirstPerson = () => {
  const [chatState, setChatState] = useState(chatStore.initialState);

  const onFormSubmit = (e) => {
    e.preventDefault();
    const messageObject = {
      person: "first-person",
      text: e.target.elements.messageInput.value.trim(),
    };
    chatStore.sendMessage(messageObject);
    document.getElementById("messageForm").reset();
  };

  // component가 render되기 전에 chatState에 data를 보내기 위해 useLayoutEffect 사용
  useLayoutEffect(() => {
    chatStore.subscribe(setChatState);
    chatStore.init();
  }, []);

  return (
    <div className="container">
      <h2>Mycroft</h2>
      <div className="chat-box">
        {chatState.data.map((message, i) => (
          <div key={i}>
            <p className={message.person}>{message.text}</p>
            <div className="clear"></div>
          </div>
        ))}
      </div>
      <form id="messageForm" onSubmit={onFormSubmit}>
        <input
          type="text"
          id="messageInput"
          name="messageInput"
          placeholder="type here..."
          required
        />
        <button type="submit">Send</button>
        <button className="clear-button" onClick={() => chatStore.clearChat()}>
          Clear Chat
        </button>
      </form>
    </div>
  );
};

export default FirstPerson;
