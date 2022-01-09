import { useEffect ,useState} from "react";
import { format } from "timeago.js";

import "./conversation.css";

export default function Conversation({handleMess, conversation, currentUser}) {

  const [username, setUsername] = useState([]);
  const [userId, setUserId] = useState([])
  const [mesu, setMesu] = useState("")
  const [mesudate, setMesudate] = useState("")
  const [img, setImg] = useState("");
  
  const messLength =(conversation.messages).length; 
  const textLen = conversation.messages[messLength-1];
  
  useEffect(()=>{
    if(textLen){
      setMesu(textLen.text); 
      setMesudate(format( textLen.date )); 
    }

    const friendName = conversation.senderName.find((m) => m !== currentUser.name);
    const friendId = conversation.members.find((m) => m !== currentUser.userId);
  
    setUsername(friendName);
    setUserId(friendId)
},[conversation.messages]);

useEffect(()=>{
  setImg(Math.floor(Math.random()*5000));

},[currentUser.userId]);


const goFront =(e)=>{
  if(window.innerWidth <= 650 && true){

    const back = document.querySelector(".mainChat");
    const front = document.querySelector(".sideChat");
    front.style.cssText = 'visibility: hidden; z-index: 0;'
    back.style.cssText = 'visibility: visible; z-index: 1;'
  }
 
}

  return (
    <div className="conversation" onClick={goFront} key={userId}>
      <img src={`https://avatars.dicebear.com/api/human/${img}.svg`} alt={`Side Img ${img}`} className="sidePanelImg"/>
       
       <div className="convData" onClick={handleMess} >
          <button  className="username" data-img={`https://avatars.dicebear.com/api/human/${img}.svg`} data-id={userId} data-name={username}>{username}</button>
          <h6  data-img={`https://avatars.dicebear.com/api/human/${img}.svg`} data-id={userId} data-name={username}>{mesu}</h6>
       </div>
       
       <h5 className='convDate'>{mesudate}</h5>
    </div>
  );
}
