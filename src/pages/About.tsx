import { Box, Stack, Typography } from "@mui/material";
import team from "../assets/team.svg";
import FullscreenBox from "../components/FullscreenBox";

export default function About() {
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
      >
        <img src={team} alt="The creators of Shopmania" style={{ maxWidth: 400 }} />

        <Box maxWidth="sm" marginTop={4}>
          <Typography component="h1" variant="h3" textAlign="center" fontWeight="bold">
            About Us
          </Typography>

          <Typography fontSize={18} marginTop={3} letterSpacing={1}>
            Welcome to Shopmania, the ultimate online shopping destination! Our mission is
            to provide you with a seamless and enjoyable shopping experience, where you
            can find everything you need in one place.
            <br />
            <br />
            At Shopmania, we believe that shopping should be easy, affordable, and fun.
            That's why we have carefully curated a selection of high-quality products from
            top brands and reliable suppliers, all at competitive prices.
            <br />
            <br />
            We are committed to providing top-notch customer service, and we strive to
            make your shopping experience as smooth and hassle-free as possible. Our
            website is easy to navigate, and our secure checkout process ensures that your
            personal and financial information is always protected.
          </Typography>
        </Box>
      </Stack>
    </FullscreenBox>
  );
}
