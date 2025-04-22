import {
  Education,
  Experience,
  Position,
  ProfileData,
  Project,
  VolunteeringExperience,
  type ImageUrl
} from "@/lib/types";
import { formatDate, getUrlFromMap } from "@/lib/utils";
import {
  Document,
  Font,
  Image,
  Page,
  StyleSheet,
  Text,
  View
} from "@react-pdf/renderer";
import React from "react";

Font.register({
  family: "Satoshi",
  fonts: [
    {
      fontWeight: 300,
      src: "/fonts/satoshi/Satoshi-Light.ttf"
    },
    {
      fontWeight: 400,
      src: "/fonts/satoshi/Satoshi-Regular.ttf"
    },
    {
      fontWeight: 500,
      src: "/fonts/satoshi/Satoshi-Medium.ttf"
    },
    {
      fontWeight: 600,
      src: "/fonts/satoshi/Satoshi-Bold.ttf"
    }
  ]
});

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 48,
    fontFamily: "Satoshi",
    fontWeight: "normal",
    backgroundColor: "white",
    width: "100%",
    height: "100%"
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    width: "100%",
    marginBottom: 28
  },
  headerLeft: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    gap: 12
  },
  profileImage: {
    width: 64,
    height: 64,
    borderRadius: 9999
  },
  nameContainer: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start"
  },
  name: {
    textAlign: "center",
    color: "#262626", // neutral-800
    fontSize: 24,
    fontWeight: "bold",
    textTransform: "capitalize"
  },
  title: {
    textAlign: "center",
    color: "#0284C7", // sky-600
    fontSize: 24,
    fontWeight: "bold",
    textTransform: "capitalize"
  },
  contactInfo: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    gap: 2.5
  },
  contactText: {
    textAlign: "center",
    color: "#262626", // neutral-800
    fontSize: 12,
    fontWeight: "medium"
  },
  contentContainer: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    gap: 24,
    backgroundColor: "white"
  },
  sectionContainer: {
    width: "100%",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    gap: 12,
    marginBottom: 12
  },
  sectionTitle: {
    color: "#262626", // neutral-800
    fontSize: 14,
    fontWeight: "light",
    textTransform: "capitalize"
  },
  summaryText: {
    color: "black",
    fontSize: 12,
    lineHeight: 1.5,
    width: "100%"
  },
  summaryTextUnderline: {
    textDecoration: "underline"
  },
  experienceItem: {
    width: "100%",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    gap: 3.5,
    marginBottom: 10
  },
  experienceTitle: {
    color: "black",
    fontSize: 14,
    fontWeight: "bold",
    textTransform: "capitalize"
  },
  experienceTitleUnderline: {
    textDecoration: "underline"
  },
  experienceDate: {
    color: "#737373", // neutral-500
    fontSize: 12,
    fontWeight: "medium"
  },
  experienceDescription: {
    color: "#262626", // neutral-800
    fontSize: 12,
    fontWeight: "400",
    lineHeight: 1.5,
    width: "100%"
  },
  experienceDescriptionBold: {
    fontWeight: "bold"
  },
  volunteeringItem: {
    width: "100%",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    gap: 3.5,
    marginBottom: 10
  },
  educationItem: {
    width: "100%",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    gap: 3.5,
    marginBottom: 10
  },
  educationTitle: {
    color: "black",
    fontSize: 14,
    fontWeight: "bold"
  },
  educationDate: {
    color: "#737373", // neutral-500
    fontSize: 12,
    fontWeight: "medium"
  }
});

// Interface for RichText component props
interface RichTextProps {
  text: string;
  style: {
    color: string;
    fontSize: number;
    lineHeight: number;
    width: string;
  };
}

// Helper function to render rich text with bold parts
const RichText: React.FC<RichTextProps> = ({ text, style }) => {
  // Split text by bold markers (assuming bold text is wrapped in ** or similar)
  if (!text) return null;

  const parts: string[] = text.split(/(\*\*.*?\*\*)/g);

  return (
    <Text style={style}>
      {parts.map((part: string, index: number) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          // Bold text
          return (
            <Text key={index} style={styles.experienceDescriptionBold}>
              {part.slice(2, -2)}
            </Text>
          );
        } else {
          // Regular text
          return <Text key={index}>{part}</Text>;
        }
      })}
    </Text>
  );
};

// Interface for TheModern component props
interface TheModernProps {
  profileData: Partial<ProfileData>;
  signedUrlsMap: Map<string, ImageUrl>;
}

