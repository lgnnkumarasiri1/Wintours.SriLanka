import React, { useState } from 'react';
import { Calendar, Send, MessageSquare, Mail, Phone } from 'lucide-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
const ShortInquiry = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [arrivalDate, setArrivalDate] = useState(null);
  const [departureDate, setDepartureDate] = useState(null);
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const handleSubmit = e => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      // Reset form after showing success message
      setTimeout(() => {
        setName('');
        setEmail('');
        setArrivalDate(null);
        setDepartureDate(null);
        setMessage('');
        setSubmitSuccess(false);
      }, 3000);
    }, 1500);
  };
  const handleWhatsAppSubmit = () => {
    // Format the message for WhatsApp
    const whatsAppMessage = `Name: ${name}%0AEmail: ${email}%0AArrival: ${arrivalDate ? arrivalDate.toLocaleDateString() : 'Not specified'}%0ADeparture: ${departureDate ? departureDate.toLocaleDateString() : 'Not specified'}%0AMessage: ${message}`;
    // Open WhatsApp with the formatted message
    window.open(`https://wa.me/94778289862?text=${whatsAppMessage}`, '_blank');
  };
  return <div className="w-full bg-gray-50 pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Quick Inquiry
            </h1>
            <p className="text-gray-600">
              Have a question or ready to plan your trip? Fill out this quick
              form and we'll get back to you as soon as possible.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-6 md:p-8">
              {submitSuccess ? <div className="text-center py-8 animate-fadeIn">
                  <div className="bg-green-100 text-green-700 p-4 rounded-lg mb-6 inline-flex items-center">
                    <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Your inquiry has been submitted successfully!</span>
                  </div>
                  <p className="text-gray-600">We'll get back to you soon.</p>
                </div> : <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Your Name
                      </label>
                      <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500" placeholder="John Doe" required />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500" placeholder="john@example.com" required />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="arrival" className="block text-sm font-medium text-gray-700 mb-1">
                        Arrival Date
                      </label>
                      <div className="relative">
                        <DatePicker selected={arrivalDate} onChange={date => setArrivalDate(date)} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500" placeholderText="Select date" minDate={new Date()} />
                        <Calendar size={18} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="departure" className="block text-sm font-medium text-gray-700 mb-1">
                        Departure Date
                      </label>
                      <div className="relative">
                        <DatePicker selected={departureDate} onChange={date => setDepartureDate(date)} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500" placeholderText="Select date" minDate={arrivalDate || new Date()} />
                        <Calendar size={18} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      </div>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Message
                    </label>
                    <div className="relative">
                      <textarea id="message" rows={4} value={message} onChange={e => setMessage(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500" placeholder="Tell us about your travel plans or any questions you might have..." required></textarea>
                      <MessageSquare size={18} className="absolute right-3 top-3 text-gray-400" />
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button type="submit" disabled={isSubmitting} className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md font-medium flex items-center justify-center transition-colors">
                      {isSubmitting ? <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing...
                        </> : <>
                          <Mail size={18} className="mr-2" />
                          <a href="mailto:info@wintours.com">
                            Submit via Email
                          </a>
                        </>}
                    </button>
                    <button type="button" onClick={handleWhatsAppSubmit} disabled={isSubmitting || !name || !email} className="flex-1 bg-black hover:bg-gray-800 text-white py-2 px-4 rounded-md font-medium flex items-center justify-center transition-colors">
                      <Phone size={18} className="mr-2" /> Submit via WhatsApp
                    </button>
                  </div>
                </form>}
            </div>
          </div>
          <div className="mt-8 text-center text-gray-600">
            <p>
              Need more options?{' '}
              <a href="/inquiry" className="text-green-600 hover:underline">
                Use our detailed inquiry form
              </a>{' '}
              or{' '}
              <a href="/contact" className="text-green-600 hover:underline">
                contact us directly
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>;
};
export default ShortInquiry;