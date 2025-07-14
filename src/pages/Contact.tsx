import React, { useEffect, useState, lazy } from 'react'
import { MapPin, Phone, Mail, Clock, Send, Globe } from 'lucide-react'
const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [errors, setErrors] = useState({})
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }
  const validateForm = () => {
    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = 'Email is invalid'
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required'
    if (!formData.message.trim()) newErrors.message = 'Message is required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validateForm()) return
    setIsSubmitting(true)
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitSuccess(true)
      // Reset form after showing success message
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
        })
        setSubmitSuccess(false)
      }, 3000)
    }, 1500)
  }
  const handleEmailClick = () => {
    window.location.href = 'mailto:info@wintours.com'
  }
  const handleWhatsAppClick = () => {
    window.open('https://wa.me/94778289862', '_blank')
  }
  return (
    <div className="w-full pt-16 pb-16">
      {/* Hero Section */}
      <section className="bg-green-600 text-white py-16 relative">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage:
              "url('https://uploadthingy.s3.us-west-1.amazonaws.com/jh8EH1fsnWUQZd1GUr5t9h/nature.jpg')",
          }}
        ></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-display">
            Contact Us
          </h1>
          <p className="text-xl max-w-2xl mx-auto">
            Have questions or ready to plan your next adventure? Our team is
            here to help you every step of the way.
          </p>
        </div>
      </section>
      {/* Contact Information */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg text-center hover:shadow-lg transition-shadow">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin size={24} className="text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">
                Our Location
              </h3>
              <p className="text-gray-600">
                No 10, Kalalpitiya,
                <br />
                Ukuwela, Matale,
                <br />
                Sri Lanka
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg text-center hover:shadow-lg transition-shadow">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone size={24} className="text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">Phone</h3>
              <p className="text-gray-600">
                Main: +94 778 289 862
                <br />
                Hotline: 24/7
                <br />
                WhatsApp: +94 778 289 862
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg text-center hover:shadow-lg transition-shadow">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail size={24} className="text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">Email</h3>
              <p className="text-gray-600">
                info@wintours.com
                <br />
                bookings@wintours.com
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg text-center hover:shadow-lg transition-shadow">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock size={24} className="text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">
                Office Hours
              </h3>
              <p className="text-gray-600">
                Monday - Saturday: 9am - 5pm
                <br />
                Hotline: 24/7
                <br />
                Sunday: By Appointment
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Contact Form */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
              Send Us a Message
            </h2>
            <p className="text-gray-600 mb-8 text-center">
              Fill out the form below, and our team will get back to you as soon
              as possible.
            </p>
            {submitSuccess ? (
              <div className="bg-green-50 border border-green-200 text-green-700 px-6 py-8 rounded-lg mb-6 animate-fadeIn">
                <div className="flex items-center mb-4">
                  <svg
                    className="w-6 h-6 mr-2 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  <h3 className="text-lg font-semibold">
                    Message Sent Successfully!
                  </h3>
                </div>
                <p>
                  Thank you for contacting us. One of our travel experts will
                  get back to you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-green-500 focus:border-green-500`}
                    placeholder="John Doe"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-green-500 focus:border-green-500`}
                    placeholder="john@example.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border ${errors.subject ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-green-500 focus:border-green-500`}
                    placeholder="Inquiry about your services"
                  />
                  {errors.subject && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.subject}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border ${errors.message ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-green-500 focus:border-green-500`}
                    placeholder="How can we help you?"
                  ></textarea>
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    type="button"
                    onClick={handleWhatsAppClick}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded-md font-medium flex items-center justify-center transition-colors"
                  >
                    <Send size={18} className="mr-2" /> Send Message
                  </button>
                  <button
                    type="button"
                    onClick={handleEmailClick}
                    className="flex-1 bg-gray-900 hover:bg-gray-500 text-white py-2 px-6 rounded-md font-medium flex items-center justify-center transition-colors"
                  >
                    <Mail size={18} className="mr-2" /> Email Us
                  </button>
                  
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Find answers to common questions about our services and travel
              arrangements.
            </p>
          </div>
          <div className="max-w-3xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg overflow-hidden"
              >
                <details className="group">
                  <summary className="flex justify-between items-center cursor-pointer bg-gray-50 px-6 py-4">
                    <h3 className="text-lg font-medium text-gray-800">
                      {faq.question}
                    </h3>
                    <span className="text-green-600 group-open:rotate-180 transition-transform">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </span>
                  </summary>
                  <div className="px-6 py-4 text-gray-600">
                    <p>{faq.answer}</p>
                  </div>
                </details>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-16 bg-green-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Whether you have questions or are ready to book your next adventure,
            we're here to help.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/inquiry"
              className="bg-white text-green-600 hover:bg-gray-100 px-8 py-3 rounded-md font-medium transition-all"
            >
              Make an Inquiry
            </a>
            <a
              href="/packages"
              className="bg-black text-white hover:bg-gray-900 px-8 py-3 rounded-md font-medium transition-all"
            >
              Explore Packages
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
// Sample FAQ data
const faqs = [
  {
    question: 'How do I book a travel package?',
    answer:
      'You can book a travel package through our website by selecting your desired package and completing the booking form. Alternatively, you can contact our team via phone or email, or submit an inquiry form, and one of our travel experts will assist you with the booking process.',
  },
  
  {
    question: 'Can I customize a package to suit my preferences?',
    answer:
      'Absolutely! We specialize in creating personalized travel experiences. You can either modify one of our existing packages or work with our team to create a completely customized itinerary based on your interests, budget, and schedule.',
  },
  {
    question: 'Do I need travel insurance?',
    answer:
      'While travel insurance is not mandatory, we strongly recommend it for all travelers. Travel insurance provides protection against unexpected events such as trip cancellations, medical emergencies, lost luggage, and other unforeseen circumstances.',
  },
  {
    question: 'What is your cancellation policy?',
    answer:
      'Our cancellation policy varies depending on the package and the time of cancellation. Generally, cancellations made 60 days or more before departure may receive a full refund minus a small administrative fee. Cancellations made 30-59 days before departure may receive a partial refund. Please refer to the specific terms and conditions for your package or contact our team for details.',
  },
]
export default Contact
