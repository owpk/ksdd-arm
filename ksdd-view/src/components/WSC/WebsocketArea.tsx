import React, {FunctionComponent, useCallback, useEffect, useRef, useState} from "react";

const WebsocketArea: FunctionComponent = () => {

    const [w_data, setMessage] = useState([])

    const ws = new WebSocket('ws://localhost:8080/init');
    ws.send('');


    ws.onmessage = (evt: MessageEvent) => {
        // const data: Data = JSON.parse(evt.data);
        console.log("MESSAGE RECEIVED: ")
    };

    return (
        <>

            <div id="chat-container">
                <div className="chat-header">
                    <h3>MQ MESSAGES</h3>
                </div>

                <hr/>

                <div id="connecting">Connecting...</div>
                <ul id="messageArea">
                    {w_data.map(x =>
                        <li>x</li>
                    )}
                </ul>
                <form id="messageForm" name="messageForm">
                    <div className="input-message">
                        <input type="text" id="message" autoComplete="off"
                               placeholder="Type a message..."/>
                        <button className={"btn btn-primary"} type="submit">Send</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export {WebsocketArea}
