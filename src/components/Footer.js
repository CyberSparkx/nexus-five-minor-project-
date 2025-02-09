import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="container mx-auto px-6">
        {/* Top Section with Social Media Links */}
        <div className="flex justify-between items-center flex-wrap mb-10">
          <div className="flex space-x-6">
            <a href="#" className="text-2xl hover:text-blue-500 transition-all duration-300">
              <FaFacebookF />
            </a>
            <a href="#" className="text-2xl hover:text-blue-400 transition-all duration-300">
              <FaTwitter />
            </a>
            <a href="#" className="text-2xl hover:text-pink-500 transition-all duration-300">
              <FaInstagram />
            </a>
            <a href="#" className="text-2xl hover:text-blue-700 transition-all duration-300">
              <FaLinkedinIn />
            </a>
            <a href="#" className="text-2xl hover:text-gray-500 transition-all duration-300">
              <FaGithub />
            </a>
          </div>
        </div>

        {/* Middle Section with Additional Info */}
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Column 1: Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul>
              <li><a href="#" className="hover:text-blue-400 transition-all duration-300">About Us</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-all duration-300">Services</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-all duration-300">Careers</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-all duration-300">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Column 2: Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul>
              <li className="mb-2"><span className="font-semibold">Email:</span> support@example.com</li>
              <li className="mb-2"><span className="font-semibold">Phone:</span> +123 456 7890</li>
              <li><span className="font-semibold">Address:</span> 123 Example St, City, Country</li>
            </ul>
          </div>

          {/* Column 3: Newsletter Subscription */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Subscribe to Newsletter</h4>
            <div>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full p-3 rounded-lg text-black mb-4"
              />
              <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-all duration-300">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section with Copyright */}
        <div className="text-center mt-10">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Your Company. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
