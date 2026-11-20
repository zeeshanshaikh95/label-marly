import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { publicApi } from '@/api/endpoints';
import { useApi } from '@/hooks/useApi';
import { useSettings } from '@/context/SettingsContext';
import { ProductCard } from '@/components/ProductCard';
import { Seo } from '@/components/seo/Seo';
import { Stars } from '@/components/Stars';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { trackEvent } from '@/lib/analytics';

const PROCESS = [
  {
    title: 'Tell us the moment',
    text: 'A wedding, an Eid lunch, a shoot, a silhouette you have saved for months. We start with the occasion and the feeling.',
  },
  {
    title: 'Design & fabric',
    text: 'Mariam sketches the piece and shortlists fabrics with you — drape, weight, colour and finish all considered.',
  },
  {
    title: 'Made to measure',
    text: 'Your piece is cut, stitched and finished in small batches, with fittings along the way until it is exactly right.',
  },
];

export function HomePage() {
  const { settings } = useSettings();
  const featured = useApi(() => publicApi.listProducts({ sort: 'featured' }).then((r) => r.products), []);
  const gallery = useApi(() => publicApi.listGallery().then((r) => r.items), []);
  const reviews = useApi(() => publicApi.listReviews().then((r) => r.reviews), []);
  const categories = useApi(() => publicApi.listCategories().then((r) => r.categories), []);

  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    trackEvent({ type: 'page_view', path: '/' });
  }, []);

  const slides =
    gallery.data && gallery.data.length
      ? gallery.data.slice(0, 6)
      : [{ _id: 'hero', image: settings.hero.imageUrl, caption: '', externalUrl: '' }];

  const current = slides[slideIndex % slides.length];

  useEffect(() => {
    if (slides.length <= 1) return;
    const t = setInterval(() => setSlideIndex((i) => (i + 1) % slides.length), 5200);
    return () => clearInterval(t);
  }, [slides.length]);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ClothingStore',
    name: settings.businessName,
    description: settings.about.intro,
    ...(settings.instagramUrl ? { sameAs: [settings.instagramUrl] } : {}),
  };

  return (
    <>
      <Seo
        title="Label Marly — Modest Luxury & Custom Couture"
        description="Modest luxury and made-to-order couture by Mariam Hamidani. Abayas, party wear, kaftans and custom pieces designed around you."
        canonicalPath="/"
        jsonLd={jsonLd}
      />

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden bg-ink text-cream" aria-label="Label Marly collection">
        <div className="pointer-events-none absolute -left-40 -top-32 h-[520px] w-[520px] rounded-full bg-brand-600/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-40 right-0 h-[420px] w-[420px] rounded-full bg-brand-400/10 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-14 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-10 lg:py-20">
          <div className="lg:col-span-7">
            <p className="text-[11px] font-medium uppercase tracking-[0.42em] text-brand-300">
              Label Marly · Mariam Hamidani
            </p>
            <h1 className="mt-5 font-display text-5xl font-medium leading-[0.98] sm:text-6xl lg:text-7xl">
              {settings.hero.headline || 'From casual chic to stunning party wear.'}
            </h1>
            <p className="mt-6 max-w-xl text-base font-light leading-relaxed text-cream/70 sm:text-lg">
              {settings.hero.subheadline}
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link to="/shop" className="btn-primary !bg-cream !text-ink hover:!bg-brand-200">
                Explore the collection
              </Link>
              <WhatsAppButton
                message="Hi Label Marly! I would like to know more about your pieces and custom orders."
                label="DM to order"
                className="!border !border-cream/40 !bg-transparent hover:!bg-cream/10"
              />
            </div>

            <div className="mt-11 flex flex-wrap gap-x-10 gap-y-5 border-t border-cream/15 pt-7">
              {[
                { value: 'Made to order', label: 'No mass production' },
                { value: 'Custom sizing', label: 'Cut to measure' },
                { value: 'Small batch', label: 'Finished by hand' },
              ].map((s) => (
                <div key={s.label}>
                  <p className="font-display text-xl font-medium text-brand-300">{s.value}</p>
                  <p className="mt-1 text-[9px] uppercase tracking-[0.22em] text-cream/45">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Portrait slider */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto w-full max-w-[330px] sm:max-w-[360px]">
              <div className="absolute -left-3 -top-3 h-full w-full border border-brand-400/40" aria-hidden="true" />
              <div className="relative aspect-[9/16] overflow-hidden bg-brand-950 shadow-2xl">
                {slides.map((s, i) => (
                  <div
                    key={s._id}
                    className={`absolute inset-0 transition-opacity duration-700 ${
                      i === slideIndex ? 'opacity-100' : 'opacity-0'
                    }`}
                    aria-hidden={i !== slideIndex}
                  >
                    {s.image ? (
                      <img
                        src={s.image}
                        alt={s.caption || 'Label Marly piece'}
                        className="h-full w-full object-cover object-center"
                        loading={i === 0 ? 'eager' : 'lazy'}
                      />
                    ) : null}
                  </div>
                ))}

                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/90 to-transparent p-5 pt-16">
                  <p className="text-[9px] font-semibold uppercase tracking-[0.26em] text-brand-300">
                    {String(slideIndex + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
                  </p>
                  <p className="mt-1.5 line-clamp-2 font-display text-lg leading-snug text-cream">
                    {current?.caption || 'The Label Marly edit'}
                  </p>
                </div>

                {slides.length > 1 ? (
                  <div className="absolute right-4 top-4 flex gap-2">
                    <button
                      type="button"
                      onClick={() => setSlideIndex((i) => (i - 1 + slides.length) % slides.length)}
                      className="flex h-8 w-8 items-center justify-center border border-cream/40 bg-ink/30 text-cream backdrop-blur transition-colors hover:bg-cream hover:text-ink"
                      aria-label="Previous slide"
                    >
                      ←
                    </button>
                    <button
                      type="button"
                      onClick={() => setSlideIndex((i) => (i + 1) % slides.length)}
                      className="flex h-8 w-8 items-center justify-center border border-cream/40 bg-ink/30 text-cream backdrop-blur transition-colors hover:bg-cream hover:text-ink"
                      aria-label="Next slide"
                    >
                      →
                    </button>
                  </div>
                ) : null}
              </div>

              {slides.length > 1 ? (
                <div className="mt-5 flex items-center justify-center gap-2">
                  {slides.map((s, i) => (
                    <button
                      key={s._id}
                      type="button"
                      onClick={() => setSlideIndex(i)}
                      aria-label={`Go to slide ${i + 1}`}
                      className={`h-px transition-all ${
                        i === slideIndex ? 'w-10 bg-brand-300' : 'w-4 bg-cream/25 hover:bg-cream/50'
                      }`}
                    />
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      {/* ── Marquee ───────────────────────────────────────────── */}
      <div className="overflow-hidden border-y border-brand-200 bg-brand-50 py-3.5">
        <div className="marquee-track flex w-max items-center gap-10 whitespace-nowrap">
          {[0, 1].map((n) => (
            <div key={n} className="flex items-center gap-10">
              {['Abayas', 'Party wear', 'Kaftans', 'Custom couture', 'Modest luxury', 'Made to order'].map(
                (word) => (
                  <span key={word} className="flex items-center gap-10">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-brand-800">
                      {word}
                    </span>
                    <span className="text-brand-400">✦</span>
                  </span>
                )
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── Featured edit ─────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-10" aria-labelledby="edit-heading">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow">The new edit</p>
            <h2 id="edit-heading" className="section-title mt-3">
              Pieces to live in
            </h2>
          </div>
          <Link to="/shop" className="btn-outline self-start sm:self-auto">
            View all
          </Link>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.loading
            ? [...Array(4)].map((_, i) => <div key={i} className="skeleton aspect-[4/5]" />)
            : featured.data?.slice(0, 4).map((p) => <ProductCard key={p._id} product={p} />)}
        </div>
      </section>

      {/* ── Designer ──────────────────────────────────────────── */}
      <section className="bg-ink py-20 text-cream" aria-labelledby="designer-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="relative order-2 lg:order-1">
              <div className="aspect-[4/5] overflow-hidden bg-brand-950">
                <img
                  src={settings.about.founderImageUrl || slides[0]?.image}
                  alt="Mariam Hamidani, founder of Label Marly"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="absolute -bottom-6 -right-2 hidden max-w-[220px] border border-brand-400/50 bg-ink p-5 sm:block">
                <p className="font-display text-xl leading-snug text-cream">“Redefine your look.”</p>
                <p className="mt-2 text-[10px] uppercase tracking-[0.2em] text-brand-300">
                  Mariam Hamidani
                </p>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-brand-300">
                The designer
              </p>
              <h2 id="designer-heading" className="mt-4 font-display text-4xl font-medium leading-tight sm:text-5xl">
                Considered clothing, made properly.
              </h2>
              <p className="mt-6 text-sm font-light leading-relaxed text-cream/70">
                {settings.about.intro}
              </p>
              <p className="mt-4 whitespace-pre-line text-sm font-light leading-relaxed text-cream/60">
                {settings.about.story}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/about" className="btn-primary !bg-cream !text-ink hover:!bg-brand-200">
                  Meet Mariam
                </Link>
                <Link to="/gallery" className="btn-outline !border-cream/40 !text-cream hover:!bg-cream/10">
                  See the lookbook
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Collections ───────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-10" aria-labelledby="collections-heading">
        <div className="text-center">
          <p className="eyebrow">Shop by mood</p>
          <h2 id="collections-heading" className="section-title mt-3">
            The Label Marly wardrobe
          </h2>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.data?.map((cat) => (
            <Link key={cat._id} to={`/category/${cat.slug}`} className="group relative aspect-[3/4] overflow-hidden bg-brand-50">
              {cat.image ? (
                <img
                  src={cat.image}
                  alt={cat.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              ) : null}
              <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <h3 className="font-display text-2xl font-medium text-cream">{cat.name}</h3>
                <p className="mt-1 line-clamp-2 text-[11px] font-light text-cream/65">{cat.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Atelier process ───────────────────────────────────── */}
      <section className="bg-brand-50/70 py-20" aria-labelledby="process-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
          <div className="max-w-2xl">
            <p className="eyebrow">The atelier</p>
            <h2 id="process-heading" className="section-title mt-3">
              How a Label Marly piece comes to life.
            </h2>
          </div>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {PROCESS.map((step, i) => (
              <div key={step.title} className="border-t border-brand-300 pt-6">
                <span className="font-display text-3xl text-brand-500">0{i + 1}</span>
                <h3 className="mt-3 font-display text-2xl font-medium">{step.title}</h3>
                <p className="mt-3 text-sm font-light leading-relaxed text-ink-soft">{step.text}</p>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <WhatsAppButton
              message="Hi Label Marly! I'd like to book a custom design consultation."
              label="Book a consultation"
              className="!bg-ink !text-cream hover:!bg-brand-700"
            />
          </div>
        </div>
      </section>

      {/* ── Lookbook ──────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-10" aria-labelledby="lookbook-heading">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow">The lookbook</p>
            <h2 id="lookbook-heading" className="section-title mt-3">
              @label.marly
            </h2>
          </div>
          <a
            href={settings.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline self-start sm:self-auto"
          >
            Follow on Instagram
          </a>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {slides.slice(0, 6).map((g) => (
            <a
              key={g._id}
              href={g.externalUrl || settings.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-[3/4] overflow-hidden bg-brand-100"
            >
              {g.image ? (
                <img
                  src={g.image}
                  alt={g.caption || 'Label Marly piece'}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              ) : null}
              <div className="absolute inset-0 bg-ink/0 transition-colors group-hover:bg-ink/25" />
            </a>
          ))}
        </div>
      </section>

      {/* ── Testimonials ──────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-10" aria-labelledby="reviews-heading">
        <div className="text-center">
          <p className="eyebrow">Client love</p>
          <h2 id="reviews-heading" className="section-title mt-3">
            Worn, loved, reordered.
          </h2>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {reviews.data?.slice(0, 4).map((r) => (
            <figure key={r._id} className="border border-brand-200 bg-white p-6">
              <Stars rating={r.rating} />
              <blockquote className="mt-4 text-sm font-light leading-relaxed text-ink-soft">
                “{r.text}”
              </blockquote>
              <figcaption className="mt-5 text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-700">
                {r.customerName}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-ink py-20 text-cream">
        <img
          src={slides[0]?.image}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-20"
          loading="lazy"
        />
        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-brand-300">
            Made for you
          </p>
          <h2 className="mt-4 font-display text-4xl font-medium leading-tight sm:text-6xl">
            Tell us the moment. We will make the piece.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-sm font-light leading-relaxed text-cream/70">
            Sizing, fabric and custom requests are handled personally over DM. Send us your idea,
            your date and your city — we will take it from there.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <WhatsAppButton
              message="Hi Label Marly! I'd like to discuss a custom order."
              label="DM to order"
              size="lg"
              className="!bg-cream !text-ink hover:!bg-brand-200"
            />
            <Link to="/contact" className="btn-outline !border-cream/40 !text-cream hover:!bg-cream/10">
              Custom orders
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
