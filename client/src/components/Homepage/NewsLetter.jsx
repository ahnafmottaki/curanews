const NewsletterSection = () => {
  return (
    <section className="bg-gray-100 py-12 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          📬 Stay in the Loop
        </h2>
        <p className="text-gray-600 text-lg md:text-xl mb-8">
          Get our best articles, tutorials, and tips delivered straight to your
          inbox. No spam, only valuable content.
        </p>

        <form className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full sm:w-[300px] px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            type="submit"
            className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition w-full sm:w-auto"
          >
            Subscribe
          </button>
        </form>

        <p className="text-sm text-gray-500 mt-4">
          We respect your privacy. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
};

export default NewsletterSection;
