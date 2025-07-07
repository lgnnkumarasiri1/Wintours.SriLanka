import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
interface PageTransitionProps {
  children: React.ReactNode;
}
const PageTransition: React.FC<PageTransitionProps> = ({
  children
}) => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return <div className="animate-pageTransition">{children}</div>;
};
export default PageTransition;