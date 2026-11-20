import { Link } from 'react-router-dom';
import { useSettings } from '@/context/SettingsContext';
import { WhatsAppGlyph } from '@/components/ProductCard';
import { LOGO_TRANSPARENT } from '@/lib/brand';

export function Footer() {
  const { settings } = useSettings();

  const dmLink = settings.whatsappNumber || settings.instagramUrl;

  return (
    <footer className="mt-24 bg-ink text-cream">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 md:grid-cols-12 lg:px-10">
        <div className="md:col-span-5">
          <img
            src={LOGO_TRANSPARENT}
            alt="Label Marly"
            width={1080}
            height={1080}
            loading="lazy"
            className="h-20 w-auto object-contain"
          />
          <p className="mt-5 max-w-sm text-sm font-light leading-relaxed text-cream/65">
            Modest luxury and made-to-order couture by Mariam Hamidani. From casual chic to
            stunning party wear — pieces designed around you.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {settings.instagramUrl ? (
              <a
                href={settings.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-cream/25 px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-cream transition-colors hover:border-brand-400 hover:text-brand-300"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
                </svg>
                @label.marly
              </a>
            ) : null}
            {dmLink ? (
              <a
                href={dmLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-cream/25 px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-cream transition-colors hover:border-brand-400 hover:text-brand-300"
              >
                <WhatsAppGlyph className="h-4 w-4" /> DM to order
              </a>
            ) : null}
          </div>
        </div>

        <nav className="md:col-span-3" aria-label="Footer">
          <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-brand-300">Explore</p>
          <ul className="mt-5 space-y-3 text-sm font-light">
            <li><Link to="/shop" className="text-cream/70 hover:text-brand-300">The collection</Link></li>
            <li><Link to="/gallery" className="text-cream/70 hover:text-brand-300">Lookbook</Link></li>
            <li><Link to="/about" className="text-cream/70 hover:text-brand-300">The designer</Link></li>
            <li><Link to="/reviews" className="text-cream/70 hover:text-brand-300">Client love</Link></li>
            <li><Link to="/contact" className="text-cream/70 hover:text-brand-300">Custom orders</Link></li>
          </ul>
        </nav>

        <div className="md:col-span-4">
          <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-brand-300">The atelier</p>
          <p className="mt-5 font-display text-2xl leading-snug">
            Made to order.
            <span className="mt-1 block font-body text-sm font-light uppercase tracking-[0.18em] text-cream/60">
              Made to measure · Small batch
            </span>
          </p>
          <p className="mt-4 text-sm font-light leading-relaxed text-cream/60">
            Sizing, fabric and finishing are confirmed personally over DM before your piece is cut.
            Custom orders typically take 3–6 weeks.
          </p>
        </div>
      </div>

      <div className="border-t border-cream/10 px-4 py-6 sm:px-6 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 text-[10px] uppercase tracking-[0.16em] text-cream/40 sm:flex-row">
          <p>© {new Date().getFullYear()} Label Marly. All rights reserved.</p>
          <p>Designed by Mariam Hamidani · Mumbai</p>
          <Link
            to="/admin/login"
            className="text-cream/30 underline decoration-transparent underline-offset-2 transition-colors hover:text-cream/60 hover:decoration-current"
          >
            Admin Login
          </Link>
        </div>
      </div>
    </footer>
  );
}
