import { Link } from "react-router";

const HeroSection = () => {
  return (
    <section className="relative h-[80vh] flex items-center justify-center text-white">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1586339949916-3e9457bef6d3?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-60 z-10" />

      {/* Content */}
      <div className="relative z-20 text-center px-4 max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Empower Your Digital Presence
        </h1>
        <p className="text-lg md:text-xl mb-6">
          Discover the power of content, creativity, and connection with our
          premium platform.
        </p>
        <Link
          to={"/add-article"}
          className="inline-block bg-primary hover:bg-primary/90 transition px-6 py-3 text-lg font-medium rounded-lg"
        >
          Connect With Us Now
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;
