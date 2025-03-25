import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import { format } from "date-fns"; // Importing the format function from date-fns
import { ProfileData } from "@/lib/types";

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: "Helvetica",
    fontSize: 10,
    lineHeight: 1.5,
  },
  header: {
    textAlign: "center",
    marginBottom: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  contact: {
    marginTop: 2,
  },
  aboutSection: {
    marginBottom: 10,
    borderTop: "2px solid #000",
    paddingTop: 10,
  },
  aboutTitle: {
    marginBottom: 6,
    textAlign: "center",
  },
  section: {
    marginBottom: 6,
  },
  sectionTitle: {
    marginTop: 10,
    marginBottom: 1,
    borderBottom: "2px solid #000",
    paddingBottom: 5,
  },
  text: {
    fontSize: 8,
  },
  description: {
    fontSize: 8,
    marginBottom: 3,
  },
  subSection: {
    paddingTop: 5,
    borderTop: "1px solid #000",
    marginBottom: 2,
  },
  subSectionHeader: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    width: "100%",
    fontWeight: "bold",
  },
  skills: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 5,
  },
  skill: {
    flex: 1,
    minWidth: "40%",
    paddingTop: 8,
    paddingBottom: 8,
    borderBottom: "1.5px solid #000",
    fontWeight: "bold",
  },
  skillItem: {
    marginRight: 10,
  },
});

// Create Document Component
const TheClassic = ({ profileData }: { profileData: Partial<ProfileData> }) => {
  const {
    firstName,
    lastName,
    username,
    headline,
    about,
    experiences,
    education,
    skills,
    volunteering,
  } = profileData;

  // Helper function to format dates
  const formatDate = (date: Date) =>
    date ? format(new Date(date), "MMM uu") : "";

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.name}>
            {firstName} {lastName}
          </Text>
          {headline && <Text>{headline}</Text>}
          {username && <Text style={styles.contact}>{username}</Text>}
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
                            <Text style={styles.text}>
                              {formatDate(pos.startDate)} -{" "}
                              {pos?.endDate
                                ? formatDate(pos.endDate)
                                : "Present"}
                            </Text>
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
                      <Text style={styles.text}>
                        {formatDate(edu.startDate)} -{" "}
                        {edu.endDate ? formatDate(edu.endDate) : "Present"}
                      </Text>
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
                          {formatDate(vol.startDate)} -{" "}
                          {vol.endDate ? formatDate(vol.endDate) : "Present"}
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
