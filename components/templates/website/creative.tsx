import { SignedImage } from "@/components/editor-form/form-sections/signed-image";
import MadeWithBadge from "@/components/made-with-badge";
import { ProfileData } from "@/lib/types";
import { formatDateRange } from "@/lib/utils";
import { ArrowRight, Calendar, ExternalLink } from "lucide-react";

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
    email,
    phone,
    location,
    experiences,
    education,
    skills,
    languages,
    volunteering,
    projects,
  } = profileData;

  return (
    <main className="@container @3xl:p-12 @5xl:p-16 min-h-screen bg-background p-8">
      <div className="@3xl:grid-cols-[1fr_400px] mx-auto grid max-w-7xl gap-12">
        {/* Left Column */}
        <div>
          {/* Header */}
          <header className="mb-16">
            {profilePictureUrl && (
              <SignedImage
                src={profilePictureUrl}
                alt={`${firstName} ${lastName}`}
                width={120}
                height={120}
                className="mb-4 rounded-full"
              />
            )}
            <h1 className="mb-2 text-4xl font-bold">{`${firstName} ${lastName}`}</h1>
            {headline && (
              <p className="text-xl text-muted-foreground">{headline}</p>
            )}
            {location && (
              <p className="mt-2 text-sm text-muted-foreground">{location}</p>
            )}
          </header>

          {/* Projects */}
          {projects && projects.length > 0 && (
            <section className="mb-16">
              <h2 className="mb-6 text-sm font-semibold uppercase text-muted-foreground">
                Projects
              </h2>
              <div className="flex flex-wrap gap-8">
                {projects.map((project, index) => (
                  <div
                    key={index}
                    className="flex-1 rounded-lg bg-muted p-6 transition-shadow hover:shadow-md"
                  >
                    <div className="mb-2 flex flex-col items-start justify-between">
                      <h3 className="text-xl font-semibold">{project.title}</h3>
                      <span className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="mr-1 h-3 w-3" />
                        {formatDateRange(project.startDate, project.endDate)}
                      </span>
                    </div>

                    {project.associatedWith && (
                      <p className="mb-2 text-sm text-muted-foreground">
                        {project.associatedWith}
                      </p>
                    )}

                    {project.description && (
                      <p className="mb-3 text-muted-foreground">
                        {project.description}
                      </p>
                    )}

                    {project.url && (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 inline-flex items-center text-blue-600 hover:underline"
                      >
                        View Project <ExternalLink className="ml-1 h-3 w-3" />
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Experience */}
          {experiences && experiences.length > 0 && (
            <section className="mb-16">
              <h2 className="mb-6 text-sm font-semibold uppercase text-muted-foreground">
                Experience
              </h2>
              {experiences.map((experience, expIndex) =>
                experience.positions.map((position, posIndex) => (
                  <div
                    key={`${expIndex}-${posIndex}`}
                    className="mb-8 last:mb-0"
                  >
                    <h3 className="mb-1 text-xl font-semibold">{`${position.title}, ${experience.company}`}</h3>
                    <p className="mb-2 text-muted-foreground">
                      {formatDateRange(position.startDate, position.endDate)}
                    </p>
                    {position.description && (
                      <p className="mb-2 text-muted-foreground">
                        {position.description}
                      </p>
                    )}
                    {experience.companyProfileUrl && (
                      <a
                        href={experience.companyProfileUrl}
                        className="inline-flex items-center text-blue-600 hover:underline"
                      >
                        {experience.company} on LinkedIn
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </a>
                    )}
                  </div>
                )),
              )}
            </section>
          )}

          {/* Education */}
          {education && education.length > 0 && (
            <section className="mb-16">
              <h2 className="mb-6 text-sm font-semibold uppercase text-muted-foreground">
                Education
              </h2>
              {education.map((edu, index) => (
                <div key={index} className="mb-4">
                  <SignedImage
                    src={edu.schoolPictureUrl}
                    alt={edu.school}
                    width={84}
                    height={52}
                    className="mb-4"
                  />
                  <h3 className="mb-1 text-xl font-semibold">{edu.school}</h3>
                  <p className="mb-1">
                    {edu.degree}
                    {edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ""}
                  </p>
                  <p className="mb-4 text-muted-foreground">
                    {formatDateRange(edu.startDate, edu.endDate)}
                  </p>
                  {edu.description && (
                    <p className="text-muted-foreground">{edu.description}</p>
                  )}
                </div>
              ))}
            </section>
          )}

          {/* Volunteering */}
          {volunteering && volunteering.length > 0 && (
            <section className="mb-16">
              <h2 className="mb-6 text-sm font-semibold uppercase text-muted-foreground">
                Volunteering
              </h2>
              {volunteering.map((vol, index) => (
                <div key={index} className="mb-8 last:mb-0">
                  <h3 className="mb-1 text-xl font-semibold">{`${vol.role}, ${vol.organization}`}</h3>
                  {vol.cause && (
                    <p className="mb-1 text-muted-foreground">{vol.cause}</p>
                  )}
                  <p className="mb-2 text-muted-foreground">
                    {formatDateRange(vol.startDate, vol.endDate)}
                  </p>
                  {vol.description && (
                    <p className="mb-2 text-muted-foreground">
                      {vol.description}
                    </p>
                  )}
                </div>
              ))}
            </section>
          )}
        </div>

        {/* Right Column */}
        <div className="rounded-lg bg-muted p-8">
          <section className="mb-12">
            <h2 className="mb-4 text-sm font-semibold uppercase text-blue-600">
              About Me
            </h2>
            <p className="text-muted-foreground">
              {about || "No information provided."}
            </p>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-sm font-semibold uppercase text-blue-600">
              Expertise
            </h2>
            <ul className="space-y-2">
              {skills &&
                skills.map((skill, index) => (
                  <li key={index} className="flex items-center">
                    <ArrowRight className="mr-2 h-4 w-4 text-blue-600" />
                    <span>{skill}</span>
                  </li>
                ))}
            </ul>
          </section>

          {/* Languages Section */}
          {languages && languages.length > 0 && (
            <section className="mb-12">
              <h2 className="mb-4 text-sm font-semibold uppercase text-blue-600">
                Languages
              </h2>
              <ul className="space-y-2">
                {languages.map((language, index) => (
                  <li key={index} className="flex items-center">
                    <ArrowRight className="mr-2 h-4 w-4 text-blue-600" />
                    <span>{language}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section className="mb-12">
            <h2 className="mb-4 text-sm font-semibold uppercase text-blue-600">
              Get in touch
            </h2>
            <ul className="space-y-2">
              {email && (
                <li>
                  <a
                    href={`mailto:${email}`}
                    className="flex items-center text-muted-foreground hover:text-blue-600"
                  >
                    <ArrowRight className="mr-2 h-4 w-4 text-blue-600" />
                    {email}
                  </a>
                </li>
              )}
              {phone && (
                <li className="flex items-center text-muted-foreground">
                  <a
                    href={`tel:${phone}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-muted-foreground hover:text-blue-600"
                  >
                    <ArrowRight className="mr-2 h-4 w-4 text-blue-600" />
                    {phone}
                  </a>
                </li>
              )}
              {username && (
                <li>
                  <a
                    href={`https://linkedin.com/in/${username}/`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-muted-foreground hover:text-blue-600"
                  >
                    <ArrowRight className="mr-2 h-4 w-4 text-blue-600" />
                    linkedin.com/in/{username}
                  </a>
                </li>
              )}
            </ul>
          </section>
        </div>
      </div>
      <MadeWithBadge />
    </main>
  );
}
