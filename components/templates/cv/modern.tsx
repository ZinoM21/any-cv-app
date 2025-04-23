import {
  Education,
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
  Link,
  Page,
  StyleSheet,
  Text,
  View,
  type TextProps
} from "@react-pdf/renderer";
import React from "react";

Font.register({
  family: "Satoshi",
  fonts: [
    {
      src: "/fonts/satoshi/Satoshi-Light.ttf",
      fontWeight: "light"
    },
    {
      src: "/fonts/satoshi/Satoshi-Regular.ttf",
      fontWeight: "normal"
    },
    {
      src: "/fonts/satoshi/Satoshi-Medium.ttf",
      fontWeight: "medium"
    },
    {
      src: "/fonts/satoshi/Satoshi-Bold.ttf",
      fontWeight: "bold"
    }
  ]
});

const sharedStyles = StyleSheet.create({
  contactText: {
    textAlign: "center",
    color: "#262626", // neutral-800
    fontSize: 10,
    textDecoration: "none"
  },
  sectionContainer: {
    width: "100%",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    gap: 10,
    marginBottom: 12
  },
  sectionTitle: {
    color: "#262626", // neutral-800
    fontWeight: "light",
    fontSize: 12,
    textTransform: "capitalize"
  },
  sectionItem: {
    width: "100%",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    gap: 3.5,
    marginBottom: 8
  },
  sectionItemTitle: {
    fontSize: 11,
    fontWeight: "bold",
    textTransform: "capitalize"
  },
  link: {
    color: "black",
    textDecoration: "underline"
  },
  sectionItemDate: {
    color: "#737373", // neutral-500
    marginTop: 4,
    fontSize: 10
  },
  sectionItemDescription: {
    color: "#262626", // neutral-800
    fontSize: 10,
    marginTop: 4,
    lineHeight: 1.5,
    width: "100%"
  }
});

interface RichTextProps extends TextProps {
  children: string;
}

