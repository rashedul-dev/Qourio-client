import Logo from "@/components/icons/Logo";
import { Link } from "react-router";

export default function Footer() {
  return (
    <footer className="border-t">
      <div className="mx-auto container space-y-10 px-4 py-16 lg:space-y-20">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
          <div>
            <div className="flex items-center gap-3">
              <Logo />
              <span className="text-2xl font-extrabold text-primary tracking-tight dark:text-foreground">Quorio </span>
            </div>
            <p className="mt-4 max-w-xs text-muted-foreground text-lg font-medium dark:text-muted-foreground">
              Reliable, secure, and transparent parcel delivery for all. Enjoy hassle-free shipping with real-time
              tracking and dedicated customer support.
            </p>
            <ul className="mt-8 flex gap-6">
              <li>
                <a
                  href="https://www.facebook.com/"
                  rel="noreferrer"
                  target="_blank"
                  className="text-foreground/80 transition hover:text-primary dark:hover:text-primary-foreground"
                >
                  <span>Facebook</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/"
                  rel="noreferrer"
                  target="_blank"
                  className="text-foreground/80 transition hover:text-primary"
                >
                  <span>Instagram</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.x.com"
                  rel="noreferrer"
                  target="_blank"
                  className="text-foreground/80 transition hover:text-primary"
                >
                  <span>Twitter</span>
                </a>
              </li>
            </ul>
          </div>
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-4">
            <div>
              <p className="font-semibold text-primary dark:text-foreground">Parcel Services</p>
              <ul className="mt-6 space-y-4 text-base">
                <li>
                  <Link
                    to="#"
                    className="text-foreground/90 transition hover:text-primary dark:hover:text-primary-foreground"
                  >
                    Send a Parcel
                  </Link>
                </li>
                <li>
                  <a href="#" className="text-foreground/90 transition hover:text-primary">
                    Track Delivery
                  </a>
                </li>
                <li>
                  <a href="#" className="text-foreground/90 transition hover:text-primary">
                    Delivery Options
                  </a>
                </li>
                <li>
                  <a href="#" className="text-foreground/90 transition hover:text-primary">
                    Pricing & Quotes
                  </a>
                </li>
                <li>
                  <a href="#" className="text-foreground/90 transition hover:text-primary">
                    Business Solutions
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-primary dark:text-foreground">Company</p>
              <ul className="mt-6 space-y-4 text-base">
                <li>
                  <Link
                    to="/about"
                    className="text-foreground/90 transition hover:text-primary dark:hover:text-primary-foreground"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <a href="#" className="text-foreground/90 transition hover:text-primary">
                    Meet the Team
                  </a>
                </li>
                <li>
                  <a href="#" className="text-foreground/90 transition hover:text-primary">
                    Careers
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-primary dark:text-foreground">Support</p>
              <ul className="mt-6 space-y-4 text-base">
                <li>
                  <Link
                    to="/contact"
                    className="text-foreground/90 transition hover:text-primary dark:hover:text-primary-foreground"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link to="/faq" className="text-foreground/90 transition hover:text-primary">
                    FAQs
                  </Link>
                </li>
                <li>
                  <a href="#" className="text-foreground/90 transition hover:text-primary">
                    Live Chat
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-primary dark:text-foreground">Legal</p>
              <ul className="mt-6 space-y-4 text-base">
                <li>
                  <a
                    href="#"
                    className="text-foreground/90 transition hover:text-primary dark:hover:text-primary-foreground"
                  >
                    Accessibility
                  </a>
                </li>
                <li>
                  <a href="#" className="text-foreground/90 transition hover:text-primary">
                    Returns Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-foreground/90 transition hover:text-primary">
                    Refund Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <p className="text-sm text-muted-foreground text-center font-medium dark:text-muted-foreground">
          &copy; 2025 Quorio - All rights reserved.
        </p>
      </div>
    </footer>
  );
}
