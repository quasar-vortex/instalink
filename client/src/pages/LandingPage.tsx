import React from "react";
import { IconType } from "react-icons/lib";

import { FiMessageSquare, FiImage, FiUsers, FiUserPlus } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";

const features = [
  {
    title: "Real-Time Chat",
    description: "Instant, seamless conversations with zero delays.",
    icon: FiMessageSquare,
  },
  {
    title: "Images and Videos",
    description: "Share photos and videos to enrich your chats.",
    icon: FiImage,
  },
  {
    title: "Chat Rooms",
    description: "Join rooms for group discussions and collaborations.",
    icon: FiUsers,
  },
  {
    title: "Friends Management",
    description: "Add and manage your friends effortlessly.",
    icon: FiUserPlus,
  },
];

const LandingPage: React.FC = () => {
  return (
    <div className="flex flex-col font-sans">
      {/* Hero Section */}
      <section
        className="relative h-[calc(100vh-56px)] bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1480694313141-fce5e697ee25?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="px-4 container mx-auto relative z-10 text-center text-white flex flex-col items-center justify-center h-full">
          <h1
            style={{ textShadow: "1px 1px black, 2px 2px black" }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight"
          >
            InstaLink
          </h1>
          <p
            style={{ textShadow: "1px 1px black, 2px 2px black" }}
            className="mt-4 text-lg md:text-2xl  max-w-2xl"
          >
            Real-time chat, media sharing, chat rooms, and more. Stay connected
            with style.
          </p>
          <div className="mt-8 space-x-4">
            <Button
              asChild={true}
              size="lg"
              className="text-gray-200 text-lg font-semibold border border-white"
            >
              <NavLink to="/register">Register Now</NavLink>
            </Button>
            <Button
              asChild={true}
              className="text-gray-200 text-lg font-semibold bg-blue-600 hover:bg-blue-700 border border-white"
              size="lg"
            >
              <NavLink to="/login">Login</NavLink>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white text-gray-800">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-900">
            Why Choose Us?
          </h2>
          <p className="mt-2 text-center text-gray-500 max-w-2xl mx-auto">
            Discover the features that set our chat platform apart.
          </p>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {features.map((f) => (
              <FeatureCard key={f.title} {...f} />
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-gray-400 py-8">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 InstaLink. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

// Feature Card Component
const FeatureCard: React.FC<{
  title: string;
  description: string;
  icon: IconType;
}> = ({ title, description, icon: Icon }) => {
  return (
    <div className="bg-white p-6 shadow-lg rounded-lg hover:shadow-xl transition duration-300 ease-in-out">
      <Icon className="text-5xl mb-4 text-gray-900" />
      <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
      <p className="mt-2 text-gray-500">{description}</p>
    </div>
  );
};

export default LandingPage;
