import { Image } from "@/components/editor-form/form-sections/image";
import { Button } from "@/components/ui/button";
import { ProfileData } from "@/lib/types";
import { formatDateRange } from "@/lib/utils";
import { Calendar, ExternalLink } from "lucide-react";
import Link from "next/link";

export default function TheModernWebsite({
  profileData
}: {
  profileData: Partial<ProfileData>;
}) {
  const {
    firstName,
    lastName,
    about,
    profilePictureUrl,
    headline,
    email,
    phone,
    location,
    experiences,
    education,
    skills,
    projects,
    publishingOptions
  } = profileData;

  return (
    <main className="mt-16 min-h-screen bg-background">
      {/* Hero Section */}
      <section className="flex min-h-screen flex-col bg-background">
        <div className="container relative mx-auto flex flex-1 flex-col px-4 pb-16 pt-28 text-center">
          <div>
            <h3 className="mb-2 text-xl font-bold text-violet-600 md:text-2xl">
              {`${firstName} ${lastName}`}
            </h3>
            <h1 className="mb-4 text-3xl font-extrabold text-foreground md:text-5xl">
              {headline
                ? headline.split(" ").slice(0, 12).join(" ")
                : `${firstName} ${lastName}, Developer`}
            </h1>
            <p className="mx-auto max-w-3xl px-2 text-sm text-muted-foreground md:px-0 md:text-base">
              {location ||
                "Mission-driven full stack developer with a passion for thoughtful UI design, collaboration, and teaching."}
            </p>

            {/* Profile Image */}
            <div className="mb-8 mt-10 md:mt-16">
              <div className="mx-auto h-48 w-48 overflow-hidden rounded-full bg-violet-600 md:h-60 md:w-60">
                {profilePictureUrl && (
                  <Image
                    slug={publishingOptions?.slug}
                    src={profilePictureUrl}
                    alt={`${firstName} ${lastName}`}
                    className="h-full w-full object-cover"
                  />
                )}
              </div>
            </div>

            {/* Contact Info with Separator */}
            <div className="mt-8 flex flex-col items-center justify-center space-y-4 md:mt-12 md:flex-row md:space-y-0">
              <div className="text-center">
                <h3 className="mb-1 text-lg text-foreground md:text-xl">
                  Phone
                </h3>
                <p className="text-sm text-muted-foreground md:text-base">
                  {phone || "Not provided"}
                </p>
              </div>

              <div className="mx-8 hidden h-7 w-px bg-muted md:block"></div>
              <div className="my-2 block h-px w-24 bg-muted md:hidden"></div>

              <div className="text-center">
                <h3 className="mb-1 text-lg text-foreground md:text-xl">
                  Email
                </h3>
                <p className="text-sm text-muted-foreground md:text-base">
                  {email || "Not provided"}
                </p>
              </div>
            </div>
          </div>

          {/* "Scroll to see experience" text at bottom */}
          <h2 className="absolute bottom-24 left-0 right-0 text-center text-xl font-extrabold text-foreground md:bottom-48 md:text-2xl">
            &quot;SCROLL TO SEE EXPERIENCE&quot;
          </h2>
        </div>
      </section>

      {/* About Section */}
      <section className="bg-background py-10 md:py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 text-xl font-extrabold md:text-2xl">
            <span className="text-foreground">Hi, </span>
            <span className="text-violet-600">I&apos;m {firstName}</span>
            <span className="text-foreground">. Nice to meet you.</span>
          </h2>
          <p className="mx-auto max-w-xl px-2 text-sm leading-loose text-muted-foreground md:px-0 md:text-base">
            {about || "No information provided."}
          </p>
        </div>
      </section>

      {/* Experience Section */}
      <section className="bg-background py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-6 text-center text-xl font-extrabold text-foreground md:text-2xl">
            EXPERIENCE
          </h2>
          <div className="mb-10 h-px bg-muted md:mb-16"></div>

          {experiences && experiences.length > 0 ? (
            <div className="mx-auto max-w-5xl">
              {experiences.map((experience, expIndex) =>
                experience.positions.map((position, posIndex) => (
                  <div
                    key={`${expIndex}-${posIndex}`}
                    className="relative mb-8 flex flex-col md:mb-10 md:flex-row"
                  >
                    <div className="mb-4 w-full space-y-2 text-left md:mb-0 md:w-1/3 md:pr-8 md:text-right">
                      <h3 className="text-base leading-loose text-foreground md:text-xl">
                        {formatDateRange(position.startDate, position.endDate)}
                      </h3>
                      <p className="text-sm leading-loose text-muted-foreground md:text-base">
                        {position.title}
                      </p>
                    </div>

                    <div className="relative hidden md:block">
                      <div className="absolute -left-1 top-3 h-2 w-2 rounded-full bg-violet-600"></div>
                      <div className="absolute left-0 top-5 h-32 w-px bg-muted"></div>
                    </div>

                    <div className="w-full space-y-2 whitespace-nowrap md:w-2/3 md:pl-8">
                      <div className="flex items-baseline gap-4">
                        <h3 className="text-base text-foreground md:text-xl">
                          {experience.company}
                        </h3>
                        {(position.location || position.workSetting) && (
                          <div className="flex items-baseline gap-1">
                            {position.location && (
                              <p className="text-sm text-muted-foreground md:text-base">
                                {position.location}
                              </p>
                            )}

                            {position.workSetting && (
                              <p className="text-sm text-muted-foreground md:text-base">
                                {" · "}
                                {position.workSetting}
                              </p>
                            )}
                          </div>
                        )}
                        {experience.companyProfileUrl && (
                          <Button variant="link" asChild>
                            <Link href={experience.companyProfileUrl}>
                              Visit
                              <ExternalLink className="ml-1 size-3 md:size-4" />
                            </Link>
                          </Button>
                        )}
                      </div>
                      {position.description && (
                        <p className="whitespace-normal text-sm leading-loose text-muted-foreground md:text-base">
                          {position.description}
                        </p>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          ) : (
            <p className="text-center text-muted-foreground">
              No experience information provided.
            </p>
          )}
        </div>
      </section>

      {/* Skills Section */}
      <section className="bg-background py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-6 text-center text-xl font-extrabold text-foreground md:text-2xl">
            SKILLS
          </h2>
          <div className="mb-10 h-px bg-muted md:mb-16"></div>

          {skills && skills.length > 0 ? (
            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
              {skills.map((skill, index) => (
                <div key={index} className="h-16">
                  <div className="text-sm leading-loose text-foreground md:text-base">
                    {skill}
                  </div>
                  <div className="relative mt-2 h-1.5 w-full rounded-full bg-muted">
                    <div
                      className="absolute left-0 top-0 h-1.5 rounded-full bg-violet-600"
                      style={{
                        width: `${Math.min(80 + Math.random() * 20, 100)}%`
                      }}
                    ></div>
                  </div>
                  <div className="mt-1 text-right text-sm text-muted-foreground md:text-base">
                    {Math.floor(80 + Math.random() * 20)}%
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground">
              No skills information provided.
            </p>
          )}
        </div>
      </section>

      {/* Education Section */}
      <section className="bg-muted py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-6 text-center text-xl font-extrabold text-foreground md:text-2xl">
            EDUCATION
          </h2>
          <div className="mb-10 h-px bg-muted md:mb-16"></div>

          {education && education.length > 0 ? (
            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 md:grid-cols-3 md:gap-12">
              {education.map((edu, index) => (
                <div key={index} className="relative">
                  <div className="text-base leading-loose text-foreground md:text-xl">
                    {formatDateRange(edu.startDate, edu.endDate)}
                  </div>
                  <div className="min-h-[3.5rem] text-sm leading-loose text-muted-foreground md:text-base">
                    {edu.degree}
                    {edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ""}
                  </div>

                  {/* Timeline dot and line */}
                  <div className="h-2 w-full">
                    <div className="relative">
                      <div className="absolute left-0 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-violet-600"></div>
                      <div className="absolute left-4 top-1/2 h-px w-full -translate-y-1/2 bg-muted-foreground"></div>
                    </div>
                  </div>

                  <div className="mt-4 text-base leading-loose text-foreground md:text-xl">
                    {edu.school}
                  </div>

                  {edu.description && (
                    <p className="mt-4 text-sm leading-loose text-muted-foreground md:text-base">
                      {edu.description}
                    </p>
                  )}

                  {edu.activities && (
                    <p className="mt-4 text-sm leading-loose text-muted-foreground md:text-base">
                      Activities: {edu.activities}
                    </p>
                  )}

                  {edu.grade && (
                    <p className="mt-4 text-sm leading-loose text-muted-foreground md:text-base">
                      Grade: {edu.grade}
                    </p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground">
              No education information provided.
            </p>
          )}
        </div>
      </section>

      {/* Projects Section */}
      {projects && projects.length > 0 && (
        <section className="bg-background py-12 md:py-16">
          <div className="container mx-auto px-4">
            <h2 className="mb-6 text-center text-xl font-extrabold text-foreground md:text-2xl">
              PROJECTS
            </h2>
            <div className="mb-10 h-px bg-muted md:mb-16"></div>

            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
              {projects.map((project, index) => (
                <div key={index} className="flex flex-col">
                  {/* Project Title */}
                  <h3 className="mb-3 text-lg font-semibold text-foreground md:text-xl">
                    {project.title}
                  </h3>

                  {/* Project Thumbnail */}
                  <div className="relative overflow-hidden rounded-xl">
                    <div className="aspect-video bg-muted">
                      {project.thumbnail && (
                        <Image
                          slug={publishingOptions?.slug}
                          src={project.thumbnail}
                          alt={project.title}
                          width={356}
                          height={241}
                          className="h-full w-full"
                        />
                      )}
                    </div>
                  </div>

                  {/* Project Details - Always Visible */}
                  <div className="mt-4 rounded-xl bg-muted p-4 md:p-6">
                    <div className="mb-3 flex items-center">
                      <Calendar className="mr-2 h-3 w-3 text-violet-600 md:h-4 md:w-4" />
                      <span className="text-xs text-muted-foreground md:text-sm">
                        {formatDateRange(project.startDate, project.endDate)}
                      </span>
                    </div>

                    {project.associatedWith && (
                      <div className="mb-3 text-xs text-muted-foreground md:text-sm">
                        Associated with: {project.associatedWith}
                      </div>
                    )}

                    {project.description && (
                      <p className="mb-4 text-sm leading-relaxed text-muted-foreground md:text-base">
                        {project.description}
                      </p>
                    )}

                    {project.url && (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-sm text-violet-600 transition-colors hover:text-violet-800 md:text-base"
                      >
                        View Project
                        <ExternalLink className="ml-1 h-3 w-3 md:ml-2 md:h-4 md:w-4" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
