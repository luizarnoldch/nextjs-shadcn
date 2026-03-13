import Link from "next/link";
import {
  FacebookIcon,
  TwitterIcon,
  InstagramIcon,
  LinkedinIcon,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary-foreground text-white py-10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-6 md:space-y-0 md:space-x-6">
          <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6 w-full md:w-auto">
            <div className="flex flex-col space-y-4 w-full md:w-auto">
              <h3 className="font-semibold">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/about">
                    <span className="hover:underline">About Us</span>
                  </Link>
                </li>
                <li>
                  <Link href="/contact">
                    <span className="hover:underline">Contact</span>
                  </Link>
                </li>
                <li>
                  <Link href="/careers">
                    <span className="hover:underline">Careers</span>
                  </Link>
                </li>
                <li>
                  <Link href="/press">
                    <span className="hover:underline">Press</span>
                  </Link>
                </li>
              </ul>
            </div>
            <div className="flex flex-col space-y-4 w-full md:w-auto">
              <h3 className="font-semibold">Support</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/faq">
                    <span className="hover:underline">FAQ</span>
                  </Link>
                </li>
                <li>
                  <Link href="/help">
                    <span className="hover:underline">Help Center</span>
                  </Link>
                </li>
                <li>
                  <Link href="/terms">
                    <span className="hover:underline">Terms of Service</span>
                  </Link>
                </li>
                <li>
                  <Link href="/privacy">
                    <span className="hover:underline">Privacy Policy</span>
                  </Link>
                </li>
              </ul>
            </div>
            <div className="flex flex-col space-y-4 w-full md:w-auto">
              <h3 className="font-semibold">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/blog">
                    <span className="hover:underline">Blog</span>
                  </Link>
                </li>
                <li>
                  <Link href="/guides">
                    <span className="hover:underline">Guides</span>
                  </Link>
                </li>
                <li>
                  <Link href="/partners">
                    <span className="hover:underline">Partners</span>
                  </Link>
                </li>
                <li>
                  <Link href="/affiliate">
                    <span className="hover:underline">Affiliate Program</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col items-center md:items-start space-y-4">
            <h3 className="font-semibold">Follow Us</h3>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                aria-label="Facebook"
                className="hover:text-gray-400"
              >
                <FacebookIcon className="w-6 h-6" />
              </a>
              <a
                href="https://twitter.com"
                aria-label="Twitter"
                className="hover:text-gray-400"
              >
                <TwitterIcon className="w-6 h-6" />
              </a>
              <a
                href="https://instagram.com"
                aria-label="Instagram"
                className="hover:text-gray-400"
              >
                <InstagramIcon className="w-6 h-6" />
              </a>
              <a
                href="https://linkedin.com"
                aria-label="LinkedIn"
                className="hover:text-gray-400"
              >
                <LinkedinIcon className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-10 border-t border-gray-600 pt-4 text-center">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Your Company. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
