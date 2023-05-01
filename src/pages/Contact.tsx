import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Container,
  Paper,
  Typography,
} from "@mui/material";
import {
  Place as LocationIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  ExpandMore as ExpandMoreIcon,
} from "@mui/icons-material";
import { green, blue, red } from "@mui/material/colors";

function Contact() {
  return (
    <Box display="flex" flexDirection="column" padding={2}>
      <Typography component="h1" variant="h4" textAlign="center" marginTop={2}>
        Contact Us
      </Typography>

      <Typography component="h2" variant="h5" textAlign="center" marginTop={4}>
        The best customer support at your service
      </Typography>

      <Box
        display="flex"
        flexDirection={{
          xs: "column",
          sm: "row",
        }}
        alignItems="center"
        justifyContent="center"
        marginTop={2}
      >
        <ContactCard
          icon={<LocationIcon fontSize="large" htmlColor={green[400]} />}
          title="Address"
          description="Lorem ipsum dolor"
        />
        <ContactCard
          icon={<PhoneIcon fontSize="large" htmlColor={blue[400]} />}
          title="Phone"
          description="+20 123 456 7890"
        />
        <ContactCard
          icon={<EmailIcon fontSize="large" htmlColor={red[400]} />}
          title="Email"
          description="lorem@ipsum.com"
        />
      </Box>

      <Typography component="h1" variant="h4" textAlign="center" marginTop={8}>
        Frequently Asked Questions
      </Typography>

      <Container maxWidth="md" sx={{ marginTop: 3 }}>
        <FAQAccordion
          title="Where do you deliver to?"
          description="We offer delivery to all governorates across Egypt."
        />
        <FAQAccordion
          title="How do I track my delivery?"
          description="The delivery courier will contact you to arrange the date of delivery.
          They will also contact you before they arrive at the specified delivery address."
        />
        <FAQAccordion
          title="What is your refund policy?"
          description="We offer refunds within the first 14 days of your purchase.
          If 14 days have passed since your purchase, you will not be offered a refund of any kind.
          The item must be unused and in the same condition that you received it in"
        />
        <FAQAccordion
          title="The item I received is damaged. Can I refund it?"
          description="We do not offer refunds for damaged items after the delivery courier has left.
          Please check that the item is in a good condition at delivery time."
        />
      </Container>
    </Box>
  );
}

function ContactCard(props: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <Paper
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: 200,
        height: 150,
        padding: 2,
        margin: 1,
      }}
    >
      {props.icon}

      <Typography component="h3" variant="h6" paddingTop={1}>
        {props.title}
      </Typography>

      <Typography paddingTop={2}>{props.description}</Typography>
    </Paper>
  );
}

function FAQAccordion(props: { title: string; description: string }) {
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography fontSize={18}>
          {props.title}
        </Typography>
      </AccordionSummary>

      <AccordionDetails>
        <Typography variant="body1" color="text.secondary">
          {props.description}
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
}

export default Contact;
