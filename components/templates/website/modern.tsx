import { PublicImage } from "@/components/editor-form/form-sections/public-image";
import { SignedImage } from "@/components/editor-form/form-sections/signed-image";
import { ProfileData } from "@/lib/types";
import { formatDateRange } from "@/lib/utils";
import { Calendar, ExternalLink } from "lucide-react";

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
    <main className="mt-16 min-h-screen bg-white">
      {/* Hero Section */}
      <section className="flex min-h-screen flex-col bg-white">
        <div className="container relative mx-auto flex flex-1 flex-col px-4 pb-16 pt-28 text-center">
          <div>
            <h3 className="mb-2 text-2xl font-bold text-violet-600">
              {`${firstName} ${lastName}`}
            </h3>
            <h1 className="mb-4 text-5xl font-extrabold text-slate-800">
              {headline || `${firstName} ${lastName}, Developer`}
            </h1>
            <p className="mx-auto max-w-3xl text-base text-slate-500">
              {location ||
                "Mission-driven full stack developer with a passion for thoughtful UI design, collaboration, and teaching."}
            </p>

            {/* Profile Image */}
            <div className="mb-8 mt-16">
              <div className="mx-auto h-60 w-60 overflow-hidden rounded-full bg-violet-600">
                {profilePictureUrl &&
                  (publishingOptions?.slug ? (
                    <PublicImage
                      slug={publishingOptions.slug}
                      path={profilePictureUrl}
                      alt={`${firstName} ${lastName}`}
                      width={240}
                      height={240}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <SignedImage
                      path={profilePictureUrl}
                      alt={`${firstName} ${lastName}`}
                      width={240}
                      height={240}
                      className="h-full w-full object-cover"
                    />
                  ))}
              </div>
            </div>

            {/* Contact Info with Separator */}
            <div className="mt-12 flex items-center justify-center">
              <div className="text-center">
                <h3 className="mb-1 text-xl text-slate-800">Phone</h3>
                <p className="text-slate-500">{phone || "Not provided"}</p>
              </div>

              <div className="mx-8 h-7 w-px bg-zinc-300"></div>

              <div className="text-center">
                <h3 className="mb-1 text-xl text-slate-800">Email</h3>
                <p className="text-slate-500">{email || "Not provided"}</p>
              </div>
            </div>
          </div>

          {/* "Scroll to see experience" text at bottom */}
          <h2 className="absolute bottom-48 left-0 right-0 text-center text-2xl font-extrabold text-slate-800">
            &quot;SCROLL TO SEE EXPERIENCE&quot;
          </h2>
        </div>
      </section>

      {/* About Section */}
      <section className="bg-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 text-2xl font-extrabold">
            <span className="text-slate-800">Hi, </span>
            <span className="text-violet-600">I&apos;m {firstName}</span>
            <span className="text-slate-800">. Nice to meet you.</span>
          </h2>
          <p className="mx-auto max-w-xl text-base leading-loose text-slate-500">
            {about || "No information provided."}
          </p>
        </div>
      </section>

      {/* Experience Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-6 text-center text-2xl font-extrabold text-slate-800">
            EXPERIENCE
          </h2>
          <div className="mb-16 h-px bg-slate-200"></div>

          {experiences && experiences.length > 0 ? (
            <div className="mx-auto max-w-5xl">
              {experiences.map((experience, expIndex) =>
                experience.positions.map((position, posIndex) => (
                  <div
                    key={`${expIndex}-${posIndex}`}
                    className="relative mb-16 flex"
                  >
                    <div className="w-1/3 pr-8 text-right">
                      <h3 className="text-xl leading-loose text-slate-800">
                        {formatDateRange(position.startDate, position.endDate)}
                      </h3>
                      <p className="text-base leading-loose text-slate-500">
                        {position.title}
                      </p>
                    </div>

                    <div className="relative">
                      <div className="absolute -left-1 top-3 h-2 w-2 rounded-full bg-violet-600"></div>
                      <div className="absolute left-0 top-5 h-32 w-px bg-zinc-300"></div>
                    </div>

                    <div className="w-2/3 pl-8">
                      <h3 className="text-xl leading-loose text-slate-800">
                        {experience.company}
                      </h3>
                      <p className="text-base leading-loose text-slate-500">
                        {position.description || "No description provided."}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          ) : (
            <p className="text-center text-slate-500">
              No experience information provided.
            </p>
          )}
        </div>
      </section>

      {/* Skills Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-6 text-center text-2xl font-extrabold text-slate-800">
            SKILLS
          </h2>
          <div className="mb-16 h-px bg-slate-200"></div>

          {skills && skills.length > 0 ? (
            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2">
              {skills.map((skill, index) => (
                <div key={index} className="h-16">
                  <div className="text-base leading-loose text-slate-800">
                    {skill}
                  </div>
                  <div className="relative mt-2 h-1.5 w-full rounded-full bg-gray-200">
                    <div
                      className="absolute left-0 top-0 h-1.5 rounded-full bg-violet-600"
                      style={{
                        width: `${Math.min(80 + Math.random() * 20, 100)}%`
                      }}
                    ></div>
                  </div>
                  <div className="mt-1 text-right text-base text-slate-500">
                    {Math.floor(80 + Math.random() * 20)}%
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-slate-500">
              No skills information provided.
            </p>
          )}
        </div>
      </section>

      {/* Education Section */}
      <section className="bg-slate-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-6 text-center text-2xl font-extrabold text-slate-800">
            EDUCATION
          </h2>
          <div className="mb-16 h-px bg-slate-200"></div>

          {education && education.length > 0 ? (
            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 md:grid-cols-3">
              {education.map((edu, index) => (
                <div key={index} className="relative">
                  <div className="text-xl leading-loose text-slate-800">
                    {formatDateRange(edu.startDate, edu.endDate)}
                  </div>
                  <div className="h-14 text-base leading-loose text-slate-500">
                    {edu.degree}
                    {edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ""}
                  </div>

                  {/* Timeline dot and line */}
                  <div className="h-2 w-full">
                    <div className="relative">
                      <div className="absolute left-0 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-violet-600"></div>
                      <div className="absolute left-4 top-1/2 h-px w-full -translate-y-1/2 bg-zinc-300"></div>
                    </div>
                  </div>

                  <div className="mt-4 text-xl leading-loose text-slate-800">
                    {edu.school}
                  </div>

                  {edu.description && (
                    <p className="mt-4 text-base leading-loose text-slate-500">
                      {edu.description}
                    </p>
                  )}

                  {edu.activities && (
                    <p className="mt-4 text-base leading-loose text-slate-500">
                      {edu.activities}
                    </p>
                  )}

                  {edu.grade && (
                    <p className="mt-4 text-base leading-loose text-slate-500">
                      {edu.grade}
                    </p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-slate-500">
              No education information provided.
            </p>
          )}
        </div>
      </section>

      {/* Projects Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-6 text-center text-2xl font-extrabold text-slate-800">
            PROJECTS
          </h2>
          <div className="mb-16 h-px bg-slate-200"></div>

          {projects && projects.length > 0 ? (
            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-3">
              {projects.map((project, index) => (
                <div key={index} className="flex flex-col">
                  {/* Project Title */}
                  <h3 className="mb-3 text-xl font-semibold text-slate-800">
                    {project.title}
                  </h3>

                  {/* Project Thumbnail */}
                  <div className="relative overflow-hidden rounded-xl">
                    <div className="aspect-video bg-slate-200">
                      {project.thumbnail &&
                        (publishingOptions?.slug ? (
                          <PublicImage
                            slug={publishingOptions.slug}
                            path={project.thumbnail}
                            alt={project.title}
                            width={356}
                            height={241}
                            className="h-full w-full"
                          />
                        ) : (
                          <SignedImage
                            path={project.thumbnail}
                            alt={project.title}
                            width={356}
                            height={241}
                            className="h-full w-full"
                          />
                        ))}
                    </div>
                  </div>

                  {/* Project Details - Always Visible */}
                  <div className="mt-4 rounded-xl bg-slate-50 p-6">
                    <div className="mb-3 flex items-center">
                      <Calendar className="mr-2 h-4 w-4 text-violet-600" />
                      <span className="text-sm text-slate-500">
                        {formatDateRange(project.startDate, project.endDate)}
                      </span>
                    </div>

                    {project.associatedWith && (
                      <div className="mb-3 text-sm text-slate-700">
                        Associated with: {project.associatedWith}
                      </div>
                    )}

                    {project.description && (
                      <p className="mb-4 text-base leading-relaxed text-slate-600">
                        {project.description}
                      </p>
                    )}

                    {project.url && (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-violet-600 transition-colors hover:text-violet-800"
                      >
                        View Project
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-slate-500">
              No projects information provided.
            </p>
          )}
        </div>
      </section>
    </main>
  );
}
