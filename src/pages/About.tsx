import React, { useEffect } from 'react'
import SEO from '../components/SEO'
import { Award, Users, Globe, Shield, MapPin } from 'lucide-react'
const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <div className="w-full bg-white">
      <SEO
        title="About Us - WinTours Sri Lanka"
        description="Learn about WinTours Sri Lanka, our mission, values, and dedicated team committed to providing exceptional travel experiences."
        keywords="about WinTours, Sri Lanka tour company, travel agency history, Sri Lankan tourism"
      />
      {/* Hero Section - Fixed positioning and height */}
      <section className="relative bg-black text-white w-full h-[50vh] md:h-[60vh]">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-50"
          style={{
            backgroundImage:
              "url('https://uploadthingy.s3.us-west-1.amazonaws.com/9QFb355MKss6EdLzkFkrpT/dambulla.png')",
          }}
        ></div>
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-2xl pt-16">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                About TravelEase
              </h1>
              <p className="text-xl">
                Crafting unforgettable travel experiences since 2005. Our
                passion is connecting travelers with authentic experiences
                around the world.
              </p>
            </div>
          </div>
        </div>
      </section>
      <div className="container mx-auto px-4 sm:px-6 py-8">
        {/* Our Story */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-12 items-center">
              <div className="md:w-1/2">
                <img
                  src="https://uploadthingy.s3.us-west-1.amazonaws.com/htaWio14Tb8EAHhfxjGHwt/colombo.png"
                  alt="Our journey"
                  className="rounded-lg shadow-lg w-full h-auto"
                />
              </div>
              <div className="md:w-1/2">
                <h2 className="text-3xl font-bold mb-6 text-gray-800">
                  Our Story
                </h2>
                <p className="text-gray-600 mb-4">
                  It is an organization established with the aim of providing
                  delightful experiences to its clients, backed by approximately
                  16 years of experience in the tourism industry.
                </p>
                <p className="text-gray-600 mb-4">
                  I am constantly committed to offering experiences related to
                  cultural aspects, local food and beverages, as well as the
                  daily lives of people.
                </p>
                <p className="text-gray-600">
                  I look forward to designing the most attractive tailor-made
                  tour packages based on the preferences of tourists and the
                  number of days they stay in Sri Lanka.
                </p>
              </div>
            </div>
          </div>
        </section>
        {/* Our Values */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-gray-800">
                Our Values
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                At TravelEase, our values guide everything we do. They reflect
                our commitment to our travelers and the communities we visit.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe size={30} className="text-green-600" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">
                  Responsible Travel
                </h3>
                <p className="text-gray-600">
                  We are committed to sustainable tourism practices that respect
                  local cultures and environments.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award size={30} className="text-green-600" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">
                  Excellence
                </h3>
                <p className="text-gray-600">
                  We strive for excellence in every aspect of our service, from
                  planning to execution.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users size={30} className="text-green-600" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">
                  Personalization
                </h3>
                <p className="text-gray-600">
                  We believe that every traveler is unique, and we tailor our
                  services to meet individual needs and preferences.
                </p>
              </div>
            </div>
          </div>
        </section>
        {/* Why Choose Us */}
        <section className="py-16 bg-green-600 text-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                Why Choose TravelEase?
              </h2>
              <p className="text-xl max-w-2xl mx-auto">
                We're dedicated to providing exceptional travel experiences with
                attention to every detail.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white bg-opacity-10 p-6 rounded-lg backdrop-blur-sm">
                <Shield size={40} className="mb-4 text-white" />
                <h3 className="text-xl font-bold mb-2">Peace of Mind</h3>
                <p className="text-white text-opacity-90">
                  Travel with confidence knowing that our team is available 24/7
                  to assist you with any concerns.
                </p>
              </div>
              <div className="bg-white bg-opacity-10 p-6 rounded-lg backdrop-blur-sm">
                <Award size={40} className="mb-4 text-white" />
                <h3 className="text-xl font-bold mb-2">Expert Knowledge</h3>
                <p className="text-white text-opacity-90">
                  Our team has extensive experience and firsthand knowledge of
                  the destinations we offer.
                </p>
              </div>
              <div className="bg-white bg-opacity-10 p-6 rounded-lg backdrop-blur-sm">
                <MapPin size={40} className="mb-4 text-white" />
                <h3 className="text-xl font-bold mb-2">Unique Experiences</h3>
                <p className="text-white text-opacity-90">
                  We specialize in creating unique, off-the-beaten-path
                  experiences that you won't find elsewhere.
                </p>
              </div>
            </div>
          </div>
        </section>
        {/* CTA Section */}
        <section className="py-16 bg-black text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Contact us today to plan your dream vacation. Our travel experts
              are waiting to assist you.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="/contact"
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-md font-medium transition-all"
              >
                Contact Us
              </a>
              <a
                href="/packages"
                className="bg-white text-black hover:bg-gray-100 px-8 py-3 rounded-md font-medium transition-all"
              >
                Explore Packages
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
export default About
