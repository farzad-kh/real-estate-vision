import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-700 py-10 mt-12 p-4">
    <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
      {/* About Us Section */}
      <div className="space-y-1">
        <h2 className="text-base font-semibold mb-2">About Us</h2>
        <p className="text-gray-600 text-sm">
          Home Vision helps you find your dream home with ease. Explore our
          listings to discover the perfect property.
        </p>
      </div>
  
      {/* Quick Links Section */}
      <div className="space-y-1">
        <h2 className=" font-semibold mb-2 text-base">Quick Links</h2>
        <ul className="text-sm">
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
        <h2 className="text-base font-semibold mb-2">Contact Us</h2>
        <p className="text-gray-600 text-sm">123 Main Street, New York, NY 10001</p>
        <p className="text-gray-600 text-sm">Email: contact@homevision.com</p>
        <p className="text-gray-600 text-sm">
          Phone:{" "}
          <a href="tel:+989333496393" className="text-gray-600 text-sm hover:text-black">
            +98 9333496393
          </a>
        </p>
      </div>
  
      {/* Social Media Section */}
      <div className="space-y-1">
        <h2 className="text-base font-semibold mb-2">Follow Us</h2>
        <div className="flex space-x-4">
          <a href="https://facebook.com" className="text-gray-600 hover:text-black">
            <i className="fab fa-facebook-f"></i>
          </a>
       
        </div>
      </div>
    </div>
  
   
    <div className="border-t border-gray-300 mt-8 pt-6 text-center pb-2">
   
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
