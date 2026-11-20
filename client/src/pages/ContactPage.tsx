import { useSettings } from '@/context/SettingsContext';
import { Seo } from '@/components/seo/Seo';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { WhatsAppGlyph } from '@/components/ProductCard';

export function ContactPage() {
  const { settings, whatsappConfigured } = useSettings();

  return (
    <>
      <Seo
        title="Custom Orders & Contact"
        description="Order Label Marly pieces, request custom sizing or start a made-to-order commission with Mariam Hamidani."
        canonicalPath="/contact"
      />

      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-10">
        <header className="max-w-3xl">
          <p className="eyebrow">Get in touch</p>
          <h1 className="mt-3 font-display text-5xl font-medium leading-none sm:text-6xl">
            Let's make it yours.
          </h1>
          <p className="mt-5 text-sm font-light leading-relaxed text-ink-soft">
            Ready-to-order pieces, custom sizing, or a fully bespoke commission — the easiest way
            to reach the studio is a DM on Instagram. Share your piece, size and date and we'll
            take it from there.
          </p>
        </header>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          <div className="border border-brand-300 bg-ink p-8 text-cream">
            <WhatsAppGlyph className="h-8 w-8 text-brand-300" />
            <h2 className="mt-5 font-display text-3xl font-medium">Order a piece</h2>
            <p className="mt-3 text-sm font-light leading-relaxed text-cream/65">
              Ask about sizing, fabric, current availability and delivery timelines. We reply
              personally from the studio.
            </p>
            <div className="mt-6">
              {whatsappConfigured ? (
                <WhatsAppButton
                  message="Hi Label Marly! I'd like to order a piece from your collection."
                  label="DM to order"
                  className="!bg-cream !text-ink hover:!bg-brand-200"
                />
              ) : (
                <a
                  href={settings.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary !bg-cream !text-ink"
                >
                  DM on Instagram
                </a>
              )}
            </div>
          </div>

          <div className="border border-brand-200 bg-white p-8">
            <span className="font-display text-3xl text-brand-500">02</span>
            <h2 className="mt-5 font-display text-3xl font-medium text-ink">Custom orders</h2>
            <p className="mt-3 text-sm font-light leading-relaxed text-ink-soft">
              Occasion wear, bridal-adjacent looks or a silhouette that exists only in your head.
              We design from scratch around you.
            </p>
            <div className="mt-6">
              <WhatsAppButton
                message="Hi Label Marly! I'd like to start a custom order. The occasion is:"
                label="Enquire about custom"
                className="!bg-ink !text-cream hover:!bg-brand-700 hover:!text-ink"
              />
            </div>
          </div>

          <div className="border border-brand-200 bg-white p-8">
            <span className="font-display text-3xl text-brand-500">03</span>
            <h2 className="mt-5 font-display text-3xl font-medium text-ink">Instagram</h2>
            <p className="mt-3 text-sm font-light leading-relaxed text-ink-soft">
              New drops, behind-the-scenes and client features go live on Instagram first. Our DMs
              are always open.
            </p>
            <a
              href={settings.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline mt-6"
            >
              @label.marly
            </a>
          </div>
        </div>

        <div className="mt-14 grid gap-8 border-t border-brand-200 pt-10 md:grid-cols-2">
          <div>
            <p className="eyebrow">How it works</p>
            <h2 className="mt-3 font-display text-4xl font-medium">From DM to delivery</h2>
            <p className="mt-3 text-sm font-light leading-relaxed text-ink-soft">
              1. Share the piece or occasion.
              <br />
              2. Confirm fabric, size and timeline.
              <br />
              3. We cut and finish your piece to order.
              <br />
              4. Delivery or collection, confirmed with you.
            </p>
          </div>
          <div>
            <p className="eyebrow">Good to know</p>
            <h2 className="mt-3 font-display text-4xl font-medium">Made to measure</h2>
            <p className="mt-3 text-sm font-light leading-relaxed text-ink-soft">
              Standard sizes and custom measurements are both available. Made-to-order pieces
              typically take 7–14 working days; custom commissions take 3–6 weeks depending on
              detail. Timelines are always confirmed before we begin.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
