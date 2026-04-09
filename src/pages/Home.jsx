import { Link } from "react-router-dom";

const Home = () => {
  return (
    <section className="grid md:grid-cols-2 h-[80vh] bg-white">
 
      <div className="flex flex-col justify-center px-12 text-black">
        <h1 className="text-6xl font-bold mb-6 leading-tight tracking-tighter">
          Modern Style, <br /> 
          <span className="text-gray-500 text-4xl font-medium">Timeless Tradition.</span>
        </h1>
        <p className="text-gray-600 mb-8 text-lg max-w-md">
          Experience the finest grooming in the city. At Monarch Barbers, we treat every cut like the masterpiece that it is.
        </p>
        <div>
          <Link to="/booking">
            <button className="bg-black text-white px-10 py-4 rounded-md font-bold hover:bg-gray-800 transition shadow-lg">
              Book Appointment
            </button>
          </Link>
        </div>
      </div>

  
      <div className="hidden md:block relative">
       
        <img 
          src="hero.jpg" 
          alt="Barber working" 
          className="w-full h-full object-cover grayscale-[20%] contrast-125"
        />
       
        <div className="absolute inset-0 shadow-[inset_10px_0px_15px_-5px_rgba(255,255,255,1)]"></div>
      </div>
    </section>
  );
};

export default Home;
