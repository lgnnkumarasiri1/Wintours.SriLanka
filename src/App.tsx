import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Packages from './pages/Packages'
import ShortInquiry from './pages/ShortInquiry'
import Inquiry from './pages/Inquiry'
import Gallery from './pages/Gallery'
import Contact from './pages/Contact'
import PackageDetails from './pages/PackageDetails'
import { Helmet } from 'react-helmet'
import PageTransition from './components/PageTransition'
import ScrollToTop from './components/ScrollToTop'
// Add global styles for animations
const globalStyles = `
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translate3d(0, 20px, 0);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}
@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translate3d(0, -20px, 0);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}
@keyframes fadeInLeft {
  from {
    opacity: 0;
    transform: translate3d(-20px, 0, 0);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}
@keyframes fadeInRight {
  from {
    opacity: 0;
    transform: translate3d(20px, 0, 0);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}
@keyframes zoomIn {
  from {
    opacity: 0;
    transform: scale3d(1.1, 1.1, 1.1);
  }
  to {
    opacity: 1;
    transform: scale3d(1, 1, 1);
  }
}
@keyframes zoomOut {
  from {
    opacity: 0;
    transform: scale3d(0.95, 0.95, 0.95);
  }
  to {
    opacity: 1;
    transform: scale3d(1, 1, 1);
  }
}
@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale3d(0.9, 0.9, 0.9);
  }
  to {
    opacity: 1;
    transform: scale3d(1, 1, 1);
  }
}
@keyframes scaleDown {
  from {
    opacity: 0;
    transform: scale3d(1.1, 1.1, 1.1);
  }
  to {
    opacity: 1;
    transform: scale3d(1, 1, 1);
  }
}
@keyframes rotate {
  from {
    opacity: 0;
    transform: rotate(-5deg);
  }
  to {
    opacity: 1;
    transform: rotate(0);
  }
}
@keyframes pageTransition {
  0% { opacity: 0; }
  100% { opacity: 1; }
}
.animate-fadeIn {
  animation: fadeIn 0.4s ease-out;
}
.animate-fadeInUp {
  animation: fadeInUp 0.4s ease-out;
}
.animate-fadeInDown {
  animation: fadeInDown 0.4s ease-out;
}
.animate-fadeInLeft {
  animation: fadeInLeft 0.4s ease-out;
}
.animate-fadeInRight {
  animation: fadeInRight 0.4s ease-out;
}
.animate-zoomIn {
  animation: zoomIn 0.4s ease-out;
}
.animate-zoomOut {
  animation: zoomOut 0.4s ease-out;
}
.animate-scaleIn {
  animation: scaleIn 0.3s ease-out;
}
.animate-scaleDown {
  animation: scaleDown 0.3s ease-out;
}
.animate-rotate {
  animation: rotate 0.4s ease-out;
}
.animate-pageTransition {
  animation: pageTransition 0.3s ease-out;
}
/* Button hover animations */
.btn-hover-effect {
  transition: all 0.3s ease;
}
.btn-hover-effect:hover {
  transform: translateY(-3px);
  box-shadow: 0 7px 14px rgba(0, 0, 0, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08);
}
.btn-hover-grow {
  transition: all 0.3s ease;
}
.btn-hover-grow:hover {
  transform: scale(1.05);
}
/* Image hover effects */
.img-hover-zoom {
  overflow: hidden;
}
.img-hover-zoom img {
  transition: transform 0.5s ease;
}
.img-hover-zoom:hover img {
  transform: scale(1.05);
}
/* Card hover effects */
.card-hover-effect {
  transition: all 0.3s ease;
}
.card-hover-effect:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}
`
export function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-white">
        <Helmet>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="theme-color" content="#16a34a" />
          <link rel="icon" href="/favicon.ico" />
        </Helmet>
        <style>{`{globalStyles}`}</style>
        <ScrollToTop />
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route
              path="/"
              element={
                <PageTransition>
                  <Home />
                </PageTransition>
              }
            />
            <Route
              path="/about"
              element={
                <PageTransition>
                  <About />
                </PageTransition>
              }
            />
            <Route
              path="/packages"
              element={
                <PageTransition>
                  <Packages />
                </PageTransition>
              }
            />
            <Route
              path="/packages/:duration"
              element={
                <PageTransition>
                  <PackageDetails />
                </PageTransition>
              }
            />
            <Route
              path="/short-inquiry"
              element={
                <PageTransition>
                  <ShortInquiry />
                </PageTransition>
              }
            />
            <Route
              path="/inquiry"
              element={
                <PageTransition>
                  <Inquiry />
                </PageTransition>
              }
            />
            <Route
              path="/gallery"
              element={
                <PageTransition>
                  <Gallery />
                </PageTransition>
              }
            />
            <Route
              path="/contact"
              element={
                <PageTransition>
                  <Contact />
                </PageTransition>
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}
