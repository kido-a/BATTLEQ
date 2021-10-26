import {
  NavLink as RouterLink,
  matchPath,
  useLocation,
} from "react-router-dom";
import PropTypes from "prop-types";
import { Button, ListItem } from "@material-ui/core";

const NavItem = ({ href, icon: Icon, title, ...rest }) => {
  const location = useLocation();

  return (
    <ListItem
      disableGutters
      sx={{
        display: "flex",
        py: 0,
      }}
      {...rest}
    >
      <Button
        component={RouterLink}
        sx={{
          color: "text.secondary",
          fontWeight: "medium",
          justifyContent: "flex-start",
          letterSpacing: 0,
          py: 1.25,
          textTransform: "none",
          width: "100%",

          "& svg": {
            mr: 1,
          },
        }}
        to={href}
      >
        {Icon && <Icon size="20" />}
        <span>{title}</span>
      </Button>
    </ListItem>
  );
};

export default NavItem;