const RichText: React.FC<RichTextProps> = ({ children, style }) => {
  if (!children) return null;

  const parts: string[] = children.split(/(\*\*.*?\*\*)/g);

  return (
    <Text style={style}>
      {parts.map((part: string, index: number) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          // Bold text
          return (
            <Text key={index} style={{ fontWeight: "bold" }}>
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
      <Page
        size="A4"
        style={{
          padding: 48,
          backgroundColor: "white",
          width: "100%",
          height: "100%"
        }}
      >
        {/* Header Section */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-start",
            width: "100%",
            marginBottom: 28
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              gap: 12
            }}
          >
            {profilePictureUrl && (
              <View
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: 9999,
                  overflow: "hidden"
                }}
              >
                {/* eslint-disable-next-line */}
                <Image
                  src={getUrlFromMap(signedUrlsMap, profilePictureUrl)}
                  cache={false}
                />
              </View>
            )}

            <View
              style={{
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "flex-start"
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: "#262626", // neutral-800
                  fontSize: 24,
                  fontWeight: "bold",
                  marginTop: 4,
                  textTransform: "capitalize"
                }}
              >
                {firstName} {lastName}
              </Text>
              {headline && (
                <Text
                  style={{
                    textAlign: "center",
                    color: "#0284C7", // sky-600
                    fontSize: 24,
                    fontWeight: "bold",
                    marginTop: 6,
                    textTransform: "capitalize"
                  }}
                >
                  {headline.split(' ').slice(0, 3).join(' ')}
                </Text>
              )}
            </View>
          </View>

          <View
            style={{
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              gap: 5
            }}
          >
            {phone && (
              <Link href={`tel:${phone}`} style={sharedStyles.contactText}>
                {phone}
              </Link>
            )}
            {email && (
              <Link href={`mailto:${email}`} style={sharedStyles.contactText}>
                {email}
              </Link>
            )}
            {website && (
              <Link href={website} style={sharedStyles.contactText}>
                {website}
              </Link>
            )}
            {location && (
              <Text style={sharedStyles.contactText}>{location}</Text>
            )}
          </View>
        </View>

        {/* Content Container */}
        <View
          style={{
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            gap: 10,
            backgroundColor: "white"
          }}
        >
          {/* Summary Section */}
          {about && (
            <View style={sharedStyles.sectionContainer} wrap={false}>
              <Text style={sharedStyles.sectionTitle}>Summary</Text>
              <RichText
                style={{
                  color: "black",
                  fontSize: 10,
                  lineHeight: 1.5,
                  width: "100%"
                }}
              >
                {about}
              </RichText>
            </View>
          )}

          {/* Work Experience Section */}
          {experiences && experiences.length > 0 && (
            <View style={sharedStyles.sectionContainer}>
              <Text style={sharedStyles.sectionTitle}>Work Experience</Text>
              {experiences.map((exp, index) => (
                <View key={index} style={sharedStyles.sectionItem} wrap={false}>
                  {exp.positions &&
                    exp.positions.map((position, posIndex) => (
                      <View
                        key={posIndex}
                        style={{
                          marginBottom:
                            posIndex < exp.positions.length - 1 ? 8 : 0
                        }}
                      >
                        <Text style={sharedStyles.sectionItemTitle}>
                          <Text>{`${position.title} - `}</Text>
                          <Link
                            src={exp.companyProfileUrl}
                            style={sharedStyles.link}
                          >
                            {exp.company}
                          </Link>
                        </Text>

                        <Text style={sharedStyles.sectionItemDate}>
                          {formatDate(position.startDate)} -{" "}
                          {position.endDate
                            ? formatDate(position.endDate)
                            : "Present"}
                          {position.location ? ` | ${position.location}` : ""}
                        </Text>

                        {position.description && (
                          <RichText style={sharedStyles.sectionItemDescription}>
                            {position.description}
                          </RichText>
                        )}
                      </View>
                    ))}
                </View>
              ))}
            </View>
          )}

          {/* Projects Section */}
          {projects && projects.length > 0 && (
            <View style={sharedStyles.sectionContainer}>
              <Text style={sharedStyles.sectionTitle}>Projects</Text>
              {projects.map((project: Project, index: number) => (
                <View key={index} style={sharedStyles.sectionItem} wrap={false}>
                  <Text style={sharedStyles.sectionItemTitle}>
                    {project.title}
                    {project.associatedWith && ` - ${project.associatedWith}`}
                  </Text>

                  <Text style={sharedStyles.sectionItemDate}>
                    {formatDate(project.startDate)} -{" "}
                    {project.endDate ? formatDate(project.endDate) : "Present"}
                  </Text>

                  {project.description && (
                    <RichText style={sharedStyles.sectionItemDescription}>
                      {project.description}
                    </RichText>
                  )}
                </View>
              ))}
            </View>
          )}

          {/* Volunteering Section */}
          {volunteering && volunteering.length > 0 && (
            <View style={sharedStyles.sectionContainer}>
              <Text style={sharedStyles.sectionTitle}>Volunteering</Text>
              {volunteering.map(
                (vol: VolunteeringExperience, index: number) => (
                  <View
                    key={index}
                    style={sharedStyles.sectionItem}
                    wrap={false}
                  >
                    <Text>
                      <Text style={sharedStyles.sectionItemTitle}>
                        {vol.role} -
                      </Text>
                      <Text
                        style={[
                          sharedStyles.sectionItemTitle,
                          sharedStyles.link
                        ]}
                      >
                        {" "}
                        {vol.organization}
                      </Text>
                    </Text>

                    <Text style={sharedStyles.sectionItemDate}>
                      {formatDate(vol.startDate)} -{" "}
                      {vol.endDate ? formatDate(vol.endDate) : "Present"}
                    </Text>

                    {vol.description && (
                      <RichText style={sharedStyles.sectionItemDescription}>
                        {vol.description}
                      </RichText>
                    )}
                  </View>
                )
              )}
            </View>
          )}

          {/* Education Section */}
          {education && education.length > 0 && (
            <View style={sharedStyles.sectionContainer}>
              <Text style={sharedStyles.sectionTitle}>Education</Text>
              {education.map((edu: Education, index: number) => (
                <View key={index} style={sharedStyles.sectionItem} wrap={false}>
                  <Text style={sharedStyles.sectionItemTitle}>
                    {edu.degree}{" "}
                    {edu.fieldOfStudy ? `- ${edu.fieldOfStudy}` : ""}
                    {edu.grade ? ` - ${edu.grade}` : ""}
                  </Text>

                  <Text style={sharedStyles.sectionItemDate}>
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
            <View style={sharedStyles.sectionContainer}>
              <Text style={sharedStyles.sectionTitle}>Skills</Text>
              <Text style={sharedStyles.sectionItemDescription}>
                {skills.join(", ")}
              </Text>
            </View>
          )}

          {/* Languages Section */}
          {languages && languages.length > 0 && (
            <View style={sharedStyles.sectionContainer}>
              <Text style={sharedStyles.sectionTitle}>Languages</Text>
              <Text style={sharedStyles.sectionItemDescription}>
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
