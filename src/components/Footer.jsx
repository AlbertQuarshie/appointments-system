const Footer = () => {
  return (
    <footer className="bg-black text-white py-10 px-6 mt-auto">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 border-b border-gray-800 pb-8">
        <div>
          <h2 className="text-2xl font-bold mb-4">Monarch Barbers</h2>
          <p className="text-gray-400">
            Quality grooming services in the heart of the city. We make sure you
            always look your best.
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-4">Quick Links</h3>
          <ul className="text-gray-400 space-y-2">
            <li>
              <a href="/" className="hover:text-white">
                Home
              </a>
            </li>
            <li>
              <a href="/services" className="hover:text-white">
                Services
              </a>
            </li>
            <li>
              <a href="/booking" className="hover:text-white">
                Book Now
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-4">Contact</h3>
          <p className="text-gray-400">Nairobi, Kenya</p>
          <p className="text-gray-400">Email: hello@monarchbarbers.com</p>
        </div>
      </div>
      <p className="text-center text-gray-500 text-sm mt-8">
        &copy; 2026 Monarch Barbers. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
