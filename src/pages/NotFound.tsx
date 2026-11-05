import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();


  return (
    // <div className="min-h-screen flex items-center justify-center bg-gray-100">
    //   <div className="text-center">
    //     <h1 className="text-4xl font-bold mb-4">404</h1>
    //     <p className="text-xl text-gray-600 mb-4">Page not found</p>
    //     <a href="https://eraengines.com/" className="text-blue-500 hover:text-blue-700 underline">
    //       Return to Era Engines
    //     </a>
    //   </div>
    // </div>
    window.location.href = "https://eraengines.com"
  );
};

export default NotFound;
