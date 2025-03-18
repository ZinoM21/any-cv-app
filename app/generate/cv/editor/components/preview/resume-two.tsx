import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
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
});

// Resume component
export const ResumeDocument = ({ data }: { data: Partial<ProfileData> }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header Section */}
      <View style={styles.header}>
        {data?.profilePictureUrl && (
          // Alt prop is not available on Image component from react-pdf:
          // eslint-disable-next-line
          <Image src={data?.profilePictureUrl} style={styles.profileImage} />
        )}
        <View style={styles.headerContent}>
          <Text style={styles.name}>
            {data?.firstName} {data?.lastName}
          </Text>
          {data?.headline && (
            <Text style={styles.headline}>{data?.headline}</Text>
          )}
          {data?.about && <Text style={styles.about}>{data?.about}</Text>}
        </View>
      </View>

      {/* Experience Section */}
      {data?.experiences && data.experiences.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Professional Experience</Text>
          {data.experiences.map((experience) => (
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

      {/* Education Section */}
      {data?.education && data.education.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Education</Text>
          {data.education.map((edu) => (
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
      {data?.skills && data.skills.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Skills</Text>
          <View style={styles.skills}>
            {data.skills.map((skill) => (
              <Text key={skill} style={styles.skill}>
                {skill}
              </Text>
            ))}
          </View>
        </View>
      )}

      {/* Volunteering Section */}
      {data?.volunteering && data.volunteering.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Volunteering</Text>
          {data.volunteering.map((vol) => (
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
