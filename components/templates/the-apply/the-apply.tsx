import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { ProfileData } from "@/lib/types";
import { cn } from "@/lib/utils";
import { manrope } from "@/styles/fonts";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

export default function TheApply({
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
    <main
      className={cn(manrope.className, "grid md:grid-cols-[2fr_1fr] relative")}
    >
      {/* Left Column */}
      <div className="bg-white p-12 pt-16 relative">
        <div className="absolute top-0 left-0 right-0 h-[300px] bg-gradient-to-b from-blue-50/50 to-transparent -z-10 blur-3xl" />
        {/* Header */}
        <div>
          <Avatar className="mb-4 size-20">
            <AvatarImage src={profilePictureUrl} alt="Profile" />
            <AvatarFallback className="text-3xl">
              {firstName[0].toUpperCase()}
              {lastName[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <h1 className="text-4xl font-semibold mb-2">
            {firstName} {lastName}
          </h1>
          <p className="text-gray-500 font-medium text-xl">{jobTitle}</p>
        </div>

        <Separator className="my-8 bg-black" />

        {/* Experience */}
        <section>
          <h2 className="font-bold text-gray-500 mb-6 tracking-widest">
            EXPERIENCE
          </h2>

          <div className="space-y-16">
            {experiences.map((exp, index) =>
              exp.positions.map((position, posIndex) => (
                <div key={index + "-" + posIndex}>
                  <h3 className="text-xl font-medium mb-1">
                    {position.title}, {exp.company}
                  </h3>
                  <p className="mb-5 text-lg">
                    {position.startDate} - {position.endDate || "Present"}
                  </p>
                  {position.description && (
                    <p className="mb-2">{position.description}</p>
                  )}
                </div>
              ))
            )}
          </div>
        </section>

        <Separator className="my-8 bg-black" />

        {/* Education */}
        <section>
          <h2 className="font-bold text-gray-500 mb-6 tracking-widest">
            EDUCATION
          </h2>
          <div className="space-y-12">
            {education.map((edu, index) => (
              <div key={index}>
                {edu.schoolPictureUrl && (
                  <Image
                    src={edu.schoolPictureUrl}
                    alt={edu.school}
                    width={48}
                    height={48}
                    className="mb-4"
                  />
                )}
                <h3 className="text-xl font-medium mb-1">{edu.school}</h3>
                <p className="text-lg mb-5">
                  {edu.degree}
                  {edu.fieldOfStudy && ", " + edu.fieldOfStudy}
                  {edu.grade && ", " + edu.grade}
                </p>
                <p className="mb-5 text-lg">
                  {edu.startDate} - {edu.endDate || "Present"}
                </p>
                <p className="mb-2">
                  {edu.description}
                  <br />
                  {edu.activities}
                </p>
              </div>
            ))}
          </div>
        </section>

        <Separator className="my-8 bg-black" />

        {/* Recognition */}
        <section>
          <h2 className="font-bold text-gray-500 mb-6 tracking-widest">
            VOLUNTEERING
          </h2>
          <ul className="space-y-2">
            {volunteering.map((vol, index) => (
              <li key={index} className="flex items-center">
                <ArrowRight className="h-4 w-4 mr-2" />
                <a href="#" className="hover:underline">
                  {vol.role}, {vol.organization}
                </a>
                <span className="text-gray-500 ml-2">
                  {vol.startDate} " - " {vol.endDate || "Present"}
                </span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* Right Column */}
      <div className="bg-black text-white p-12 sticky top-0 h-screen overflow-y-auto">
        {/* About */}
        <section className="mb-16">
          <h2 className="font-bold text-gray-500 mb-6 tracking-widest">
            ABOUT ME
          </h2>
          <p>{about}</p>
        </section>

        {/* Expertise */}
        <section className="mb-16">
          <h2 className="font-bold text-gray-500 mb-6 tracking-widest">
            EXPERTISE
          </h2>
          <ul className="space-y-2">
            {skills.slice(0, 6).map((skill) => (
              <li key={skill} className="flex items-center">
                <ArrowRight className="h-4 w-4 mr-2" />
                <span>{skill}</span>
              </li>
            ))}
            {skills.length > 6 && (
              <li className="flex items-center">
                <span>...</span>
              </li>
            )}
          </ul>
        </section>

        {/* Contact */}
        <section className="mb-16">
          <h2 className="font-bold text-gray-500 mb-6 tracking-widest">
            GET IN TOUCH
          </h2>
          <ul className="space-y-2">
            <li>
              <a
                href="mailto:hey@mattdowney.com"
                className="flex items-center hover:text-gray-300"
              >
                <ArrowRight className="h-4 w-4 mr-2" />
                hey@example.com
              </a>
            </li>
            <li>
              <a
                href="https://x.com/mattdowney"
                className="flex items-center hover:text-gray-300"
              >
                <ArrowRight className="h-4 w-4 mr-2" />
                x.com/example
              </a>
            </li>
          </ul>
        </section>
      </div>
    </main>
  );
}
