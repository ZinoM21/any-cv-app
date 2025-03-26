import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { ProfileData } from "@/lib/types";
import { formatDateRange } from "@/lib/utils";

export default function TheCreativeWebsite({
  profileData,
}: {
  profileData: Partial<ProfileData>;
}) {
  const {
    firstName,
    lastName,
    about,
    username,
    profilePictureUrl,
    headline,
    experiences,
    education,
    skills,
    volunteering,
  } = profileData;

  return (
    <main className="min-h-screen bg-white p-8 md:p-12 lg:p-16">
      <div className="max-w-7xl mx-auto grid md:grid-cols-[1fr_400px] gap-12">
        {/* Left Column */}
        <div>
          {/* Header */}
          <header className="mb-16">
            {profilePictureUrl && (
              <Image
                src={profilePictureUrl || "/placeholder.svg"}
                alt={`${firstName} ${lastName}`}
                width={120}
                height={120}
                className="rounded-full mb-4"
              />
            )}
            <h1 className="text-4xl font-bold mb-2">{`${firstName} ${lastName}`}</h1>
            {headline && <p className="text-xl text-gray-600">{headline}</p>}
          </header>

          {/* Experience */}
          {experiences && experiences.length > 0 && (
            <section className="mb-16">
              <h2 className="text-sm font-semibold text-gray-500 mb-6 uppercase">
                Experience
              </h2>
              {experiences.map((experience, expIndex) =>
                experience.positions.map((position, posIndex) => (
                  <div
                    key={`${expIndex}-${posIndex}`}
                    className="mb-8 last:mb-0"
                  >
                    <h3 className="text-xl font-semibold mb-1">{`${position.title}, ${experience.company}`}</h3>
                    <p className="text-gray-500 mb-2">
                      {formatDateRange(position.startDate, position.endDate)}
                    </p>
                    {position.description && (
                      <p className="text-gray-700 mb-2">
                        {position.description}
                      </p>
                    )}
                    <a
                      href={`/${expIndex}${posIndex}`}
                      className="text-blue-600 hover:underline inline-flex items-center"
                    >
                      View work <ArrowRight className="ml-1 h-4 w-4" />
                    </a>
                  </div>
                ))
              )}
            </section>
          )}

          {/* Education */}
          {education && education.length > 0 && (
            <section className="mb-16">
              <h2 className="text-sm font-semibold text-gray-500 mb-6 uppercase">
                Education
              </h2>
              {education.map((edu, index) => (
                <div key={index} className="mb-4">
                  <Image
                    src={
                      edu.schoolPictureUrl ||
                      "/placeholder.svg?height=52&width=84"
                    }
                    alt={edu.school}
                    width={84}
                    height={52}
                    className="mb-4"
                  />
                  <h3 className="text-xl font-semibold mb-1">{edu.school}</h3>
                  <p className="mb-1">
                    {edu.degree}
                    {edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ""}
                  </p>
                  <p className="text-gray-500 mb-4">
                    {formatDateRange(edu.startDate, edu.endDate)}
                  </p>
                  {edu.description && (
                    <p className="text-gray-700">{edu.description}</p>
                  )}
                </div>
              ))}
            </section>
          )}

          {/* Volunteering - New Section */}
          {volunteering && volunteering.length > 0 && (
            <section className="mb-16">
              <h2 className="text-sm font-semibold text-gray-500 mb-6 uppercase">
                Volunteering
              </h2>
              {volunteering.map((vol, index) => (
                <div key={index} className="mb-8 last:mb-0">
                  <h3 className="text-xl font-semibold mb-1">{`${vol.role}, ${vol.organization}`}</h3>
                  {vol.cause && (
                    <p className="text-gray-600 mb-1">{vol.cause}</p>
                  )}
                  <p className="text-gray-500 mb-2">
                    {formatDateRange(vol.startDate, vol.endDate)}
                  </p>
                  {vol.description && (
                    <p className="text-gray-700 mb-2">{vol.description}</p>
                  )}
                </div>
              ))}
            </section>
          )}
        </div>

        {/* Right Column */}
        <div className="bg-gray-100 p-8 rounded-lg">
          <section className="mb-12">
            <h2 className="text-sm font-semibold text-blue-600 mb-4 uppercase">
              About Me
            </h2>
            <p className="text-gray-700">
              {about || "No information provided."}
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-sm font-semibold text-blue-600 mb-4 uppercase">
              Expertise
            </h2>
            <ul className="space-y-2">
              {skills &&
                skills.map((skill, index) => (
                  <li key={index} className="flex items-center">
                    <ArrowRight className="h-4 w-4 mr-2 text-blue-600" />
                    <span>{skill}</span>
                  </li>
                ))}
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-sm font-semibold text-blue-600 mb-4 uppercase">
              Get in touch
            </h2>
            <ul className="space-y-2">
              <li>
                <a
                  href={`mailto:hey@${username}.com`}
                  className="flex items-center text-gray-700 hover:text-blue-600"
                >
                  <ArrowRight className="h-4 w-4 mr-2 text-blue-600" />
                  hey@{username}.com
                </a>
              </li>
              <li>
                <a
                  href={`https://twitter.com/${username}/`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-gray-700 hover:text-blue-600"
                >
                  <ArrowRight className="h-4 w-4 mr-2 text-blue-600" />
                  x.com/{username}
                </a>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </main>
  );
}
