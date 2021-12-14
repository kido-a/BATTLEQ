import React, { useEffect, useRef, useState, useContext } from "react";
import * as StompJs from "@stomp/stompjs";
import * as SockJS from "sockjs-client";
import { Box, Container, Grid, TextField, Button } from "@material-ui/core";
import MainLayout from "../../layout/MainLayout";
import { UserStateContext } from "../../context/Context";
import PlayChat from "./PlayChat";
const PlayUser = () => {
  const client = useRef({});
  const [message, setMessage] = useState("");
  const [usercheck, setUsercheck] = useState(false);
  const [pin, setPin] = useState("");
  const { chatMessages, setChatMessages } = useContext(UserStateContext);

  useEffect(() => {
    return () => disconnect();
  }, []);

  const userConnect = (pin) => {
    client.current = new StompJs.Client({
      // brokerURL: "ws://localhost:8080/ws-stomp/websocket", // 웹소켓 서버로 직접 접속
      webSocketFactory: () => new SockJS("/connect"), // proxy를 통한 접속
      connectHeaders: {
        "auth-token": "spring-chat-auth-token",
      },
      debug: (str) => {
        console.log(str);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      onConnect: () => {
        userSubscribe(pin);
      },
      onStompError: (frame) => {
        console.error(frame);
      },
    });
    client.current.activate();
    setUsercheck(true);
  };

  const disconnect = () => {
    client.current.deactivate();
  };

  const userSubscribe = (pin) => {
    client.current.subscribe(`/user/sub/message`, ({ body }) => {
      let message = JSON.parse(body);
      console.log("message : ", message);
    });

    client.current.subscribe(`/sub/pin/${pin}`, ({ body }) => {
      let message = JSON.parse(body);
      console.log(message);
      if (message.messageType === "CHAT") {
        setChatMessages((chatMessages) => [...chatMessages, message.message]);
      } else if (message.messageType === "JOIN") {
        setChatMessages((chatMessages) => [...chatMessages, message.message]);
      }
    });

    const msg = {
      messageType: "JOIN",
      sender: "HwangHoYeon",
    };

    client.current.publish({
      destination: `/pub/play/joinUser/${pin}`,
      body: JSON.stringify(msg),
    });
  };

  const publish = (message) => {
    const msg = {
      messageType: "CHAT",
      content: message,
      //   sender: "client1",
    };

    if (!client.current.connected) {
      window.alert("커넥션 오류");
      return;
    }

    client.current.publish({
      destination: `/pub/play/chatRoom/${pin}`,
      body: JSON.stringify(msg),
    });
    setMessage("");
  };
  if (!usercheck) {
    return (
      <MainLayout>
        <Box
          sx={{
            backgroundColor: "background.default",
            minHeight: "100%",
            py: 3,
          }}
        >
          <Container maxWidth="lg">
            <Grid container spacing={3}>
              <Grid item lg={12} md={6} xs={12}>
                <TextField
                  label={"pin"}
                  value={pin}
                  fullWidth
                  onChange={(e) => setPin(e.target.value)}
                />
              </Grid>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  p: 2,
                }}
              >
                <Button
                  type="submit"
                  color="primary"
                  variant="contained"
                  onClick={() => userConnect(pin)}
                >
                  게임 참가
                </Button>
              </Box>
            </Grid>
          </Container>
        </Box>
      </MainLayout>
    );
  } else {
    return (
      <MainLayout>
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
export default PlayUser;
