import { Stack, Typography } from "@mui/material";

import TeamIcon from "../assets/team.svg?react";

export function About() {
  return (
    <Stack
      className="fullscreen"
      direction={{
        xs: "column",
        md: "row-reverse",
      }}
      alignItems="center"
      justifyContent="center"
      padding={3}
      spacing={4}
    >
      <TeamIcon style={{ maxWidth: 300 }} />

      <div>
        <Typography
          component="h1"
          variant="h4"
          textAlign="center"
          fontWeight="bold"
        >
          About Us
        </Typography>

        <Typography maxWidth="sm" variant="body1" marginTop={2}>
          Welcome to Shopmania, the ultimate online shopping destination! Our
          mission is to provide you with a seamless and enjoyable shopping
          experience, where you can find everything you need in one place.
          <br />
          <br />
          At Shopmania, we believe that shopping should be easy, affordable, and
          fun. That's why we have carefully curated a selection of high-quality
          products from top brands and reliable suppliers, all at competitive
          prices.
          <br />
          <br />
          We are committed to providing top-notch customer service, and we
          strive to make your shopping experience as smooth and hassle-free as
          possible. Our website is easy to navigate, and our secure checkout
          process ensures that your personal and financial information is always
          protected.
        </Typography>
      </div>
    </Stack>
  );
}
