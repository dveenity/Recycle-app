import HeaderGoBack from "../../Custom/HeaderGoBack";

const Collaboration = () => {
  const companies = [
    {
      type: "Manufacturing",
      name: "OptiPro Manufacturing Solutions",
      email: "contact@optipromfg.com",
      contact: "+1 (824) 952- 8240",
      location: "123 Main Street, Richmond, VA 23220, United States",
    },
    {
      type: "Automotive",
      name: "DriveTech Innovations",
      email: "info@drivetechauto.com",
      contact: "+44 20 1234 5678",
      location: "142 Regent Street, London, W1B 4AB, United Kingdom",
    },
    {
      type: "Healthcare",
      name: "MediSim Technologies",
      email: "info@medisimtech.com",
      contact: "+44 161 234 5678",
      location: "112 Oxford Street, Manchester, M1 5AN, United Kingdom",
    },
    {
      type: "Aerospace",
      name: "AeroSys Dynamics",
      email: "contact@aerosysdynamics.com",
      contact: "+44 115 234 5678",
      location: "456 Sherwood Street, Nottingham, NG2 3CD, United Kingdom",
    },
    {
      type: "Energy",
      name: "EnerOpt Solutions",
      email: "info@eneroptsolutions.com",
      contact: "+1 (907) 555-1234",
      location: "456 Elm Avenue, Fairbanks, AK 99701, United States",
    },
    {
      type: "Construction",
      name: "BuildSmart Engineering",
      email: "contact@buildsmarteng.com",
      contact: "+1 (512) 555-6789",
      location: "789 Oak Street, Houston, TX 77002, United States",
    },
    {
      type: "Smart Cities",
      name: "UrbanTech Solutions",
      email: "info@urbantechsolutions.com",
      contact: "+44 1582 987654",
      location: "45 Maple Road, Luton, LU4 8AW, United Kingdom",
    },
    {
      type: "Utilities",
      name: "UtilityOpti Systems",
      email: "contact@utilityoptisystems.com",
      contact: "+44 121 303 1111",
      location: "456 Broad Street, Birmingham, B2 4JH, United Kingdom",
    },
  ];

  const output = companies.map((company, i) => (
    <li key={i}>
      <h2>{company.type}</h2>
      <div>
        Company Name: <strong>{company.name}</strong>
      </div>
      <div>
        Email: <strong>{company.email}</strong>
      </div>
      <div>
        Contact: <strong>{company.contact}</strong>
      </div>
      <div>
        Location: <strong>{company.location}</strong>
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
