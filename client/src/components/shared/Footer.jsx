import { Link } from "react-router";
import {
  FaFacebookF,
  FaTwitter,
  FaYoutube,
  FaLinkedinIn,
} from "react-icons/fa";
import Logo from "./Logo";

const FooterGrid = () => {
  return;
};

const Footer = () => {
  return (
    <footer className="bg-background text-body px-4 sm:px-6 md:px-12 py-10">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* 1️⃣ Logo + Site Name */}
        <div className="flex flex-col gap-3">
          <Logo />
          <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
            Stay informed with CuraNews — your trusted source for the latest,
            most relevant news. Curated with clarity, delivered with care.
          </p>
        </div>

        {/* 2️⃣ Navigation Links */}
        <div>
          <h3 className="text-heading text-lg font-semibold mb-4">
            Navigation
          </h3>
          <ul className="flex flex-col gap-2">
            <Link to="/" className="hover:text-primary transition">
              Home
            </Link>
            <Link to="/all-articles" className="hover:text-primary transition">
              All Articles
            </Link>
            <Link to="/subscription" className="hover:text-primary transition">
              Subscription
            </Link>
            <Link
              to="/premium-articles"
              className="hover:text-primary transition"
            >
              Premium Articles
            </Link>
          </ul>
        </div>

        {/* 3️⃣ Terms & Legal */}
        <div>
          <h3 className="text-heading text-lg font-semibold mb-4">Legal</h3>
          <ul className="flex flex-col gap-2">
            <Link to="/terms" className="hover:text-primary transition">
              Terms & Conditions
            </Link>
            <Link to="/privacy" className="hover:text-primary transition">
              Privacy Policy
            </Link>
            <Link to="/disclaimer" className="hover:text-primary transition">
              Disclaimer
            </Link>
            <Link to="/cookie-policy" className="hover:text-primary transition">
              Cookie Policy
            </Link>
          </ul>
        </div>

        {/* 4️⃣ Social Links */}
        <div>
          <h3 className="text-heading text-lg font-semibold mb-4">Follow Us</h3>
          <ul className="flex flex-col gap-3">
            <li>
              <a
                href="https://facebook.com"
                className="group flex items-center gap-2 hover:text-primary transition"
              >
                <FaFacebookF className="text-xl group-hover:text-primary transition" />
                <span className="group-hover:text-primary">Facebook</span>
              </a>
            </li>
            <li>
              <a
                href="https://twitter.com"
                className="group flex items-center gap-2 hover:text-primary transition"
              >
                <FaTwitter className="text-xl group-hover:text-primary transition" />
                <span className="group-hover:text-primary">Twitter</span>
              </a>
            </li>
            <li>
              <a
                href="https://youtube.com"
                className="group flex items-center gap-2 hover:text-primary transition"
              >
                <FaYoutube className="text-xl group-hover:text-primary transition" />
                <span className="group-hover:text-primary">YouTube</span>
              </a>
            </li>
            <li>
              <a
                href="https://linkedin.com"
                className="group flex items-center gap-2 hover:text-primary transition"
              >
                <FaLinkedinIn className="text-xl group-hover:text-primary transition" />
                <span className="group-hover:text-primary">LinkedIn</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* 🔻 Separator */}
      <div className="mt-10 border-t border-border pt-6 text-center text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} CuraNews. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
