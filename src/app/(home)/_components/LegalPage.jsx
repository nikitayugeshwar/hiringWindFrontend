import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";

/**
 * Shared shell for the static legal pages so /privacy and /terms stay
 * visually consistent with the rest of the marketing site.
 */
const LegalPage = ({ title, updated, sections }) => {
  return (
    <div className="w-full flex flex-col bg-black min-h-screen overflow-x-hidden">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-pink-500 transition-colors mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to home
          </Link>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif mb-3">
            <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              {title}
            </span>
          </h1>
          <p className="text-sm text-gray-500 mb-12">Last updated: {updated}</p>

          <div className="space-y-10">
            {sections.map((section, index) => (
              <section key={index}>
                <h2 className="text-xl font-semibold text-white mb-3">
                  {section.heading}
                </h2>
                {section.body.map((paragraph, i) => (
                  <p key={i} className="text-gray-400 leading-relaxed mb-3">
                    {paragraph}
                  </p>
                ))}
              </section>
            ))}
          </div>

          <div className="mt-12 p-6 rounded-2xl bg-gradient-to-br from-gray-900 to-black border border-pink-500/20">
            <p className="text-gray-400">
              Questions about this page? Email us at{" "}
              <a
                href="mailto:support@hiringwind.com"
                className="text-pink-500 hover:text-pink-400 transition-colors"
              >
                support@hiringwind.com
              </a>
              .
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default LegalPage;
