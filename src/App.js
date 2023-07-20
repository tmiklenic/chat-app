import './App.css';
import { useState, useEffect } from 'react';
import ChatWindow from './components/ChatWindow';
import ChatInputBox from './components/ChatInputBox';
import { faker } from '@faker-js/faker';
import ChatHeader from './components/ChatHeader';

function App() {
  // Initial data
  const initialRoom = "observable-Room1";
  const initialUser = {
    username: "",
    color: ""
  };

  //States
  const [drone, setDrone] = useState();
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState(initialUser);


  //Changes
  useEffect(() => {
      const newUser = createRandomUser();
      setUser(newUser);
      console.log(newUser);

      const newDrone = new window.Scaledrone('0OFGPL8R6iCAPGXb', {data: user});
      setDrone(newDrone);
      // console.log(newDrone);

  }, []);

  useEffect(() => {
    if (drone)
    {
      drone.on('open', error => {
        if (error) {
          return console.error(error);
        }
        const room = drone.subscribe(initialRoom);
        room.on("open", (error) => {
          if (error) {
            console.error(error);
          } else {
            console.log("Connected to room");
          }
        });
        room.on("message", (newMessage) => {
          // receiveMsg(message);
          // console.log(newMessage.data);
          setMessages( existingMessages => {return [...existingMessages, newMessage.data]});
        });
      });
      

    }    
  }, [drone, user]);


  //Handlers
    const sendMessageHandler = (messageContent) => {
      // console.log("Message received in parent: "+messageContent);
      const newMessage = {
        key: crypto.randomUUID,
        contents: messageContent,
        author: user.username
      };
      drone.publish({
        room: initialRoom,
        message: newMessage
      });
      // setMessages((existingMessages)=>[...existingMessages, newMessage]);
      // setNextMessage(newMessage);
      console.log("New message sent: "+newMessage.contents);

    };

    //Utils
    const createRandomUser = () => {
        const randomUser = {
          username: faker.internet.userName(),
          color: getRandomRGBColor()
        };

        return randomUser;
    }

    const getRandomRGBColor = () => {
      const r_value = getRandomChannelValue();
      const g_value = getRandomChannelValue();
      const b_value = getRandomChannelValue();
      const randomRGBColor = `rgb(${r_value}, ${g_value}, ${b_value})`;
      console.log("RGB color generated: " +randomRGBColor);
      return randomRGBColor;
    }

    const getRandomChannelValue = () => {
      let channelValue = 0;
      //ogranicavanje petlje na vece channel vrijednosti osigurava da ce boja biti svjetlija i crni tekst uvijek citljiv na svijetloj podlozi
      do {
        channelValue = Math.floor(Math.random()*255);
      } while (channelValue < 130);

      return channelValue;
    }

    //Rendering elements
    return(
    <div className="App">
      <ChatHeader username={user.username} color={user.color}/>
      <ChatWindow messages={messages} user={user}/>
      <ChatInputBox onSubmitMessage={sendMessageHandler}/>
    </div>
  );
}

export default App;
