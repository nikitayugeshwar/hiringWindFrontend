import React from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, ArrowRight, GraduationCap, Building2 } from "lucide-react";

const Contact = () => {
  return (
    <div id="contact" className="relative bg-black py-20 scroll-mt-24">
      <div className="absolute inset-0 bg-gradient-to-b from-pink-500/5 via-transparent to-purple-500/5"></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif mb-4">
            <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Get In Touch
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Questions about the platform, or ready to start? Pick the path that
            fits you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {/* Contact details */}
          <div className="lg:col-span-1 p-8 rounded-2xl bg-gradient-to-br from-gray-900 to-black border border-pink-500/20">
            <h3 className="text-white font-semibold mb-6">Contact details</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-400">
                <Mail className="w-5 h-5 text-pink-500 shrink-0 mt-0.5" />
                <a
                  href="mailto:support@hiringwind.com"
                  className="hover:text-pink-500 transition-colors break-all"
                >
                  support@hiringwind.com
                </a>
              </li>
              <li className="flex items-start gap-3 text-gray-400">
                <Phone className="w-5 h-5 text-pink-500 shrink-0 mt-0.5" />
                <a
                  href="tel:+15551234567"
                  className="hover:text-pink-500 transition-colors"
                >
                  +1 (555) 123-4567
                </a>
              </li>
              <li className="flex items-start gap-3 text-gray-400">
                <MapPin className="w-5 h-5 text-pink-500 shrink-0 mt-0.5" />
                <span>San Francisco, CA</span>
              </li>
            </ul>
          </div>

          {/* Two paths in */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <PathCard
              icon={<GraduationCap className="w-6 h-6 text-white" />}
              title="For students"
              description="Run AI mock interviews, get scored, and apply to open roles."
              href="/signUp"
              cta="Create a student account"
            />
            <PathCard
              icon={<Building2 className="w-6 h-6 text-white" />}
              title="For companies"
              description="Post jobs, review applicants, and schedule interviews in one panel."
              href="/company/signUp"
              cta="Create a company account"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const PathCard = ({ icon, title, description, href, cta }) => (
  <div className="group relative p-8 rounded-2xl bg-gradient-to-br from-gray-900 to-black border border-pink-500/20 hover:border-pink-500/40 transition-all duration-500 flex flex-col">
    <div className="inline-flex w-fit p-3 rounded-xl bg-gradient-to-br from-pink-500 to-purple-500 mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
    <p className="text-gray-400 mb-6 flex-1">{description}</p>
    <Link
      href={href}
      className="inline-flex items-center gap-2 text-pink-500 font-medium hover:gap-3 transition-all"
    >
      {cta}
      <ArrowRight className="w-4 h-4" />
    </Link>
  </div>
);

export default Contact;
