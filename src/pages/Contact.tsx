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
      <div className="contact-method">Phone</div>
      19111
    </div>
  );
}

function Email() {
  return (
    <div className="contact-container">
      <div className="contact-method">Email</div>
      shopmania@gmail.com
    </div>
  );
}

export default Contact;
