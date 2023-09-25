import {
  Email as EmailIcon,
  ExpandMore as ExpandMoreIcon,
  Phone as PhoneIcon,
  Place as PlaceIcon,
} from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Container,
  Paper,
  Typography,
} from "@mui/material";
import { blue, green, red } from "@mui/material/colors";

export function Contact() {
  return (
    <Container maxWidth="md" sx={{ padding: 2 }}>
      <Typography
        component="h1"
        variant="h4"
        fontWeight="bold"
        textAlign="center"
        marginTop={2}
      >
        Contact Us
      </Typography>

      <Typography component="h2" variant="h5" textAlign="center" marginTop={3}>
        The best customer support at your service
      </Typography>

      <Box display="flex" justifyContent="center" flexWrap="wrap" marginTop={2}>
        <ContactCard
          icon={<PlaceIcon fontSize="large" htmlColor={green[400]} />}
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

      <Typography
        component="h1"
        variant="h4"
        fontWeight="bold"
        textAlign="center"
        marginTop={8}
      >
        Frequently Asked Questions
      </Typography>

      <Box marginTop={2}>
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
          title="Can I refund a damaged item?"
          description="We do not offer refunds for damaged items after the delivery courier leaves.
          Please check that the delivered item is in good condition at delivery time."
        />
      </Box>
    </Container>
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
        padding: 3,
        margin: 1,
        width: {
          xs: "80%",
          sm: 200,
        },
      }}
    >
      <Box display="flex" justifyContent="center">
        {props.icon}
      </Box>

      <Typography component="h3" variant="h6" textAlign="center" paddingTop={1}>
        {props.title}
      </Typography>

      <Typography textAlign="center" paddingTop={2}>
        {props.description}
      </Typography>
    </Paper>
  );
}

function FAQAccordion(props: { title: string; description: string }) {
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography fontSize={18}>{props.title}</Typography>
      </AccordionSummary>

      <AccordionDetails>
        <Typography variant="body1" color="text.secondary">
          {props.description}
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
}
