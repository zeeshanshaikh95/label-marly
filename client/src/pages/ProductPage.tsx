import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { publicApi } from '@/api/endpoints';
import { useApi } from '@/hooks/useApi';
import { useSettings } from '@/context/SettingsContext';
import { buildSingleProductMessage } from '@/lib/whatsapp';
import { trackEvent } from '@/lib/analytics';
import { formatPrice } from '@/lib/format';
import { PlaceholderImage } from '@/components/PlaceholderImage';
import { ProductCard } from '@/components/ProductCard';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { Stars } from '@/components/Stars';
import { Seo } from '@/components/seo/Seo';
import { EmptyState } from '@/components/EmptyState';

export function ProductPage() {
  const { slug = '' } = useParams();
  const { settings } = useSettings();

  const { data, loading, error } = useApi(
    () => publicApi.getProduct(slug).then((r) => r.product),
    [slug]
  );
  const related = useApi(
    () => publicApi.getRelated(slug).then((r) => r.products).catch(() => []),
    [slug]
  );
  const reviews = useApi(() => publicApi.listReviews().then((r) => r.reviews), []);

  const product = data;
  const [activeImage, setActiveImage] = useState(0);
  const [size, setSize] = useState<string | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    setActiveImage(0);
    setSize(null);
    setLightboxOpen(false);
  }, [slug]);

  useEffect(() => {
    if (product) trackEvent({ type: 'product_view', productSlug: product.slug });
  }, [product?.slug]);

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="skeleton aspect-[4/5]" />
          <div className="space-y-4">
            <div className="skeleton h-8 w-3/4" />
            <div className="skeleton h-6 w-1/3" />
            <div className="skeleton h-24" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
        <EmptyState
          icon="error"
          title="Piece not found"
          description={error ?? 'It may have sold out or been renamed.'}
          action={<Link to="/shop" className="btn-primary">Back to the collection</Link>}
        />
      </div>
    );
  }

  const orderMessage = buildSingleProductMessage(settings, {
    productName: product.name,
    variantName: size,
    quantity: 1,
    price: product.price,
  });

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description || undefined,
    image: product.images.length ? product.images : undefined,
    sku: product._id,
    brand: { '@type': 'Brand', name: settings.businessName },
    ...(product.price !== null
      ? {
          offers: {
            '@type': 'Offer',
            price: product.price,
            priceCurrency: 'INR',
            availability: 'https://schema.org/InStock',
          },
        }
      : {}),
  };

  return (
    <>
      <Seo
        title={product.seoTitle || product.name}
        description={product.seoDescription || product.description.slice(0, 160)}
        canonicalPath={`/product/${product.slug}`}
        ogType="product"
        imageUrl={product.images[0]}
        jsonLd={jsonLd}
      />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-10">
        <nav aria-label="Breadcrumb" className="text-[10px] uppercase tracking-[0.16em] text-ink-soft">
          <ol className="flex flex-wrap items-center gap-2">
            <li><Link to="/" className="hover:text-brand-700">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li><Link to="/shop" className="hover:text-brand-700">Collection</Link></li>
            {product.category ? (
              <>
                <li aria-hidden="true">/</li>
                <li>
                  <Link to={`/category/${product.category.slug}`} className="hover:text-brand-700">
                    {product.category.name}
                  </Link>
                </li>
              </>
            ) : null}
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-ink">{product.name}</li>
          </ol>
        </nav>

        <div className="mt-8 grid gap-10 lg:grid-cols-2">
          <div>
            <button
              type="button"
              className="relative block aspect-[4/5] w-full overflow-hidden bg-brand-50"
              onClick={() => setLightboxOpen(true)}
              aria-label="Open image gallery"
            >
              {product.images[activeImage] ? (
                <img
                  src={product.images[activeImage]}
                  alt={`${product.name} — image ${activeImage + 1}`}
                  className="h-full w-full object-cover"
                />
              ) : (
                <PlaceholderImage seed={product.slug} />
              )}
            </button>

            {product.images.length > 1 && (
              <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
                {product.images.map((img, i) => (
                  <button
                    key={img}
                    type="button"
                    onClick={() => setActiveImage(i)}
                    className={`h-16 w-16 shrink-0 overflow-hidden border transition-colors ${
                      i === activeImage ? 'border-brand-600' : 'border-transparent opacity-70'
                    }`}
                    aria-label={`Show image ${i + 1}`}
                    aria-pressed={i === activeImage}
                  >
                    <img src={img} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col justify-center">
            <p className="eyebrow">{product.category?.name ?? 'Label Marly'}</p>
            <h1 className="mt-3 font-display text-4xl font-medium leading-[1.05] sm:text-5xl">
              {product.name}
            </h1>

            <p className="mt-4 text-2xl font-medium text-ink">{formatPrice(product.price)}</p>
            {product.compareAtPrice && product.price !== null && product.compareAtPrice > product.price ? (
              <p className="mt-1 text-sm text-ink-soft">
                <s>{formatPrice(product.compareAtPrice)}</s>{' '}
                <span className="font-semibold text-brand-700">
                  Save {formatPrice(product.compareAtPrice - product.price)}
                </span>
              </p>
            ) : null}
            <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-700">
              {product.size}
            </p>

            <p className="mt-6 whitespace-pre-line text-sm font-light leading-relaxed text-ink-soft">
              {product.description}
            </p>

            {product.variants.length > 0 && (
              <fieldset className="mt-7">
                <legend className="label">Select size</legend>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((v) => (
                    <button
                      key={v.name}
                      type="button"
                      onClick={() => setSize(v.name)}
                      aria-pressed={size === v.name}
                      className={`min-w-[3rem] border px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.12em] transition-colors ${
                        size === v.name
                          ? 'border-ink bg-ink text-cream'
                          : 'border-brand-200 bg-white text-ink hover:border-brand-500'
                      }`}
                    >
                      {v.name}
                    </button>
                  ))}
                </div>
              </fieldset>
            )}

            <div className="mt-8 flex flex-wrap gap-3">
              <WhatsAppButton
                message={orderMessage}
                event="order_whatsapp_click"
                productSlug={product.slug}
                label="DM to order"
                size="lg"
              />
              <a
                href={settings.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
              >
                View on Instagram
              </a>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-px border border-brand-200 bg-brand-200 text-center sm:grid-cols-4">
              {[
                { k: 'Made', v: 'To order' },
                { k: 'Sizing', v: 'Standard / custom' },
                { k: 'Lead time', v: '7–14 days' },
                { k: 'Care', v: 'See below' },
              ].map((x) => (
                <div key={x.k} className="bg-cream p-3">
                  <p className="text-[9px] uppercase tracking-[0.18em] text-ink-soft">{x.k}</p>
                  <p className="mt-1 text-xs font-medium text-ink">{x.v}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <section className="mt-16 grid gap-10 border-t border-brand-200 pt-12 md:grid-cols-2" aria-label="Piece information">
          <div className="space-y-10">
            {product.ingredients.length > 0 && (
              <div>
                <h2 className="font-display text-3xl font-medium">Fabric &amp; finish</h2>
                <ul className="mt-4 grid grid-cols-2 gap-3">
                  {product.ingredients.map((item) => (
                    <li key={item} className="border-l border-brand-400 pl-3 text-sm font-light text-ink-soft">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {product.benefits.length > 0 && (
              <div>
                <h2 className="font-display text-3xl font-medium">The details</h2>
                <ul className="mt-4 space-y-3">
                  {product.benefits.map((b) => (
                    <li key={b} className="flex gap-3 text-sm font-light text-ink-soft">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand-500" aria-hidden="true" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="space-y-10">
            {product.howToUse && (
              <div>
                <h2 className="font-display text-3xl font-medium">Made to order</h2>
                <p className="mt-4 whitespace-pre-line text-sm font-light leading-relaxed text-ink-soft">
                  {product.howToUse}
                </p>
              </div>
            )}
            {product.warnings && (
              <div className="border border-brand-300 bg-brand-50 p-5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-800">
                  Fabric care
                </p>
                <p className="mt-2 text-sm font-light leading-relaxed text-brand-900">{product.warnings}</p>
              </div>
            )}
          </div>
        </section>

        {reviews.data?.length ? (
          <section className="mt-16 border-t border-brand-200 pt-12" aria-labelledby="pdp-reviews">
            <h2 id="pdp-reviews" className="section-title">Client love</h2>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {reviews.data.slice(0, 3).map((r) => (
                <figure key={r._id} className="border border-brand-200 p-6">
                  <Stars rating={r.rating} />
                  <blockquote className="mt-3 text-sm font-light leading-relaxed text-ink-soft">“{r.text}”</blockquote>
                  <figcaption className="mt-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-700">
                    {r.customerName}
                  </figcaption>
                </figure>
              ))}
            </div>
          </section>
        ) : null}

        {related.data?.length ? (
          <section className="mt-16 border-t border-brand-200 pt-12" aria-labelledby="related-heading">
            <div className="flex items-end justify-between gap-4">
              <h2 id="related-heading" className="section-title">You may also love</h2>
              <Link to="/shop" className="btn-outline">View all</Link>
            </div>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {related.data.slice(0, 4).map((p) => <ProductCard key={p._id} product={p} />)}
            </div>
          </section>
        ) : null}
      </div>

      {lightboxOpen && product.images.length > 0 && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-ink/90 p-4 animate-fade-in"
          role="dialog"
          aria-modal="true"
          aria-label={`${product.name} image gallery`}
          onClick={() => setLightboxOpen(false)}
        >
          <button type="button" className="absolute right-4 top-4 p-2 text-cream hover:text-brand-300" aria-label="Close gallery">
            <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" /></svg>
          </button>
          <img
            src={product.images[activeImage]}
            alt={`${product.name} — image ${activeImage + 1}`}
            className="max-h-[85vh] max-w-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
