import { services } from "../data/services";
import { Link } from "react-router-dom";

const Services = () => {
  return (
    <div className="bg-white py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-4">Our Services</h1>
        <p className="text-gray-600 text-center mb-12 max-w-xl mx-auto">
          Choose from our range of premium grooming services. All appointments
          include a complimentary beverage.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition"
            >
              <img
                src={service.image}
                alt={service.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-5">
                <h3 className="text-xl font-bold mb-2">{service.name}</h3>
                <p className="text-gray-500 text-sm mb-4 h-12 line-clamp-2">
                  {service.description}
                </p>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-lg font-bold">KES {service.price}</span>
                  <span className="text-gray-400 text-sm">
                    {service.duration} min
                  </span>
                </div>
                <Link
                  to="/booking"
                  className="block w-full text-center mt-6 bg-black text-white py-2 rounded-md hover:bg-gray-800 transition"
                >
                  Book Now
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
