import { Box, Stack, Typography } from "@mui/material";
import team from "../assets/team.svg";
import FullscreenBox from "../components/FullscreenBox";

function About() {
  return (
    <FullscreenBox display="flex" flexDirection="column" justifyContent="center">
      <Stack
        direction={{
          xs: "column",
          lg: "row-reverse",
        }}
        alignItems="center"
        justifyContent="center"
        margin={4}
        spacing={8}
      >
        <img src={team} alt="team" style={{ maxWidth: 400 }} />

        <Box maxWidth="sm">
          <Typography component="h1" variant="h3" textAlign="center" fontWeight="bold">
            About Us
          </Typography>

          <Typography fontSize={18} marginTop={2} textAlign="justify">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Vel facilisis volutpat est velit.
            Consequat id porta nibh venenatis cras. Vel orci porta non pulvinar neque
            laoreet suspendisse interdum consectetur. Scelerisque fermentum dui faucibus
            in ornare quam viverra orci. Feugiat scelerisque varius morbi enim nunc
            faucibus a pellentesque sit. Morbi quis commodo odio aenean sed. Duis
            tristique sollicitudin nibh sit amet commodo nulla facilisi nullam. Vitae
            auctor eu augue ut. Tempus egestas sed sed risus pretium quam vulputate
            dignissim. In egestas erat imperdiet sed euismod nisi. Adipiscing elit ut
            aliquam purus sit amet luctus. Fames ac turpis egestas integer eget aliquet
            nibh.
          </Typography>
        </Box>
      </Stack>
    </FullscreenBox>
  );
}

export default About;
