import { useEffect } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import NavItem from "./NavItem";
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography,
} from "@material-ui/core";
import {
  AlertCircle as AlertCircleIcon,
  BarChart as BarChartIcon,
  ShoppingBag as ShoppingBagIcon,
  Users as UsersIcon,
  MessageSquare as MessageIcon,
  Edit as EditIcon,
  Key as KeyIcon,
} from "react-feather";

const user = {
  avatar: "/logo192.png",
  jobTitle: "nickname (닉네임)",
  name: "name (이름)",
};
const items = [
  {
    href: "/profile",
    icon: BarChartIcon,
    title: "내 정보",
  },
  {
    href: "/users",
    icon: UsersIcon,
    title: "사용자",
  },
  {
    href: "/quizSearch",
    icon: ShoppingBagIcon,
    title: "퀴즈 목록",
  },
  {
    href: "/quizTitle",
    icon: EditIcon,
    title: "퀴즈 생성",
  },
  {
    href: "/playHost",
    icon: KeyIcon,
    title: "호스트",
  },
  {
    href: "/playUser",
    icon: KeyIcon,
    title: "플레이어",
  },

  {
    href: "/guest",
    icon: MessageIcon,
    title: "채팅방",
  },

  {
    href: "/404",
    icon: AlertCircleIcon,
    title: "Error",
  },
];
const SideBar = (props) => {
  const location = useLocation();

  useEffect(() => {
    if (props.openMobile && props.onMobileClose) {
      props.onMobileClose();
    }
  }, [location.pathname]);

  const content = (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
      }}
    >
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          p: 2,
        }}
      >
        <Avatar
          component={RouterLink}
          src={user.avatar}
          sx={{
            cursor: "pointer",
            width: 64,
            height: 64,
          }}
          to="/profile"
        />
        <Typography color="textPrimary" variant="h5">
          {props.userInfo.userName}
        </Typography>
        <Typography color="textSecondary" variant="body2">
          {props.userInfo.nickname}
        </Typography>
      </Box>
      <Divider />
      <Box sx={{ p: 2 }}>
        <List>
          {items.map((item) => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          ))}
        </List>
      </Box>
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          onClose={props.onMobileClose}
          open={props.openMobile}
          variant="temporary"
          PaperProps={{
            sx: {
              width: 256,
            },
          }}
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden xlDown>
        <Drawer
          anchor="left"
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: 256,
              top: 64,
              height: "calc(100% - 64px)",
            },
          }}
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

export default SideBar;