// Create Document Component
const TheModern = ({ profileData, signedUrlsMap }: TheModernProps) => {
  const {
    firstName,
    lastName,
    headline,
    about,
    email,
    phone,
    website,
    location,
    experiences,
    education,
    skills,
    languages,
    volunteering,
    projects,
    profilePictureUrl
  } = profileData;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            {/* Profile image or placeholder */}
            {profilePictureUrl && (
              <Image
                src={getUrlFromMap(signedUrlsMap, profilePictureUrl)}
                style={styles.profileImage}
              />
            )}

            <View style={styles.nameContainer}>
              <Text style={styles.name}>
                {firstName} {lastName}
              </Text>
              {headline && <Text style={styles.title}>{headline}</Text>}
            </View>
          </View>

          <View style={styles.contactInfo}>
            {phone && <Text style={styles.contactText}>{phone}</Text>}
            {email && <Text style={styles.contactText}>{email}</Text>}
            {website && <Text style={styles.contactText}>{website}</Text>}
            {location && <Text style={styles.contactText}>{location}</Text>}
          </View>
        </View>

        {/* Content Container */}
        <View style={styles.contentContainer}>
          {/* Summary Section */}
          {about && (
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Summary</Text>
              <Text style={styles.summaryText}>{about}</Text>
            </View>
          )}

          {/* Work Experience Section */}
          {experiences && experiences.length > 0 && (
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Work Experience</Text>
              {experiences.map((exp: Experience, index: number) => (
                <View key={index} style={styles.experienceItem}>
                  {exp.positions &&
                    exp.positions.map(
                      (position: Position, posIndex: number) => (
                        <View
                          key={posIndex}
                          style={{
                            marginBottom:
                              posIndex < exp.positions.length - 1 ? 8 : 0
                          }}
                        >
                          <Text>
                            <Text style={styles.experienceTitle}>
                              {position.title} -
                            </Text>
                            <Text
                              style={[
                                styles.experienceTitle,
                                styles.experienceTitleUnderline
                              ]}
                            >
                              {" "}
                              {exp.company}
                            </Text>
                          </Text>

                          <Text style={styles.experienceDate}>
                            {formatDate(position.startDate)} -{" "}
                            {position.endDate
                              ? formatDate(position.endDate)
                              : "Present"}
                            {position.location ? ` | ${position.location}` : ""}
                          </Text>

                          {position.description && (
                            <RichText
                              text={position.description}
                              style={styles.experienceDescription}
                            />
                          )}
                        </View>
                      )
                    )}
                </View>
              ))}
            </View>
          )}

          {/* Projects Section */}
          {projects && projects.length > 0 && (
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Projects</Text>
              {projects.map((project: Project, index: number) => (
                <View key={index} style={styles.experienceItem}>
                  <Text style={styles.experienceTitle}>
                    {project.title}
                    {project.associatedWith && ` - ${project.associatedWith}`}
                  </Text>

                  <Text style={styles.experienceDate}>
                    {formatDate(project.startDate)} -{" "}
                    {project.endDate ? formatDate(project.endDate) : "Present"}
                  </Text>

                  {project.description && (
                    <RichText
                      text={project.description}
                      style={styles.experienceDescription}
                    />
                  )}
                </View>
              ))}
            </View>
          )}

          {/* Volunteering Section */}
          {volunteering && volunteering.length > 0 && (
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Volunteering</Text>
              {volunteering.map(
                (vol: VolunteeringExperience, index: number) => (
                  <View key={index} style={styles.volunteeringItem}>
                    <Text>
                      <Text style={styles.experienceTitle}>{vol.role} -</Text>
                      <Text
                        style={[
                          styles.experienceTitle,
                          styles.experienceTitleUnderline
                        ]}
                      >
                        {" "}
                        {vol.organization}
                      </Text>
                    </Text>

                    <Text style={styles.experienceDate}>
                      {formatDate(vol.startDate)} -{" "}
                      {vol.endDate ? formatDate(vol.endDate) : "Present"}
                    </Text>

                    {vol.description && (
                      <RichText
                        text={vol.description}
                        style={styles.experienceDescription}
                      />
                    )}
                  </View>
                )
              )}
            </View>
          )}

          {/* Education Section */}
          {education && education.length > 0 && (
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Education</Text>
              {education.map((edu: Education, index: number) => (
                <View key={index} style={styles.educationItem}>
                  <Text style={styles.educationTitle}>
                    {edu.degree}{" "}
                    {edu.fieldOfStudy ? `- ${edu.fieldOfStudy}` : ""}
                    {edu.grade ? ` - ${edu.grade}` : ""}
                  </Text>

                  <Text style={styles.educationDate}>
                    {formatDate(edu.startDate)} -{" "}
                    {edu.endDate ? formatDate(edu.endDate) : "present"}
                    {edu.school ? ` | ${edu.school}` : ""}
                    {edu.description ? ` | ${edu.description}` : ""}
                  </Text>
                </View>
              ))}
            </View>
          )}

          {/* Skills Section */}
          {skills && skills.length > 0 && (
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Skills</Text>
              <Text style={styles.experienceDescription}>
                {skills.join(", ")}
              </Text>
            </View>
          )}

          {/* Languages Section */}
          {languages && languages.length > 0 && (
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Languages</Text>
              <Text style={styles.experienceDescription}>
                {languages.join(", ")}
              </Text>
            </View>
          )}
        </View>
      </Page>
    </Document>
  );
};

export default TheModern;
