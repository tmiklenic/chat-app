import './App.css';
import { useState, useEffect } from 'react';
import ChatWindow from './components/ChatWindow';
import ChatInputBox from './components/ChatInputBox';
import { faker } from '@faker-js/faker';
import ChatHeader from './components/ChatHeader';
import getRandomRGBColor from './utils/randomColorUtils';

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
      const createRandomUser = () => {
        const randomUser = {
          username: faker.internet.userName(),
          color: getRandomRGBColor()
        };
        return randomUser;
      }
      
      const newUser = createRandomUser();
      setUser(newUser);
      console.log(newUser);

      const newDrone = new window.Scaledrone('0OFGPL8R6iCAPGXb', {data: user});
      setDrone(newDrone);
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
          setMessages( existingMessages => {return [...existingMessages, newMessage.data]});
        });
      });
    }
     
  }, [drone, user]);


  //Handlers
    const sendMessageHandler = (messageContent) => {
      const newMessage = {
        key: crypto.randomUUID,
        contents: messageContent,
        author: user.username
      };
      drone.publish({
        room: initialRoom,
        message: newMessage
      });
      // console.log("New message sent: "+newMessage.contents);
    };

    //Utils


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
