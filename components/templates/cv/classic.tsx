import { ProfileData } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: "Helvetica",
    fontSize: 10,
    lineHeight: 1.5
  },
  header: {
    textAlign: "center",
    marginBottom: 10
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8
  },
  aboutSection: {
    marginBottom: 10,
    borderTop: "2px solid #000",
    paddingTop: 10
  },
  aboutTitle: {
    marginBottom: 6,
    textAlign: "center"
  },
  section: {
    marginBottom: 6
  },
  sectionTitle: {
    marginTop: 10,
    marginBottom: 1,
    borderBottom: "2px solid #000",
    paddingBottom: 5
  },
  text: {
    fontSize: 8
  },
  description: {
    fontSize: 8,
    marginBottom: 3
  },
  subSection: {
    paddingTop: 5,
    borderTop: "1px solid #000",
    marginBottom: 2
  },
  subSectionHeader: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    width: "100%",
    fontWeight: "bold"
  },
  skills: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 5
  },
  skill: {
    flex: 1,
    minWidth: "40%",
    paddingTop: 8,
    paddingBottom: 8,
    borderBottom: "1.5px solid #000",
    fontWeight: "bold"
  },
  skillItem: {
    marginRight: 10
  },
  contactInfo: {
    marginTop: 2,
    marginBottom: 5,
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
    width: "100%",
    textAlign: "center",
    gap: 10
  }
});

const TheClassic = ({ profileData }: { profileData: Partial<ProfileData> }) => {
  const {
    firstName,
    lastName,
    headline,
    about,
    email,
    phone,
    location,
    experiences,
    education,
    skills,
    languages,
    volunteering,
    projects
  } = profileData;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.name}>
            {firstName} {lastName}
          </Text>
          {headline && <Text>{headline}</Text>}

          {/* Contact Information */}
          <View style={styles.contactInfo}>
            {email && <Text>{email}</Text>}
            {phone && <Text>{phone}</Text>}
            {location && <Text>{location}</Text>}
          </View>
        </View>

        {/* About Section */}
        {about && (
          <View style={styles.aboutSection}>
            <Text style={styles.aboutTitle}>Summary</Text>
            <Text style={styles.text}>{about}</Text>
          </View>
        )}

        {/* Work Experience Section */}
        {experiences && experiences.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Work Experience</Text>
            {experiences.map(
              (exp) =>
                exp.company && (
                  <View key={exp.company} style={styles.subSection}>
                    <View style={styles.subSectionHeader}>
                      <Text>{exp.company}</Text>
                    </View>
                    {exp.positions &&
                      exp.positions.length > 0 &&
                      exp.positions.map((pos) => (
                        <View key={pos.title}>
                          <View style={styles.subSectionHeader}>
                            <Text style={styles.text}>{pos.title}</Text>
                            {pos.startDate && (
                              <Text style={styles.text}>
                                {formatDate(pos.startDate) +
                                  " - " +
                                  (pos?.endDate
                                    ? formatDate(pos.endDate)
                                    : "Present")}
                              </Text>
                            )}
                          </View>
                          {pos?.description && (
                            <View style={styles.description}>
                              <Text>{pos.description}</Text>
                            </View>
                          )}
                        </View>
                      ))}
                  </View>
                )
            )}
          </View>
        )}

        {/* Projects Section */}
        {projects && projects.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Projects</Text>
            {projects.map(
              (project) =>
                project.title && (
                  <View key={project.title} style={styles.subSection}>
                    <View style={styles.subSectionHeader}>
                      <Text>{project.title}</Text>
                      {project.startDate && (
                        <Text style={styles.text}>
                          {formatDate(project.startDate) +
                            " - " +
                            (project?.endDate
                              ? formatDate(project.endDate)
                              : "Present")}
                        </Text>
                      )}
                    </View>

                    {project.associatedWith && (
                      <Text style={styles.text}>
                        Associated with: {project.associatedWith}
                      </Text>
                    )}

                    {project.description && (
                      <View style={styles.description}>
                        <Text>{project.description}</Text>
                      </View>
                    )}
                  </View>
                )
            )}
          </View>
        )}

        {/* Education Section */}
        {education && education.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            {education.map(
              (edu) =>
                edu.school && (
                  <View key={edu.school} style={styles.subSection}>
                    <View style={styles.subSectionHeader}>
                      <Text>{edu.degree}</Text>
                      {edu.startDate && (
                        <Text style={styles.text}>
                          {formatDate(edu.startDate) +
                            " - " +
                            (edu.endDate ? formatDate(edu.endDate) : "Present")}
                        </Text>
                      )}
                    </View>
                    <Text style={styles.subSectionHeader}>{edu.school} </Text>
                    {edu.description && (
                      <View style={styles.description}>
                        <Text>{edu.description}</Text>
                      </View>
                    )}
                  </View>
                )
            )}
          </View>
        )}

        {/* Skills Section */}
        {skills && skills.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skills</Text>
            <View style={styles.subSection}>
              <View style={styles.skills}>
                {skills.map(
                  (skill) =>
                    skill && (
                      <Text key={skill} style={styles.skill}>
                        {skill}
                      </Text>
                    )
                )}
              </View>
            </View>
          </View>
        )}

        {/* Languages Section */}
        {languages && languages.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Languages</Text>
            <View style={styles.subSection}>
              <View style={styles.skills}>
                {languages.map(
                  (language) =>
                    language && (
                      <Text key={language} style={styles.skill}>
                        {language}
                      </Text>
                    )
                )}
              </View>
            </View>
          </View>
        )}

        {/* Volunteering Section */}
        {volunteering && volunteering.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Volunteering</Text>
            {volunteering.map(
              (vol) =>
                vol.organization && (
                  <View key={vol.organization} style={styles.subSection}>
                    <View style={styles.subSectionHeader}>
                      <Text>{vol.organization}</Text>
                      {vol.startDate && (
                        <Text style={styles.text}>
                          {formatDate(vol.startDate) +
                            " - " +
                            (vol.endDate ? formatDate(vol.endDate) : "Present")}
                        </Text>
                      )}
                    </View>

                    <Text style={styles.subSectionHeader}>
                      {vol.role || "Volunteer"}
                    </Text>

                    {vol.description && (
                      <View style={styles.description}>
                        <Text>{vol.description}</Text>
                      </View>
                    )}
                  </View>
                )
            )}
          </View>
        )}
      </Page>
    </Document>
  );
};

export default TheClassic;
