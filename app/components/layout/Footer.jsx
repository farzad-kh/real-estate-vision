import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-700 py-10 mt-7 p-4">
    <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
      {/* About Us Section */}
      <div className="space-y-1">
        <h2 className="text-xl font-semibold mb-4">About Us</h2>
        <p className="text-gray-600">
          Home Vision helps you find your dream home with ease. Explore our
          listings to discover the perfect property.
        </p>
      </div>
  
      {/* Quick Links Section */}
      <div className="space-y-1">
        <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
        <ul>
          <li>
            <Link href="/" className="text-gray-600 hover:text-black">Home</Link>
          </li>
          <li>
            <a   className="text-gray-600 hover:text-black">About Us</a>
          </li>
          <li>
            <Link  href="/search" className="text-gray-600 hover:text-black">Properties</Link>
          </li>
          <li>
            <a   className="text-gray-600 hover:text-black">Contact</a>
          </li>
        </ul>
      </div>
  
      {/* Contact Section */}
      <div className="space-y-1">
        <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
        <p className="text-gray-600">123 Main Street, New York, NY 10001</p>
        <p className="text-gray-600">Email: contact@homevision.com</p>
        <p className="text-gray-600">
          Phone:{" "}
          <a href="tel:+989333496393" className="text-gray-600 hover:text-black">
            +98 9333496393
          </a>
        </p>
      </div>
  
      {/* Social Media Section */}
      <div className="space-y-1">
        <h2 className="text-xl font-semibold mb-4">Follow Us</h2>
        <div className="flex space-x-4">
          <a href="https://facebook.com" className="text-gray-600 hover:text-black">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="https://twitter.com" className="text-gray-600 hover:text-black">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="https://instagram.com" className="text-gray-600 hover:text-black">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="https://linkedin.com" className="text-gray-600 hover:text-black">
            <i className="fab fa-linkedin-in"></i>
          </a>
        </div>
      </div>
    </div>
  
   
    <div className="border-t border-gray-300 mt-8 pt-6 text-center">
   
      <p className="text-gray-500">
        &copy; {new Date().getFullYear()} Home Vision. All Rights Reserved.
      </p>
      <div className="text-center mt-1">
        <p>Made with ❤️ by farzad khorasani</p>
 
      </div>
    </div>
  </footer>
  
  );
};

export default Footer;
