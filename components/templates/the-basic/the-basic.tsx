import { ProfileData } from "@/lib/types";
import ContactLinks from "./components/contact-links";
import Section from "./components/section";
import Image from "next/image";

export default function TheBasic({
  profileData,
}: {
  profileData: ProfileData;
}) {
  const {
    firstName,
    lastName,
    jobTitle,
    about,
    experiences,
    education,
    skills,
    volunteering,
    profilePictureUrl,
  } = profileData;

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="bg-gradient-to-b from-indigo-100 to-white py-20 px-4 md:px-8">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
          <Image
            src={profilePictureUrl || "/avatar-placeholder.png"}
            alt="Your Name"
            width={200}
            height={200}
            className="rounded-full border-4 border-white shadow-lg mb-8"
          />
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
            {firstName} {lastName}
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 mb-8">{jobTitle}</p>
          <ContactLinks />
        </div>
      </section>
      <Section title="About Me">
        <p className="text-lg text-slate-600">{about}</p>
      </Section>
      <Section title="Experience">
        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <div key={index} className="border-l-4 border-primary pl-4">
              <h3 className="text-xl font-semibold text-slate-800">
                {exp.company}
              </h3>
              <div className="space-y-4">
                {exp.positions.map((position, posIndex) => (
                  <div key={posIndex} className="mt-2">
                    <h4 className="text-lg font-medium text-slate-800">
                      {position.title}
                    </h4>
                    <p className="text-slate-600">
                      {position.startDate} - {position.endDate || "Present"}{" "}
                      {position.location && `| ${position.location}`}
                    </p>
                    <p className="mt-2 text-slate-700">
                      {position.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>
      <Section title="Education">
        <div className="space-y-6">
          {education.map((edu, index) => (
            <div key={index}>
              <h3 className="text-xl font-semibold text-slate-800">
                {edu.degree}
              </h3>
              <p className="text-slate-600">
                {edu.school} | {edu.startDate} - {edu.endDate}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Skills">
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, index) => (
            <span
              key={index}
              className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm"
            >
              {skill}
            </span>
          ))}
        </div>
      </Section>

      <Section title="Volunteering">
        <div className="space-y-6">
          {volunteering.map((vol, index) => (
            <div key={index}>
              <h3 className="text-xl font-semibold text-slate-800">
                {vol.role}
              </h3>
              <p className="text-slate-600">
                {vol.organization} | {vol.startDate} - {vol.endDate}
              </p>
              <p className="mt-2 text-slate-700">{vol.description}</p>
            </div>
          ))}
        </div>
      </Section>
    </main>
  );
}
