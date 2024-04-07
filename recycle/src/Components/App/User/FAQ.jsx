import HeaderGoBack from "../../Custom/HeaderGoBack";
import { faker } from "@faker-js/faker";

const Faq = () => {
  const name = faker.company.name();
  const phone = faker.phone.number();
  const email = faker.internet.email();
  const country = faker.location.country();
  const state = faker.location.state();
  const addy = faker.location.streetAddress();

  return (
    <div className="faq-container">
      <HeaderGoBack h1="(FAQ)" />
      <div className="faq-div">
        <div className="faq-item">
          <details>
            <summary>1. How does the website work?</summary>
            <p>
              Our website is designed to make recycling easy and rewarding. You
              can start by signing up for an account, then browse through the
              available recycling categories to find items you want to recycle.
              Once you&apos;ve collected your recyclables, you can bring them to
              one of our designated drop-off locations or schedule a pickup.
              We&apos;ll take care of the rest!
            </p>
          </details>
        </div>
        <div className="faq-item">
          <details>
            <summary>2. How can I earn points by recycling an item?</summary>
            <p>
              When you recycle an item through our platform, you earn points
              based on the type and quantity of recyclables you submit. These
              points can be redeemed for rewards such as discounts on
              eco-friendly products, vouchers for local businesses, or even
              donations to environmental causes.
            </p>
          </details>
        </div>
        <div className="faq-item">
          <details>
            <summary>3. What types of items can I recycle?</summary>
            <p>
              We accept a wide range of recyclable materials, including paper,
              cardboard, plastics, glass, aluminum cans, and electronic waste
              (e-waste). Each category may have specific guidelines for
              acceptable items, so be sure to check our website or contact us
              for more information.
            </p>
          </details>
        </div>
        <div className="faq-item">
          <details>
            <summary>
              4. Do I need to clean or sort my recyclables before dropping them
              off?
            </summary>
            <p>
              While it&apos;s helpful to rinse out containers and remove any
              food residue, it&apos;s not always necessary. However, sorting
              your recyclables into different categories can streamline the
              recycling process and ensure that each material is properly
              processed. Check our guidelines for tips on sorting recyclables.
            </p>
          </details>
        </div>
        <div className="faq-item">
          <details>
            <summary>5. What happens to the items I recycle?</summary>
            <p>
              Once you drop off your recyclables, they are collected and
              transported to our recycling facilities. From there, materials are
              sorted, processed, and sent to recycling plants where they are
              transformed into new products. By recycling with us, you&apos;re
              helping to conserve resources, reduce waste, and protect the
              environment.
            </p>
          </details>
        </div>
        <div className="faq-item">
          <details>
            <summary>
              6. Can I track my recycling progress or see how many points
              I&apos;ve earned?
            </summary>
            <p>
              Yes! Our website provides tools and features that allow you to
              track your recycling activity, view your points balance, and see
              the impact of your contributions to sustainability. Simply log in
              to your account to access these features.
            </p>
          </details>
        </div>
        <div className="faq-item">
          <details>
            <summary>
              7. What should I do with items that can&apos;t be recycled?
            </summary>
            <p>
              If you have items that cannot be recycled through our program, we
              encourage you to explore alternative disposal options. This may
              include donating usable items to charity, participating in special
              collection events for hazardous materials, or properly disposing
              of items in accordance with local regulations.
            </p>
          </details>
        </div>
        <div className="faq-item">
          <details>
            <summary>
              8. How can I get involved in community clean-up events or other
              eco-friendly initiatives?
            </summary>
            <p>
              We regularly organize community clean-up events, educational
              workshops, and other activities to promote environmental awareness
              and encourage sustainable practices. Keep an eye on our website
              and social media channels for upcoming events and opportunities to
              get involved!
            </p>
          </details>
        </div>
        <div className="faq-item">
          <details>
            <summary>
              9. What measures do you take to ensure responsible recycling
              practices?
            </summary>
            <p>
              We are committed to upholding the highest standards of
              environmental stewardship and ethical business practices. Our
              recycling facilities comply with all relevant regulations and
              industry standards, and we work closely with certified partners to
              responsibly manage recyclable materials.
            </p>
          </details>
        </div>
        <div className="faq-item">
          <details>
            <summary>
              10. How can I contact customer support if I have additional
              questions or need assistance?
            </summary>
            <p>
              If you have any further questions or require assistance, our
              dedicated customer support team is here to help! You can reach us
              by phone, email, or through our website&apos;s live chat feature.
              We&apos;re always happy to assist you with any inquiries or
              concerns you may have.
            </p>
          </details>
        </div>
      </div>
      <div className="support">
        <h3>Support</h3>
        <ul>
          <li>
            Company Name: <strong>{name}</strong>
          </li>
          <li>
            Company no: <strong>{phone}</strong>
          </li>
          <li>
            Company email: <strong>{email}</strong>
          </li>
          <li>
            Address:{" "}
            <strong>
              {addy}
              {state}
              {country}
            </strong>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Faq;
