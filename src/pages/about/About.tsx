import "./About.css";

function About() {
  return (
    <div className="fullscreen">
      <h1 className="about-title">Shopmania</h1>

      <div className="about-description">
        <p>
          Shopmania is an Egyptian e-commerce store founded in 2023.
        </p>

        <p>
          Our customers trust the quality of our products and our fast delivery to deliver
          you the best possible online shopping experience.
        </p>
      </div>

      <p className="category-list-title">Our product catalog includes:</p>

      <ol className="product-category-list">
        <li>Electronics</li>
        <li>Jewlery</li>
        <li>Clothings for men and women</li>
      </ol>
    </div>
  );
}

export default About;
