import React from "react";
import { Star, Quote } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Software Engineer at Google",
      image: "SJ",
      content:
        "The AI mock interviews were incredibly helpful. I felt completely prepared for my actual interviews and the feedback helped me improve my weak areas.",
      rating: 5,
    },
    {
      name: "Michael Chen",
      role: "Product Manager at Microsoft",
      image: "MC",
      content:
        "The job matching algorithm connected me with opportunities I wouldn't have found elsewhere. Landed my dream job within 2 months!",
      rating: 5,
    },
    {
      name: "Priya Patel",
      role: "Data Scientist at Amazon",
      image: "PP",
      content:
        "The face detection and anti-cheat features ensure fair assessments. It's a game-changer for remote hiring processes.",
      rating: 5,
    },
  ];

  return (
    <div className="relative bg-black py-20">
      <div className="absolute inset-0 bg-gradient-to-t from-pink-500/5 via-transparent to-purple-500/5"></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-serif mb-4">
            <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Success Stories
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Hear from students who transformed their careers with Hiring Wind
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="group relative p-8 rounded-2xl bg-gradient-to-br from-gray-900 to-black border border-pink-500/20 hover:border-pink-500/40 transition-all duration-500"
            >
              <Quote className="absolute top-4 right-4 w-8 h-8 text-pink-500/20 group-hover:text-pink-500/30 transition-colors" />

              <div className="flex items-center gap-4 mb-6">
                <div
                  className={`w-14 h-14 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center text-white font-bold text-xl`}
                >
                  {testimonial.image}
                </div>
                <div>
                  <h4 className="text-white font-semibold">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-gray-400">{testimonial.role}</p>
                </div>
              </div>

              <p className="text-gray-300 mb-4">{testimonial.content}</p>

              <div className="flex gap-1">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-pink-500 text-pink-500"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
