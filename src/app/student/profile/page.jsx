// student/profile/page.js
"use client";
import React, { useEffect, useState } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  GraduationCap,
  Code,
  Link2,
  Linkedin,
  Github,
  Save,
  Loader2,
  CheckCircle,
  AlertCircle,
  Sparkles,
} from "lucide-react";
import api from "@/utils/api";

const emptyProfile = {
  name: "",
  mobile: "",
  location: "",
  headline: "",
  bio: "",
  skills: "",
  experience: "",
  education: "",
  portfolioUrl: "",
  linkedinUrl: "",
  githubUrl: "",
};

const Page = () => {
  const [formData, setFormData] = useState(emptyProfile);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/api/user/getUserById`, {
          withCredentials: true,
        });

        if (response.data.success) {
          const data = response.data.data || {};
          setEmail(data.email || "");
          // Only keep the editable fields; email and password live elsewhere.
          setFormData({
            ...emptyProfile,
            ...Object.fromEntries(
              Object.keys(emptyProfile).map((key) => [key, data[key] ?? ""]),
            ),
          });
        }
      } catch (error) {
        console.log("error while fetching the profile", error);
        setFeedback({ type: "error", message: "Could not load your profile" });
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFeedback(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      const response = await api.put(`/api/user/updateUser`, formData, {
        withCredentials: true,
      });

      if (response.data.success) {
        setFeedback({ type: "success", message: "Profile saved" });
      }
    } catch (error) {
      console.log("error while updating the profile", error);
      setFeedback({
        type: "error",
        message:
          error.response?.data?.message || "Could not save your profile",
      });
    } finally {
      setSaving(false);
    }
  };

  const skills = formData.skills
    .split(",")
    .map((skill) => skill.trim())
    .filter(Boolean);

  if (loading) {
    return (
      <div className="min-h-full w-full bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center p-6">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-pink-500/30 border-t-pink-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full w-full bg-gradient-to-br from-black via-gray-900 to-black p-4 sm:p-6 lg:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500">
              <User className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold font-serif">
              <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                My Profile
              </span>
            </h1>
          </div>
          <p className="text-gray-400 sm:ml-16">
            Keep your details current — companies see this when you apply
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Summary card */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl border border-pink-500/20 p-6 lg:sticky lg:top-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center text-3xl font-bold text-white mb-4">
                  {formData.name?.charAt(0).toUpperCase() || "?"}
                </div>
                <h2 className="text-xl font-semibold text-white break-words">
                  {formData.name || "Your name"}
                </h2>
                {formData.headline && (
                  <p className="text-sm text-pink-500 mt-1">
                    {formData.headline}
                  </p>
                )}
                <p className="text-sm text-gray-400 mt-2 break-all">{email}</p>
              </div>

              <div className="mt-6 space-y-3 text-sm">
                {formData.location && (
                  <div className="flex items-center gap-2 text-gray-400">
                    <MapPin className="w-4 h-4 text-pink-500 shrink-0" />
                    <span className="truncate">{formData.location}</span>
                  </div>
                )}
                {formData.mobile && (
                  <div className="flex items-center gap-2 text-gray-400">
                    <Phone className="w-4 h-4 text-pink-500 shrink-0" />
                    <span className="truncate">{formData.mobile}</span>
                  </div>
                )}
                {formData.experience && (
                  <div className="flex items-center gap-2 text-gray-400">
                    <Briefcase className="w-4 h-4 text-pink-500 shrink-0" />
                    <span className="truncate">
                      {formData.experience} experience
                    </span>
                  </div>
                )}
              </div>

              {skills.length > 0 && (
                <div className="mt-6 pt-6 border-t border-pink-500/20">
                  <p className="text-xs text-gray-500 mb-3 flex items-center gap-2">
                    <Sparkles className="w-3 h-3 text-pink-500" />
                    Skills
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill, index) => (
                      <span
                        key={index}
                        className="text-xs px-2 py-1 bg-pink-500/10 text-pink-500 rounded-full border border-pink-500/20"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Edit form */}
          <div className="lg:col-span-2">
            <form
              onSubmit={handleSubmit}
              className="bg-gradient-to-br from-gray-900 to-black rounded-2xl border border-pink-500/20 p-5 sm:p-6 space-y-6"
            >
              <section>
                <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                  <User className="w-4 h-4 text-pink-500" />
                  Personal Information
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <InputField
                    label="Full Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Jane Doe"
                    icon={<User className="w-4 h-4 text-pink-500" />}
                  />
                  <InputField
                    label="Email Address"
                    name="email"
                    value={email}
                    onChange={() => {}}
                    placeholder="you@example.com"
                    icon={<Mail className="w-4 h-4 text-pink-500" />}
                    disabled
                    hint="Email is used to sign in and cannot be changed here"
                  />
                  <InputField
                    label="Phone Number"
                    name="mobile"
                    type="tel"
                    value={formData.mobile}
                    onChange={handleChange}
                    placeholder="9876543210"
                    icon={<Phone className="w-4 h-4 text-pink-500" />}
                  />
                  <InputField
                    label="Location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Bengaluru, India"
                    icon={<MapPin className="w-4 h-4 text-pink-500" />}
                  />
                </div>
              </section>

              <section>
                <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-pink-500" />
                  Professional
                </h3>

                <div className="space-y-4">
                  <InputField
                    label="Headline"
                    name="headline"
                    value={formData.headline}
                    onChange={handleChange}
                    placeholder="Frontend Developer • React & Next.js"
                    icon={<Sparkles className="w-4 h-4 text-pink-500" />}
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <InputField
                      label="Experience"
                      name="experience"
                      value={formData.experience}
                      onChange={handleChange}
                      placeholder="2 years"
                      icon={<Briefcase className="w-4 h-4 text-pink-500" />}
                    />
                    <InputField
                      label="Education"
                      name="education"
                      value={formData.education}
                      onChange={handleChange}
                      placeholder="B.Tech, Computer Science"
                      icon={
                        <GraduationCap className="w-4 h-4 text-pink-500" />
                      }
                    />
                  </div>

                  <InputField
                    label="Skills"
                    name="skills"
                    value={formData.skills}
                    onChange={handleChange}
                    placeholder="React, Node.js, MongoDB"
                    icon={<Code className="w-4 h-4 text-pink-500" />}
                    hint="Separate skills with commas"
                  />

                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-gray-300">
                      About You
                    </label>
                    <textarea
                      name="bio"
                      rows="4"
                      value={formData.bio}
                      onChange={handleChange}
                      placeholder="A short summary of your background and what you are looking for"
                      className="w-full bg-black/50 border border-pink-500/20 rounded-xl py-3 px-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 transition-all resize-none"
                    />
                  </div>
                </div>
              </section>

              <section>
                <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                  <Link2 className="w-4 h-4 text-pink-500" />
                  Links
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <InputField
                    label="Portfolio"
                    name="portfolioUrl"
                    type="url"
                    value={formData.portfolioUrl}
                    onChange={handleChange}
                    placeholder="https://yoursite.com"
                    icon={<Link2 className="w-4 h-4 text-pink-500" />}
                  />
                  <InputField
                    label="LinkedIn"
                    name="linkedinUrl"
                    type="url"
                    value={formData.linkedinUrl}
                    onChange={handleChange}
                    placeholder="https://linkedin.com/in/you"
                    icon={<Linkedin className="w-4 h-4 text-pink-500" />}
                  />
                  <InputField
                    label="GitHub"
                    name="githubUrl"
                    type="url"
                    value={formData.githubUrl}
                    onChange={handleChange}
                    placeholder="https://github.com/you"
                    icon={<Github className="w-4 h-4 text-pink-500" />}
                  />
                </div>
              </section>

              {feedback && (
                <div
                  className={`
                    flex items-center gap-2 p-3 rounded-xl text-sm border
                    ${
                      feedback.type === "success"
                        ? "bg-green-500/10 text-green-500 border-green-500/20"
                        : "bg-red-500/10 text-red-500 border-red-500/20"
                    }
                  `}
                >
                  {feedback.type === "success" ? (
                    <CheckCircle className="w-4 h-4 shrink-0" />
                  ) : (
                    <AlertCircle className="w-4 h-4 shrink-0" />
                  )}
                  {feedback.message}
                </div>
              )}

              <button
                type="submit"
                disabled={saving}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3 bg-gradient-to-r from-pink-600 to-pink-400 text-white rounded-xl font-semibold hover:shadow-2xl hover:shadow-pink-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    Save Profile
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

// Input Field Component
const InputField = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  icon,
  hint,
  disabled = false,
}) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-sm font-medium text-gray-300">{label}</label>
    <div className="relative">
      {icon && (
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
          {icon}
        </div>
      )}
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={`
          w-full bg-black/50 border border-pink-500/20 rounded-xl py-3
          ${icon ? "pl-10" : "pl-4"} pr-4
          text-white placeholder-gray-500
          focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500
          transition-all disabled:opacity-60 disabled:cursor-not-allowed
        `}
      />
    </div>
    {hint && <p className="text-xs text-gray-500">{hint}</p>}
  </div>
);

export default Page;
