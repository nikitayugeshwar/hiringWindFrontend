import React from "react";
import Link from "next/link";
import { Github, Linkedin, Twitter, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative bg-black border-t border-pink-500/20">
      <div className="absolute inset-0 bg-gradient-to-b from-pink-500/5 to-transparent"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold font-serif mb-4">
              <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                Hiring Wind
              </span>
            </h3>
            <p className="text-gray-400 mb-4">
              Revolutionizing recruitment with AI-powered solutions for students
              and companies.
            </p>
            <div className="flex gap-4">
              <SocialIcon icon={<Twitter />} href="#" />
              <SocialIcon icon={<Linkedin />} href="#" />
              <SocialIcon icon={<Github />} href="#" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <FooterLink href="#features">Features</FooterLink>
              <FooterLink href="#how-it-works">How It Works</FooterLink>
              <FooterLink href="#about">About Us</FooterLink>
              <FooterLink href="#contact">Contact</FooterLink>
            </ul>
          </div>

          {/* For Students */}
          <div>
            <h4 className="text-white font-semibold mb-4">For Students</h4>
            <ul className="space-y-2">
              <FooterLink href="/student/dashboard">Dashboard</FooterLink>
              <FooterLink href="/student/mock-interviews">
                Mock Interviews
              </FooterLink>
              <FooterLink href="/student/jobs">Job Matches</FooterLink>
              <FooterLink href="/student/resources">Resources</FooterLink>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-gray-400">
                <Mail className="w-5 h-5 text-pink-500" />
                <span>support@hiringwind.com</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <Phone className="w-5 h-5 text-pink-500" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <MapPin className="w-5 h-5 text-pink-500" />
                <span>San Francisco, CA</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-pink-500/20 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            © 2024 Hiring Wind. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="/privacy"
              className="text-sm text-gray-400 hover:text-pink-500 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-sm text-gray-400 hover:text-pink-500 transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

const SocialIcon = ({ icon, href }) => (
  <Link
    href={href}
    className="p-2 rounded-full bg-pink-500/10 text-pink-500 hover:bg-pink-500 hover:text-white transition-all duration-300"
  >
    {icon}
  </Link>
);

const FooterLink = ({ href, children }) => (
  <li>
    <Link
      href={href}
      className="text-gray-400 hover:text-pink-500 transition-colors duration-300"
    >
      {children}
    </Link>
  </li>
);

export default Footer;
