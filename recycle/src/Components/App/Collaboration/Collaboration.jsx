import HeaderGoBack from "../../Custom/HeaderGoBack";
import { faker } from "@faker-js/faker";

const Collaboration = () => {
  const generateFakeCompanies = (count) => {
    const companies = [];

    for (let i = 0; i < count; i++) {
      const name = faker.company.name();
      const contact = faker.phone.number();
      const address = faker.location.state();
      const email = faker.internet.email();

      companies.push({
        name,
        contact,
        address,
        email,
      });
    }

    return companies;
  };

  const companies = generateFakeCompanies(8);

  const output = companies.map((company, i) => (
    <li key={i}>
      <div>
        Company Name: <strong>{company.name}</strong>
      </div>
      <div>
        Email address <strong>{company.email}</strong>
      </div>
      <div>
        Contact: <strong>{company.contact}</strong>
      </div>
      <div>
        Office location: <strong>{company.address}</strong>
      </div>
    </li>
  ));

  return (
    <div className="collaborations">
      <HeaderGoBack h1="Collaborations" />
      <ul>{output}</ul>
    </div>
  );
};

export default Collaboration;
