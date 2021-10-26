import { styled } from "@material-ui/core/styles";
const LayoutRoot = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.default,

  display: "flex",
  height: "100%",
  overflow: "hidden",
  width: "100%",
}));

export default LayoutRoot;
