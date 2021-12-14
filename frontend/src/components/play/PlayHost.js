import React, { useEffect, useRef, useState, useContext } from "react";
import * as StompJs from "@stomp/stompjs";
import * as SockJS from "sockjs-client";
import MainLayout from "../../layout/MainLayout";
import {
  Box,
  Container,
  Grid,
  TextField,
  Button,
  Typography,
} from "@material-ui/core";

import { UserStateContext } from "../../context/Context";
import PlayChat from "./PlayChat";
import PlayChatSend from "./PlayChatSend";
const PlayHost = () => {
  const client = useRef({});
  const [pin, setPin] = useState("");
  const [message, setMessage] = useState("");
  const [hostcheck, setHostcheck] = useState(false);
  const [status, setStatus] = useState("");

  const { chatMessages, setChatMessages, users } = useContext(UserStateContext);

  useEffect(() => {
    hostConnect();
    return () => disconnect();
  }, []);

  const hostConnect = () => {
    console.log("hostConnect 실행");
    client.current = new StompJs.Client({
      // brokerURL: "ws://localhost:8080/ws-stomp/websocket", // 웹소켓 서버로 직접 접속
      webSocketFactory: () => new SockJS("/connect"), // proxy를 통한 접속

      connectHeaders: {
        "auth-token": "spring-chat-auth-token",
      },
      debug: (str) => {
        console.log("debug: function -> : ", str);
      },
      reconnectDelay: 5000, // 자동 재연결
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,

      // 연결됬을 때 함수
      // 이 작업은 (다시) 연결한 후 실행되기 때문에 필요합니다.
      onConnect: () => {
        hostSubscribe();
      },

      // 에러처리 함수
      onStompError: (frame) => {
        console.error(frame);
      },
    });
    // 클라이언트 활성화
    client.current.activate();
    console.log("client.current : ", client.current);
  };

  const disconnect = () => {
    client.current.deactivate();
  };

  /*
  const hostSubscribe = () => {
    client.current.subscribe(`/user/sub/message`, ({ body }) => {
      let message = JSON.parse(body);
      console.log("message : ", message);
      if (message.messageType == "GENERATE") {
        console.log("hostsubscribe의 if문 실행");
        console.log("if문 안의 message : ", message);
        hostSubscribePin(message.pin);
        setPin(message.pin);
      }
    });
  };
  */

  /*
 const hostSubscribePin = (pin) => {
   client.current.subscribe(`/sub/pin/${pin}`, ({ body }) => {
     let message = JSON.parse(body);
     console.log("hostSubscribePin의 message : ", message);
     if (message.messageType == "CHAT") {
       setChatMessages((chatMessages) => [...chatMessages, message.message]);
     } else if (message.messageType === "JOIN") {
       setChatMessages((chatMessages) => [...chatMessages, message.message]);
     }
   });
  };
  */

  //메시지 받아와서 메시지 타입이 generate면 if문 실행
  const hostSubscribe = () => {
    client.current.subscribe(`/user/sub/message`, ({ body }) => {
      let message = JSON.parse(body);
      if (message.messageType == "GENERATE") {
        hostSubscribePin(message.pin);
        setPin(message.pin);
      }
    });
  };

  //메시지 받아와서 메시지 타입이 chat이면 chatmessages에 message 넣고 타입이 join이면 메시지 넣고
  const hostSubscribePin = (pin) => {
    client.current.subscribe(`/sub/pin/${pin}`, ({ body }) => {
      let message = JSON.parse(body);
      if (message.messageType == "CHAT") {
        setChatMessages((chatMessages) => [...chatMessages, message.message]);
      } else if (message.messageType === "JOIN") {
        setChatMessages((chatMessages) => [...chatMessages, message.message]);
      }
    });
  };

  const generate = () => {
    // 메세지 DTO (messageType, content, sender, quizNum)
    const msg = {
      messageType: "GENERATE",
      content: "GENERATE",
      sender: "client2",
      quizNum: "1",
    };

    client.current.publish({
      destination: "/pub/play/joinHost/",
      body: JSON.stringify(msg),
    });
    setHostcheck(true);
    console.log("generate 실행");
    console.log("msg : ", msg);
  };

  const publish = (message) => {
    const user = users.nickname;
    const msg = {
      messageType: "CHAT",
      content: message,
      sender: "client1",
    };

    if (!client.current.connected) {
      window.alert("커넥션 오류");
      return;
    }

    client.current.publish({
      destination: `/pub/play/chatRoom/${pin}`,
      body: JSON.stringify(msg),
    });
    console.log("user : ", user);
    setMessage("");
  };

  if (!hostcheck) {
    return (
      <MainLayout>
        <Typography variant="h1">PIN : {pin}</Typography>
        <Button
          type="submit"
          variant="contained"
          sx={{ mt: 1, mb: 2 }}
          onClick={generate}
        >
          방 생성
        </Button>
      </MainLayout>
    );
  } else {
    return (
      <MainLayout>
        <Typography variant="h1">PIN : {pin}</Typography>
        <Box
          sx={{
            backgroundColor: "lightgrey",
            width: "50%",
            minHeight: "70%",
            py: 3,
          }}
        >
          <Container maxWidth="lg">
            <Grid container spacing={1}>
              <PlayChat chatMessages={chatMessages} />
            </Grid>
          </Container>
        </Box>
        <Box
          sx={{
            backgroundColor: "background.default",
            height: "10%",
            width: "50%",
            py: 3,
          }}
        >
          <Container maxWidth="lg">
            <Grid container spacing={1}>
              <Grid item lg={9}>
                <TextField
                  label={"message"}
                  value={message}
                  fullWidth
                  onChange={(e) => setMessage(e.target.value)}
                />
              </Grid>
              <Grid item lg={3}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 1, mb: 2 }}
                  onClick={() => publish(message)}
                >
                  보내기
                </Button>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </MainLayout>
    );
  }
};

export default PlayHost;
