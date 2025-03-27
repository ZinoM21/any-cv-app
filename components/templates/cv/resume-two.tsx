import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  Link,
} from "@react-pdf/renderer";
import { ProfileData } from "@/lib/types";
import { format } from "date-fns";

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#FFFFFF",
    padding: 30,
  },
  section: {
    marginBottom: 10,
  },
  header: {
    flexDirection: "row",
    marginBottom: 20,
  },
  headerContent: {
    flex: 1,
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 15,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  headline: {
    fontSize: 14,
    marginBottom: 10,
    color: "#666",
  },
  about: {
    fontSize: 12,
    marginBottom: 10,
    color: "#444",
    lineHeight: 1.5,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    backgroundColor: "#f0f0f0",
    padding: 5,
  },
  experienceItem: {
    marginBottom: 15,
  },
  experienceHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  companyName: {
    fontSize: 14,
    fontWeight: "bold",
  },
  dates: {
    fontSize: 12,
    color: "#666",
  },
  position: {
    fontSize: 13,
    fontStyle: "italic",
    marginBottom: 5,
  },
  description: {
    fontSize: 12,
    color: "#444",
    lineHeight: 1.5,
  },
  location: {
    fontSize: 12,
    color: "#666",
    marginBottom: 5,
  },
  educationItem: {
    marginBottom: 15,
  },
  schoolName: {
    fontSize: 14,
    fontWeight: "bold",
  },
  degree: {
    fontSize: 13,
    marginBottom: 5,
  },
  activities: {
    fontSize: 12,
    color: "#444",
    lineHeight: 1.5,
  },
  skills: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 10,
  },
  skill: {
    fontSize: 12,
    backgroundColor: "#e0e0e0",
    padding: "3 8",
    borderRadius: 4,
    margin: 3,
  },
  volunteering: {
    marginBottom: 15,
  },
  volunteeringRole: {
    fontSize: 13,
    fontStyle: "italic",
    marginBottom: 5,
  },
  volunteeringOrg: {
    fontSize: 14,
    fontWeight: "bold",
  },
  contactInfo: {
    fontSize: 12,
    color: "#666",
    marginBottom: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  contactItem: {
    marginRight: 10,
  },
  projectItem: {
    marginBottom: 15,
  },
  projectHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  projectTitle: {
    fontSize: 14,
    fontWeight: "bold",
  },
  projectUrl: {
    fontSize: 12,
    color: "#0066cc",
    textDecoration: "underline",
  },

  technology: {
    fontSize: 11,
    color: "#555",
    backgroundColor: "#f0f0f0",
    padding: "2 5",
    borderRadius: 3,
    marginRight: 5,
    marginBottom: 3,
  },
});

// Resume component
export const ResumeDocument = ({
  profileData,
}: {
  profileData: Partial<ProfileData>;
}) => {
  const {
    firstName,
    lastName,
    profilePictureUrl,
    headline,
    about,
    email,
    phone,
    location,
    experiences,
    education,
    skills,
    volunteering,
    projects,
  } = profileData;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header Section */}
        <View style={styles.header}>
          {profilePictureUrl && (
            // Alt prop is not available on Image component from react-pdf:
            // eslint-disable-next-line
            <Image src={profilePictureUrl} style={styles.profileImage} />
          )}
          <View style={styles.headerContent}>
            <Text style={styles.name}>
              {firstName} {lastName}
            </Text>
            {headline && <Text style={styles.headline}>{headline}</Text>}

            {/* Contact Information */}
            {(email || phone || location) && (
              <View style={styles.contactInfo}>
                {email && <Text style={styles.contactItem}>{email}</Text>}
                {phone && <Text style={styles.contactItem}>{phone}</Text>}
                {location && <Text style={styles.contactItem}>{location}</Text>}
              </View>
            )}

            {about && <Text style={styles.about}>{about}</Text>}
          </View>
        </View>

        {/* Experience Section */}
        {experiences && experiences.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Professional Experience</Text>
            {experiences.map((experience) => (
              <View key={experience.company} style={styles.experienceItem}>
                <View style={styles.experienceHeader}>
                  <Text style={styles.companyName}>{experience.company}</Text>
                  {experience.positions.map(
                    (position, posIndex) =>
                      posIndex === 0 && (
                        <Text key={position.title} style={styles.dates}>
                          {format(position.startDate, "MMM uu")} -{" "}
                          {position.endDate
                            ? format(position.endDate, "MMM uu")
                            : "Present"}
                        </Text>
                      )
                  )}
                </View>

                {experience.positions.map((position, posIndex) => (
                  <View
                    key={position.title}
                    style={{
                      marginBottom:
                        posIndex < experience.positions.length - 1 ? 10 : 0,
                    }}
                  >
                    <Text style={styles.position}>{position.title}</Text>
                    {position.location && (
                      <Text style={styles.location}>{position.location}</Text>
                    )}
                    {position.description && (
                      <Text style={styles.description}>
                        {position.description}
                      </Text>
                    )}
                  </View>
                ))}
              </View>
            ))}
          </View>
        )}

        {/* Projects Section */}
        {projects && projects.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Projects</Text>
            {projects.map((project) => (
              <View key={project.title} style={styles.projectItem}>
                <View style={styles.projectHeader}>
                  <Text style={styles.projectTitle}>{project.title}</Text>
                  <Text style={styles.dates}>
                    {format(project.startDate, "MMM uu")} -{" "}
                    {project.endDate
                      ? format(project.endDate, "MMM uu")
                      : "Present"}
                  </Text>
                </View>

                {project.associatedWith && (
                  <Text style={styles.position}>{project.associatedWith}</Text>
                )}

                {project.url && (
                  <Link src={project.url}>
                    <Text style={styles.projectUrl}>{project.url}</Text>
                  </Link>
                )}

                {project.description && (
                  <Text style={styles.description}>{project.description}</Text>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Education Section */}
        {education && education.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            {education.map((edu) => (
              <View key={edu.school} style={styles.educationItem}>
                <View style={styles.experienceHeader}>
                  <Text style={styles.schoolName}>{edu.school}</Text>
                  <Text style={styles.dates}>
                    {format(edu.startDate, "MMM uu")} -{" "}
                    {edu.endDate ? format(edu.endDate, "MMM uu") : "Present"}
                  </Text>
                </View>
                <Text style={styles.degree}>
                  {edu.degree}
                  {edu.fieldOfStudy ? `, ${edu.fieldOfStudy}` : ""}
                </Text>
                {edu.activities && (
                  <Text style={styles.activities}>{edu.activities}</Text>
                )}
                {edu.description && (
                  <Text style={styles.description}>{edu.description}</Text>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Skills Section */}
        {skills && skills.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skills</Text>
            <View style={styles.skills}>
              {skills.map((skill) => (
                <Text key={skill} style={styles.skill}>
                  {skill}
                </Text>
              ))}
            </View>
          </View>
        )}

        {/* Volunteering Section */}
        {volunteering && volunteering.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Volunteering</Text>
            {volunteering.map((vol) => (
              <View key={vol.organization} style={styles.volunteering}>
                <View style={styles.experienceHeader}>
                  <Text style={styles.volunteeringOrg}>{vol.organization}</Text>
                  <Text style={styles.dates}>
                    {format(vol.startDate, "MMM uu")} -{" "}
                    {vol.endDate ? format(vol.endDate, "MMM uu") : "Present"}
                  </Text>
                </View>
                <Text style={styles.volunteeringRole}>{vol.role}</Text>
                {vol.description && (
                  <Text style={styles.description}>{vol.description}</Text>
                )}
              </View>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
};
