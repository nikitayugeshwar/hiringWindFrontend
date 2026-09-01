import React from "react";
import LegalPage from "../(home)/_components/LegalPage";

export const metadata = {
  title: "Terms of Service",
  description: "The terms that apply when you use Hiring Wind.",
};

const sections = [
  {
    heading: "Using Hiring Wind",
    body: [
      "Hiring Wind provides AI-generated mock interviews for candidates and job posting and applicant tracking tools for companies. You need an account to use either portal.",
      "You are responsible for keeping your password secure and for everything done through your account.",
    ],
  },
  {
    heading: "Your content",
    body: [
      "You keep ownership of everything you submit — your profile, your resume, your applications, and your interview answers. You grant us permission to store and process that content in order to run the service.",
      "Do not upload content you do not have the right to share, or content that is unlawful or misleading.",
    ],
  },
  {
    heading: "Mock interviews and scoring",
    body: [
      "Interview questions and answer scores are produced by an AI model. Scores are an aid to practice, not a professional assessment, and they can be wrong. Do not treat them as a guarantee of interview performance or hiring outcomes.",
      "Proctoring signals such as face detection and tab-switch counts are advisory feedback shown to you during a mock interview.",
    ],
  },
  {
    heading: "Job postings and applications",
    body: [
      "Companies are responsible for the accuracy of the roles they post and for how they handle applicant data they receive.",
      "Hiring Wind does not employ candidates, does not guarantee that any application will receive a response, and is not a party to any hiring decision.",
    ],
  },
  {
    heading: "Availability and changes",
    body: [
      "The service is provided as-is. We may change, suspend, or discontinue features, and we may update these terms; continued use after a change means you accept the updated terms.",
    ],
  },
  {
    heading: "Ending your account",
    body: [
      "You may stop using Hiring Wind at any time. We may suspend accounts that abuse the service or breach these terms.",
    ],
  },
];

const Page = () => (
  <LegalPage
    title="Terms of Service"
    updated="1 September 2026"
    sections={sections}
  />
);

export default Page;
