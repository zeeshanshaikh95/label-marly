import { Link } from 'react-router-dom';
import { useSettings } from '@/context/SettingsContext';
import { Seo } from '@/components/seo/Seo';
import { WhatsAppButton } from '@/components/WhatsAppButton';

const VALUES = [
  {
    title: 'Made to order',
    text: 'Nothing is mass produced. Each piece is cut for its wearer, which means less waste and a far better fit.',
  },
  {
    title: 'Fabric first',
    text: 'Drape, weight and finish are chosen before anything else. If the fabric is not right, the piece is not right.',
  },
  {
    title: 'Detail, quietly',
    text: 'Lace trims, hand finishing and considered linings — the details you feel more than you see.',
  },
];

export function AboutPage() {
  const { settings } = useSettings();

  return (
    <>
      <Seo
        title="The Designer"
        description="Meet Mariam Hamidani, the certified fashion designer behind Label Marly — modest luxury and made-to-order couture."
        canonicalPath="/about"
      />

      <section className="border-b border-brand-200">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-10">
          <p className="eyebrow">The designer</p>
          <h1 className="mt-4 max-w-4xl font-display text-5xl font-medium leading-[0.98] sm:text-7xl">
            Mariam Hamidani. Label Marly.
          </h1>
          <p className="mt-6 max-w-2xl text-base font-light leading-relaxed text-ink-soft">
            {settings.about.intro}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-10">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="aspect-[4/5] overflow-hidden bg-brand-50">
            <img
              src={settings.about.founderImageUrl}
              alt="Mariam Hamidani, founder of Label Marly"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
          <div>
            <p className="font-display text-3xl leading-snug text-ink sm:text-4xl">
              “From casual chic to stunning party wear — the goal has always been to help people
              feel like the best version of themselves.”
            </p>
            <p className="mt-6 text-[10px] font-semibold uppercase tracking-[0.24em] text-brand-700">
              Mariam Hamidani · Founder &amp; Designer
            </p>
            <div className="mt-8 whitespace-pre-line text-sm font-light leading-relaxed text-ink-soft">
              {settings.about.story}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/shop" className="btn-primary">Shop the collection</Link>
              <WhatsAppButton
                message="Hi Label Marly! I'd love to know more about your custom designs."
                label="Say hello"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-ink py-16 text-cream">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-brand-300">
            What we believe
          </p>
          <div className="mt-8 grid gap-px bg-cream/15 md:grid-cols-3">
            {VALUES.map((v, i) => (
              <div key={v.title} className="bg-ink p-8">
                <span className="font-display text-3xl text-brand-300/70">0{i + 1}</span>
                <h2 className="mt-4 font-display text-2xl font-medium">{v.title}</h2>
                <p className="mt-3 text-sm font-light leading-relaxed text-cream/60">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-10">
        <p className="eyebrow">Custom orders</p>
        <h2 className="mx-auto mt-4 max-w-2xl font-display text-4xl font-medium leading-tight sm:text-5xl">
          Have something particular in mind?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-sm font-light leading-relaxed text-ink-soft">
          Send us your occasion, date and inspiration. Mariam will guide you through fabric,
          silhouette and timeline — from first sketch to final fitting.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/contact" className="btn-primary">Start a custom order</Link>
          <Link to="/gallery" className="btn-outline">See the lookbook</Link>
        </div>
      </section>
    </>
  );
}
