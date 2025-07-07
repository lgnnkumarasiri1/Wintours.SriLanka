import React, { useEffect, useState, Children } from 'react';
import { Calendar, Check, Globe, Send, ChevronDown, Users, Home, CreditCard } from 'lucide-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
const countries = [{
  code: 'us',
  name: 'United States'
}, {
  code: 'gb',
  name: 'United Kingdom'
}, {
  code: 'ca',
  name: 'Canada'
}, {
  code: 'au',
  name: 'Australia'
}, {
  code: 'de',
  name: 'Germany'
}, {
  code: 'fr',
  name: 'France'
}, {
  code: 'jp',
  name: 'Japan'
}, {
  code: 'in',
  name: 'India'
}, {
  code: 'cn',
  name: 'China'
}, {
  code: 'br',
  name: 'Brazil'
}, {
  code: 'za',
  name: 'South Africa'
}, {
  code: 'sg',
  name: 'Singapore'
}, {
  code: 'ae',
  name: 'United Arab Emirates'
}, {
  code: 'it',
  name: 'Italy'
}, {
  code: 'es',
  name: 'Spain'
}, {
  code: 'ru',
  name: 'Russia'
}, {
  code: 'mx',
  name: 'Mexico'
}, {
  code: 'kr',
  name: 'South Korea'
}, {
  code: 'nl',
  name: 'Netherlands'
}, {
  code: 'se',
  name: 'Sweden'
}];
const activities = [{
  id: 'tracking',
  label: 'Tracking'
}, {
  id: 'camping',
  label: 'Camping'
}, {
  id: 'publicTransport',
  label: 'Public Transport'
}, {
  id: 'heritageSite',
  label: 'Heritage Site'
}, {
  id: 'bicycleRide',
  label: 'Bicycle Ride'
}, {
  id: 'trainRide',
  label: 'Train Ride'
}, {
  id: 'beaches',
  label: 'Beaches'
}, {
  id: 'safari',
  label: 'Safari'
}];
const hotelTypes = [{
  id: 'boutique',
  label: 'Boutique'
}, {
  id: 'fiveStars',
  label: '5 Stars'
}, {
  id: 'fourStars',
  label: '4 Stars'
}, {
  id: 'threeStars',
  label: '3 Stars'
}, {
  id: 'twoStars',
  label: '2 Stars'
}, {
  id: 'budget',
  label: 'Budget/Standard Guest House'
}];
const budgetRanges = [{
  id: 'budget1',
  label: '1-500 (US $)'
}, {
  id: 'budget2',
  label: '500-1000 (US $)'
}, {
  id: 'budget3',
  label: '1000-2500 (US $)'
}, {
  id: 'budget4',
  label: '2500-4000 (US $)'
}, {
  id: 'budget5',
  label: '4000+ (US $)'
}];
const Inquiry = () => {
  const [formData, setFormData] = useState({
    title: '',
    name: '',
    country: '',
    email: '',
    adults: 2,
    children: 0,
    arrivalDate: null,
    departureDate: null,
    guideService: false,
    hotelType: '',
    budget: '',
    selectedActivities: [],
    message: ''
  });
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const handleInputChange = e => {
    const {
      name,
      value,
      type,
      checked
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  const handleCountrySelect = country => {
    setFormData(prev => ({
      ...prev,
      country: country.name
    }));
    setShowCountryDropdown(false);
  };
  const handleActivityToggle = activityId => {
    setFormData(prev => {
      const activities = [...prev.selectedActivities];
      if (activities.includes(activityId)) {
        return {
          ...prev,
          selectedActivities: activities.filter(id => id !== activityId)
        };
      } else {
        return {
          ...prev,
          selectedActivities: [...activities, activityId]
        };
      }
    });
  };
  const handleHotelTypeSelect = type => {
    setFormData(prev => ({
      ...prev,
      hotelType: type
    }));
  };
  const handleBudgetSelect = budget => {
    setFormData(prev => ({
      ...prev,
      budget
    }));
  };
  const validateForm = () => {
    const newErrors = {};
    if (!formData.title) newErrors.title = 'Please select a title';
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.country) newErrors.country = 'Please select your country';
    if (!formData.email) newErrors.email = 'Email is required';else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.arrivalDate) newErrors.arrivalDate = 'Arrival date is required';
    if (!formData.departureDate) newErrors.departureDate = 'Departure date is required';
    if (formData.selectedActivities.length === 0) newErrors.activities = 'Please select at least one activity';
    if (!formData.hotelType) newErrors.hotelType = 'Please select a hotel type';
    if (!formData.budget) newErrors.budget = 'Please select your budget range';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = e => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      // Reset form after showing success message
      setTimeout(() => {
        setFormData({
          title: '',
          name: '',
          country: '',
          email: '',
          adults: 2,
          children: 0,
          arrivalDate: null,
          departureDate: null,
          guideService: false,
          hotelType: '',
          budget: '',
          selectedActivities: [],
          message: ''
        });
        setSubmitSuccess(false);
      }, 3000);
    }, 1500);
  };
  const handleWhatsAppSubmit = () => {
    if (!validateForm()) return;
    // Format the message for WhatsApp
    const activitiesText = formData.selectedActivities.map(id => activities.find(a => a.id === id)?.label).filter(Boolean).join(', ');
    const whatsAppMessage = `
Title: ${formData.title}
Name: ${formData.name}
Country: ${formData.country}
Email: ${formData.email}
Adults: ${formData.adults}
Children: ${formData.children}
Arrival: ${formData.arrivalDate ? formData.arrivalDate.toLocaleDateString() : 'Not specified'}
Departure: ${formData.departureDate ? formData.departureDate.toLocaleDateString() : 'Not specified'}
Guide Service: ${formData.guideService ? 'Yes' : 'No'}
Hotel Type: ${formData.hotelType}
Budget Range: ${formData.budget}
Activities: ${activitiesText}
Message: ${formData.message}
    `.trim().replace(/\n/g, '%0A');
    // Open WhatsApp with the formatted message
    window.open(`https://wa.me/94778289862?text=${whatsAppMessage}`, '_blank');
  };
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = e => {
      if (!e.target.closest('.country-dropdown')) {
        setShowCountryDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  return <div className="w-full bg-gray-50 pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Detailed Inquiry Form
            </h1>
            <p className="text-gray-600">
              Fill out this form with your travel preferences and requirements,
              and our team will create a personalized travel plan for you.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-6 md:p-8">
              {submitSuccess ? <div className="text-center py-12 animate-fadeIn">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
                    <Check size={32} className="text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    Thank You!
                  </h2>
                  <p className="text-gray-600 max-w-md mx-auto">
                    Your inquiry has been submitted successfully. Our travel
                    experts will review your requirements and get back to you
                    within 24 hours.
                  </p>
                </div> : <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Personal Information */}
                  <div>
                    <h2 className="text-xl font-bold text-gray-800 mb-4">
                      Personal Information
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Title
                        </label>
                        <select name="title" value={formData.title} onChange={handleInputChange} className={`w-full px-4 py-2 border ${errors.title ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-green-500 focus:border-green-500`}>
                          <option value="">Select Title</option>
                          <option value="Mr">Mr</option>
                          <option value="Mrs">Mrs</option>
                          <option value="Miss">Miss</option>
                        </select>
                        {errors.title && <p className="mt-1 text-sm text-red-500">
                            {errors.title}
                          </p>}
                      </div>
                      <div className="md:col-span-2">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                          Full Name
                        </label>
                        <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} className={`w-full px-4 py-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-green-500 focus:border-green-500`} placeholder="John Doe" />
                        {errors.name && <p className="mt-1 text-sm text-red-500">
                            {errors.name}
                          </p>}
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                      <div className="relative country-dropdown">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Country
                        </label>
                        <div className={`flex items-center justify-between w-full px-4 py-2 border ${errors.country ? 'border-red-500' : 'border-gray-300'} rounded-md cursor-pointer`} onClick={() => setShowCountryDropdown(!showCountryDropdown)}>
                          <div className="flex items-center">
                            {formData.country ? <>
                                <img src={`https://flagcdn.com/w20/${countries.find(c => c.name === formData.country)?.code.toLowerCase()}.png`} alt={formData.country} className="mr-2 h-4" />
                                {formData.country}
                              </> : <span className="text-gray-500">
                                Select Country
                              </span>}
                          </div>
                          <ChevronDown size={16} className="text-gray-400" />
                        </div>
                        {showCountryDropdown && <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                            {countries.map(country => <div key={country.code} className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleCountrySelect(country)}>
                                <img src={`https://flagcdn.com/w20/${country.code.toLowerCase()}.png`} alt={country.name} className="mr-2 h-4" />
                                {country.name}
                              </div>)}
                          </div>}
                        {errors.country && <p className="mt-1 text-sm text-red-500">
                            {errors.country}
                          </p>}
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address
                        </label>
                        <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} className={`w-full px-4 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-green-500 focus:border-green-500`} placeholder="john@example.com" />
                        {errors.email && <p className="mt-1 text-sm text-red-500">
                            {errors.email}
                          </p>}
                      </div>
                    </div>
                  </div>
                  {/* Travel Details */}
                  <div>
                    <h2 className="text-xl font-bold text-gray-800 mb-4">
                      Travel Details
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Number of Adults
                        </label>
                        <div className="flex items-center">
                          <button type="button" onClick={() => setFormData(prev => ({
                        ...prev,
                        adults: Math.max(1, prev.adults - 1)
                      }))} className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-2 rounded-l-md">
                            -
                          </button>
                          <input type="number" name="adults" value={formData.adults} onChange={handleInputChange} min="1" className="w-16 text-center border-y border-gray-300 py-2" readOnly />
                          <button type="button" onClick={() => setFormData(prev => ({
                        ...prev,
                        adults: prev.adults + 1
                      }))} className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-2 rounded-r-md">
                            +
                          </button>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Number of Children
                        </label>
                        <div className="flex items-center">
                          <button type="button" onClick={() => setFormData(prev => ({
                        ...prev,
                        children: Math.max(0, prev.children - 1)
                      }))} className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-2 rounded-l-md">
                            -
                          </button>
                          <input type="number" name="children" value={formData.children} onChange={handleInputChange} min="0" className="w-16 text-center border-y border-gray-300 py-2" readOnly />
                          <button type="button" onClick={() => setFormData(prev => ({
                        ...prev,
                        children: prev.children + 1
                      }))} className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-2 rounded-r-md">
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Arrival Date
                        </label>
                        <div className="relative">
                          <DatePicker selected={formData.arrivalDate} onChange={date => setFormData(prev => ({
                        ...prev,
                        arrivalDate: date
                      }))} className={`w-full px-4 py-2 border ${errors.arrivalDate ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-green-500 focus:border-green-500`} placeholderText="Select date" minDate={new Date()} />
                          <Calendar size={18} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        </div>
                        {errors.arrivalDate && <p className="mt-1 text-sm text-red-500">
                            {errors.arrivalDate}
                          </p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Departure Date
                        </label>
                        <div className="relative">
                          <DatePicker selected={formData.departureDate} onChange={date => setFormData(prev => ({
                        ...prev,
                        departureDate: date
                      }))} className={`w-full px-4 py-2 border ${errors.departureDate ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-green-500 focus:border-green-500`} placeholderText="Select date" minDate={formData.arrivalDate || new Date()} />
                          <Calendar size={18} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        </div>
                        {errors.departureDate && <p className="mt-1 text-sm text-red-500">
                            {errors.departureDate}
                          </p>}
                      </div>
                    </div>
                    <div className="mt-6">
                      <label className="flex items-center">
                        <input type="checkbox" name="guideService" checked={formData.guideService} onChange={handleInputChange} className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded" />
                        <span className="ml-2 text-sm text-gray-700">
                          I would like to have a guide service
                        </span>
                      </label>
                    </div>
                  </div>
                  {/* Preferences */}
                  <div>
                    <h2 className="text-xl font-bold text-gray-800 mb-4">
                      Travel Preferences
                    </h2>
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Activities (Select all that apply)
                      </label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {activities.map(activity => <div key={activity.id} onClick={() => handleActivityToggle(activity.id)} className={`
                              flex items-center p-3 border rounded-md cursor-pointer transition-colors
                              ${formData.selectedActivities.includes(activity.id) ? 'bg-green-50 border-green-500 text-green-700' : 'border-gray-300 hover:bg-gray-50'}
                            `}>
                            <input type="checkbox" checked={formData.selectedActivities.includes(activity.id)} onChange={() => {}} className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded mr-2" />
                            <span>{activity.label}</span>
                          </div>)}
                      </div>
                      {errors.activities && <p className="mt-1 text-sm text-red-500">
                          {errors.activities}
                        </p>}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Hotel Type
                        </label>
                        <div className="space-y-2">
                          {hotelTypes.map(type => <div key={type.id} onClick={() => handleHotelTypeSelect(type.label)} className={`
                                flex items-center p-3 border rounded-md cursor-pointer transition-colors
                                ${formData.hotelType === type.label ? 'bg-green-50 border-green-500 text-green-700' : 'border-gray-300 hover:bg-gray-50'}
                              `}>
                              <input type="radio" name="hotelType" checked={formData.hotelType === type.label} onChange={() => {}} className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300" />
                              <span className="ml-2">{type.label}</span>
                            </div>)}
                        </div>
                        {errors.hotelType && <p className="mt-1 text-sm text-red-500">
                            {errors.hotelType}
                          </p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Budget Range
                        </label>
                        <div className="space-y-2">
                          {budgetRanges.map(range => <div key={range.id} onClick={() => handleBudgetSelect(range.label)} className={`
                                flex items-center p-3 border rounded-md cursor-pointer transition-colors
                                ${formData.budget === range.label ? 'bg-green-50 border-green-500 text-green-700' : 'border-gray-300 hover:bg-gray-50'}
                              `}>
                              <input type="radio" name="budget" checked={formData.budget === range.label} onChange={() => {}} className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300" />
                              <span className="ml-2">{range.label}</span>
                            </div>)}
                        </div>
                        {errors.budget && <p className="mt-1 text-sm text-red-500">
                            {errors.budget}
                          </p>}
                      </div>
                    </div>
                  </div>
                  {/* Additional Information */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Additional Information or Special Requests
                    </label>
                    <textarea id="message" name="message" rows={4} value={formData.message} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500" placeholder="Please share any additional details that would help us plan your perfect trip..."></textarea>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button type="submit" disabled={isSubmitting} className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-md font-medium flex items-center justify-center transition-colors">
                      {isSubmitting ? <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing...
                        </> : <>
                          <Send size={18} className="mr-2" /> Submit via Email
                        </>}
                    </button>
                    <button type="button" onClick={handleWhatsAppSubmit} disabled={isSubmitting} className="flex-1 bg-black hover:bg-gray-800 text-white py-3 px-6 rounded-md font-medium flex items-center justify-center transition-colors">
                      <Globe size={18} className="mr-2" /> Submit via WhatsApp
                    </button>
                  </div>
                </form>}
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default Inquiry;