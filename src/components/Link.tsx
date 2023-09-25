import { Link as MuiLink, type LinkProps as MuiLinkProps } from "@mui/material";
import {
  Link as RouterLink,
  type LinkProps as RouterLinkProps,
} from "react-router-dom";

type LinkProps = RouterLinkProps & MuiLinkProps;

export function Link(props: LinkProps) {
  return <MuiLink component={RouterLink} {...props} />;
}
