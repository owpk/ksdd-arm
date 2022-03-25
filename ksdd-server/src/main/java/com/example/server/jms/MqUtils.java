package com.example.server.jms;

import com.ibm.mq.jms.MQQueue;
import com.ibm.mq.jms.MQQueueConnectionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Controller;

import javax.annotation.PostConstruct;
import javax.jms.*;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ConcurrentLinkedQueue;

@Controller
public class MqUtils {

    @Autowired
    private SimpMessageSendingOperations messagingTemplate;

    private final String QUEUE_NAME = "DEMO_QUEUE";
    private final String jmsQueueMgr = "DEMO_MANAGER";
    private final String jmsChannel = "OWPK";
    private MQQueueConnectionFactory qcf;
    private QueueConnection qc;
    private Queue queue;
    private QueueSession queueSession;
    private MessageProducer messageProducer;
    private Listener listener;

//    @PostConstruct
    public void init() throws Exception {
        listener = new Listener();
        qcf = new MQQueueConnectionFactory();
        qcf.setQueueManager(jmsQueueMgr);
        qcf.setChannel(jmsChannel);
        qc = qcf.createQueueConnection("owpk", "1422");

        queue = new MQQueue(QUEUE_NAME);

        queueSession = qc.createQueueSession(false, Session.AUTO_ACKNOWLEDGE);

        MessageConsumer consumer = queueSession.createReceiver(queue, "color='black' OR color='pink'");
        messageProducer = queueSession.createProducer(queue);
        consumer.setMessageListener(listener);

        new Thread(() -> {

            try {
                Session session = qc.createQueueSession(false, Session.AUTO_ACKNOWLEDGE);
                MessageProducer producer = session.createProducer(queue);
                Message msg1 = session.createTextMessage("black");
                msg1.setStringProperty("color", "black");
                msg1.setStringProperty("color", "pink");

                Message msg2 = session.createTextMessage("pink");
                msg2.setStringProperty("color", "pink");

                while (true) {
                    producer.send(msg1);
                    Thread.sleep(2000);
                    producer.send(msg2);
                    Thread.sleep(2000);
                }
            } catch (JMSException | InterruptedException e) {
                e.printStackTrace();
            }
        }).start();

        qc.start();
    }


    private static class Listener implements MessageListener {

        private ConcurrentLinkedQueue<String> msgs = new ConcurrentLinkedQueue<>();

        @Override
        public void onMessage(Message message) {
            try {
                if (message instanceof TextMessage) {
                    String msg = ((TextMessage) message).getText();
                    System.out.println("String message recieved >> " + msg);
                    if (msg != null)
                        msgs.add(msg);
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    @MessageMapping("/init")
    public void sendMessage(String req) {
        System.out.println("Init event received: " + req);
        new Thread(() -> {
            while (true) {
                String msg = listener.msgs.poll();
                System.out.println(" WS SOCKET MSG SEND: " + msg);
                if (msg != null)
                    messagingTemplate.convertAndSend("/topic/publicChatRoom", msg);
                try {
                    Thread.sleep(2000);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        }).start();
    }
}