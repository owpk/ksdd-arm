import React, {useEffect, useState} from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

const socket = SockJS("http://localhost:8080/ws");
const stompClient = Stomp.over(socket);

export default class WSClient extends React.Component<any, any> {

    constructor(props) {
        super(props);
        this.state = {w_data: []}
    }

    connect(): void {
        stompClient.connect({}, () => {
            stompClient.send('/app/init', {}, '/')
            stompClient.subscribe('/topic/publicChatRoom', (data) => {
                this.setState({
                    w_data: [...this.state.w_data, data.body]
                })
            });
        });
    }

    send(): void {
        stompClient.send('/app/send')
    }

    componentDidMount() {
        this.connect();
    }

    render() {
        return (
            <>
                <div id="chat-container">

                    <div className="chat-header">
                        <h3>mq messages</h3>
                    </div>

                    <hr/>

                    <ul id="messagearea">
                        {this.state.w_data.map(x =>
                            <li>{x}</li>
                        )}
                    </ul>
                </div>
                <div className={"btn btn-primary"} onClick={() => this.send()}>send</div>
            </>
        )
    }
}
