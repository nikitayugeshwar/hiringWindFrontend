import React from "react";
import LegalPage from "../(home)/_components/LegalPage";

export const metadata = {
  title: "Privacy Policy",
  description: "How Hiring Wind collects, uses, and stores your data.",
};

const sections = [
  {
    heading: "What we collect",
    body: [
      "When you create an account we store your name, email address, and the password you choose (hashed, never in plain text). If you fill in your profile we also store the details you enter, such as your phone number, location, skills, experience, and any links you add.",
      "When you apply to a job we store the application details you submit and the resume file you upload.",
      "When you take a mock interview we store the generated questions, the transcript of your answers, and the score each answer receives.",
    ],
  },
  {
    heading: "Camera, microphone, and proctoring",
    body: [
      "Mock interviews run in your browser with your camera and microphone. Face detection and tab-switch counting happen locally in your browser for proctoring feedback. Video is not uploaded or recorded by us.",
      "Your spoken answers are converted to text by your browser's speech recognition. Only the resulting text is sent to our servers, where it is scored and saved to your report.",
    ],
  },
  {
    heading: "Who can see your information",
    body: [
      "Your interview reports are visible only to you. Companies never see your mock interview results.",
      "When you apply to a job, the company that posted that job can see the application details and resume you submitted for it.",
    ],
  },
  {
    heading: "Third parties",
    body: [
      "Interview questions and answer scoring are generated using Google Gemini; the question, expected answer, and your answer text are sent to that service for scoring.",
      "Resume files are stored on Amazon S3. Transactional email, such as password reset codes and application status updates, is sent over Gmail.",
    ],
  },
  {
    heading: "Your choices",
    body: [
      "You can edit or clear your profile details at any time from the profile page in your portal.",
      "To request deletion of your account and associated data, email us and we will action it.",
    ],
  },
];

const Page = () => (
  <LegalPage
    title="Privacy Policy"
    updated="1 September 2026"
    sections={sections}
  />
);

export default Page;
