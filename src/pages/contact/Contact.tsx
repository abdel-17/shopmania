import "./Contact.css";
import agent from "../../assets/agent.svg";
import email from "../../assets/email.svg";
import location from "../../assets/location.svg";

function Contact() {
  return (
    <div className="fullscreen centered vertical">
      <h1>Contact Us</h1>

      <p className="contact-message">The best customer support at your service!</p>

      <div className="horizontal">
        <Location />
        <Phone />
        <Email />
      </div>
    </div>
  );
}

function Location() {
  return (
    <div className="contact-container">
      <img src={location} alt="address" />
      <div className="contact-method">Address</div>
      Mostafa Kamel
      <br />
      Alexandria, Egypt
    </div>
  );
}

function Phone() {
  return (
    <div className="contact-container">
      <img src={agent} alt="phone" />
      <div className="contact-method">Phone</div>
      19111
    </div>
  );
}

function Email() {
  return (
    <div className="contact-container">
      <img src={email} alt="email" />
      <div className="contact-method">Email</div>
      shopmania@gmail.com
    </div>
  );
}

export default Contact;
