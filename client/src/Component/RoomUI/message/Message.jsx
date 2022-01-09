import "./message.css";
import ReactEmoji from "react-emoji";
import { format } from "timeago.js";

export default function Message({senderImg, receiverImg, message, own }) {
 
  return (


    <div className={own ? "messages own" : "messages"}>
      <div className="messageTop">
        <img
          className="messageImg"
          src={own ? senderImg: receiverImg}
          alt=""
        />
        <p className="messageText">{ReactEmoji.emojify(message.text)}</p>
      </div>
      <div className="messageBottom">{format(message.date)}</div>
    </div>
  );
}
