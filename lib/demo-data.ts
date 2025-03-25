import { ProfileData } from "./types";

export const demoData: ProfileData = {
  username: "johndoe123",
  firstName: "John",
  lastName: "Doe",
  profilePictureUrl: "",
  headline: "Software Engineer | Product Manager | Tech Enthusiast",
  about:
    "Passionate software engineer with 5+ years of experience building web and mobile applications. Currently focusing on AI-driven solutions.",
  experiences: [
    {
      company: "Tech Innovations Inc.",
      companyProfileUrl: "https://www.linkedin.com/company/tech-innovations/",
      companyLogoUrl: "",
      positions: [
        {
          title: "Senior Software Engineer",
          startDate: new Date("2023-01-15T00:00:00"),
          endDate: new Date("1970-01-01T00:00:00"),
          duration: "1 yr 2 mos",
          description:
            "Leading the development of the company's flagship product, a SaaS platform for business analytics. Implemented microservices architecture that improved system reliability by 40%. Mentored junior developers and conducted code reviews to ensure code quality. Collaborated with product and design teams to deliver features that increased user engagement by 25%.",
          location: "San Francisco, CA",
          workSetting: "hybrid",
        },
        {
          title: "Software Engineer",
          startDate: new Date("2021-03-10T00:00:00"),
          endDate: new Date("2023-01-14T00:00:00"),
          duration: "1 yr 10 mos",
          description:
            "Developed and maintained RESTful APIs using Node.js and Express. Built responsive front-end interfaces with React and TypeScript. Implemented automated testing that reduced bug reports by 30%. Participated in agile development processes including daily stand-ups and sprint planning.",
          location: "San Francisco, CA",
          workSetting: "remote",
        },
      ],
    },
    {
      company: "StartUp Solutions",
      companyProfileUrl: "https://www.linkedin.com/company/startup-solutions/",
      companyLogoUrl: "",
      positions: [
        {
          title: "Junior Developer",
          startDate: new Date("2019-06-01T00:00:00"),
          endDate: new Date("2021-03-01T00:00:00"),
          duration: "1 yr 9 mos",
          description:
            "Assisted in the development of web applications using JavaScript and PHP. Implemented UI components following design specifications. Participated in code reviews and bug fixing processes.",
          location: "Austin, TX",
          workSetting: "on-site",
        },
      ],
    },
  ],
  education: [
    {
      school: "Stanford University",
      schoolProfileUrl: "https://www.linkedin.com/school/stanford-university/",
      schoolPictureUrl: "",
      degree: "Master of Science - MS",
      fieldOfStudy: "Computer Science",
      startDate: new Date("2017-09-01T00:00:00"),
      endDate: new Date("2019-05-31T00:00:00"),
      grade: "3.9 GPA",
      activities:
        "Activities and societies: Artificial Intelligence Research Group, Hackathon Club, Teaching Assistant for Introduction to Machine Learning",
      description:
        "Specialized in Machine Learning and Distributed Systems. Thesis on 'Optimizing Neural Networks for Edge Computing Applications'",
    },
    {
      school: "University of Texas at Austin",
      schoolProfileUrl:
        "https://www.linkedin.com/school/university-of-texas-at-austin/",
      schoolPictureUrl: "",
      degree: "Bachelor of Science - BS",
      fieldOfStudy: "Computer Engineering",
      startDate: new Date("2013-08-15T00:00:00"),
      endDate: new Date("2017-05-20T00:00:00"),
      grade: "3.7 GPA",
      activities:
        "Activities and societies: ACM Student Chapter, Robotics Club, Undergraduate Research Assistant",
      description:
        "Coursework included Data Structures, Algorithms, Computer Architecture, and Software Engineering",
    },
  ],
  skills: [
    "JavaScript",
    "React",
    "Node.js",
    "TypeScript",
    "Python",
    "Machine Learning",
  ],
  volunteering: [
    {
      role: "Tech Mentor",
      organization: "Code for Good",
      organizationProfileUrl: "https://www.linkedin.com/company/code-for-good/",
      organizationLogoUrl: "",
      startDate: new Date("2020-06-15T00:00:00"),
      endDate: new Date("2022-12-20T00:00:00"),
      cause: "Education",
      description:
        "Mentored underrepresented youth in software development skills. Organized monthly workshops teaching web development basics. Helped develop curriculum for after-school coding programs reaching over 200 students annually.",
    },
  ],
};
