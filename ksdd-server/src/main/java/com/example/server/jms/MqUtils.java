package com.example.server.jms;

import com.example.server.ws.CMessage;
import com.ibm.mq.jms.MQQueue;
import com.ibm.mq.jms.MQQueueConnectionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import javax.annotation.PostConstruct;
import javax.jms.*;
import java.util.concurrent.ConcurrentLinkedQueue;

@Controller
public class MqUtils implements MessageListener {

    @Autowired
    private SimpMessageSendingOperations messagingTemplate;

    private final String QUEUE_NAME = "DEMO_QUEUE";
    private final String jmsQueueMgr = "DEMO_MANAGER";
    private final String jmsChannel = "OWPK";
    private MQQueueConnectionFactory qcf;
    private QueueConnection qc;
    private Queue queue;
    private QueueSession queueSession;
    private QueueReceiver qr;
    private String jmsUserName;

    private ConcurrentLinkedQueue<String> msgs;

    @PostConstruct
    public void init() throws Exception {
        msgs = new ConcurrentLinkedQueue<>();
        qcf = new MQQueueConnectionFactory();
//        qcf.setHostName(jmsHost);
//        qcf.setPort(Integer.parseInt(jmsPort));
        qcf.setQueueManager(jmsQueueMgr);
        qcf.setChannel(jmsChannel);
//        qcf.setTransportType(WMQConstants.WMQ_CM_CLIENT);
        qc = qcf.createQueueConnection("owpk", "1422");

        queue = new MQQueue(QUEUE_NAME);
        qc.createQueueSession(false, Session.AUTO_ACKNOWLEDGE);
        queueSession = qc.createQueueSession(false, Session.AUTO_ACKNOWLEDGE);
        qr = queueSession.createReceiver(queue);
        qr.setMessageListener(this);
        qc.start();
    }

    @Override
    public void onMessage(Message message) {
        try {
            if (message instanceof TextMessage) {
                String msg = ((TextMessage) message).getText();
                System.out.println("String message recieved >> " + msg);
                msgs.add(msg);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @MessageMapping("/init")
    public void sendMessage(String req) throws InterruptedException {
        System.out.println("Init event received: " + req);
        while (true) {
            String msg = msgs.poll();
            System.out.println(" WS SOCKET MSG SEND: " + msg);
            if (msg != null)
                messagingTemplate.convertAndSend("/topic/publicChatRoom", msg);
            Thread.sleep(2000);
        }
    }
}