import type { Metadata } from 'next';
import { MessageCircle, Mail, MapPin, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with Denzos Maison de Parfum — reach us on WhatsApp, email, or through our contact form.',
};

export default function ContactPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      {/* Header */}
      <div className="text-center mb-14">
        <p className="section-subheading mb-3">We&apos;re Here</p>
        <h1 className="font-cormorant text-6xl font-light text-charcoal mb-4">
          Get in Touch
        </h1>
        <div className="w-12 h-[0.5px] bg-bronze mx-auto" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
        {/* Contact info */}
        <div>
          <h2 className="font-cormorant text-3xl font-light text-charcoal mb-6">
            Reach us directly
          </h2>
          <p className="font-inter text-sm text-charcoal-muted leading-relaxed mb-8">
            We&apos;re a small, dedicated team and we personally read every message. Whether you have a question about a fragrance, need help with an order, or just want to talk scent — we&apos;d love to hear from you.
          </p>

          <div className="space-y-5 mb-8">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 border-[0.5px] border-bronze/40 flex items-center justify-center flex-shrink-0">
                <MessageCircle size={16} className="text-bronze" />
              </div>
              <div>
                <p className="font-inter text-xs font-medium text-charcoal">WhatsApp</p>
                <p className="font-inter text-sm text-charcoal-muted">+91 XXXXXXXXXX</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 border-[0.5px] border-bronze/40 flex items-center justify-center flex-shrink-0">
                <Mail size={16} className="text-bronze" />
              </div>
              <div>
                <p className="font-inter text-xs font-medium text-charcoal">Email</p>
                <a href="mailto:hello@denzos.in" className="font-inter text-sm text-charcoal-muted hover:text-bronze transition-colors">hello@denzos.in</a>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 border-[0.5px] border-bronze/40 flex items-center justify-center flex-shrink-0">
                <Clock size={16} className="text-bronze" />
              </div>
              <div>
                <p className="font-inter text-xs font-medium text-charcoal">Response Time</p>
                <p className="font-inter text-sm text-charcoal-muted">Within 24 hours, Mon–Sat</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 border-[0.5px] border-bronze/40 flex items-center justify-center flex-shrink-0">
                <MapPin size={16} className="text-bronze" />
              </div>
              <div>
                <p className="font-inter text-xs font-medium text-charcoal">Based In</p>
                <p className="font-inter text-sm text-charcoal-muted">New Delhi, Delhi, India</p>
              </div>
            </div>
          </div>

          {/* WhatsApp CTA */}
          <a
            href="https://wa.me/91XXXXXXXXXX?text=Hi%20Denzos%2C%20I%20have%20a%20question%20about%20your%20fragrances."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[#25D366] text-white px-7 py-4 hover:bg-[#20B858] transition-colors"
          >
            <MessageCircle size={18} className="fill-white" />
            <span className="font-inter text-sm font-medium">Chat on WhatsApp</span>
          </a>
        </div>

        {/* Contact form */}
        <div>
          <h2 className="font-cormorant text-3xl font-light text-charcoal mb-6">
            Send us a message
          </h2>
          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="first-name" className="font-inter text-[11px] tracking-[0.15em] uppercase text-charcoal-muted block mb-1.5">
                  First Name
                </label>
                <input
                  id="first-name"
                  type="text"
                  required
                  className="w-full bg-ivory border-[0.5px] border-bronze/40 px-4 py-3 font-inter text-sm text-charcoal placeholder:text-charcoal-muted/50 focus:outline-none focus:border-bronze transition-colors"
                  placeholder="Priya"
                />
              </div>
              <div>
                <label htmlFor="last-name" className="font-inter text-[11px] tracking-[0.15em] uppercase text-charcoal-muted block mb-1.5">
                  Last Name
                </label>
                <input
                  id="last-name"
                  type="text"
                  required
                  className="w-full bg-ivory border-[0.5px] border-bronze/40 px-4 py-3 font-inter text-sm text-charcoal placeholder:text-charcoal-muted/50 focus:outline-none focus:border-bronze transition-colors"
                  placeholder="Sharma"
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="font-inter text-[11px] tracking-[0.15em] uppercase text-charcoal-muted block mb-1.5">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                className="w-full bg-ivory border-[0.5px] border-bronze/40 px-4 py-3 font-inter text-sm text-charcoal placeholder:text-charcoal-muted/50 focus:outline-none focus:border-bronze transition-colors"
                placeholder="priya@email.com"
              />
            </div>
            <div>
              <label htmlFor="subject" className="font-inter text-[11px] tracking-[0.15em] uppercase text-charcoal-muted block mb-1.5">
                Subject
              </label>
              <select
                id="subject"
                className="w-full bg-ivory border-[0.5px] border-bronze/40 px-4 py-3 font-inter text-sm text-charcoal focus:outline-none focus:border-bronze transition-colors"
              >
                <option>Fragrance Recommendation</option>
                <option>Order Query</option>
                <option>Returns & Exchanges</option>
                <option>Wholesale Enquiry</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label htmlFor="message" className="font-inter text-[11px] tracking-[0.15em] uppercase text-charcoal-muted block mb-1.5">
                Message
              </label>
              <textarea
                id="message"
                rows={5}
                required
                className="w-full bg-ivory border-[0.5px] border-bronze/40 px-4 py-3 font-inter text-sm text-charcoal placeholder:text-charcoal-muted/50 focus:outline-none focus:border-bronze transition-colors resize-none"
                placeholder="Tell us how we can help..."
              />
            </div>
            <button
              type="submit"
              className="w-full btn-primary justify-center"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
