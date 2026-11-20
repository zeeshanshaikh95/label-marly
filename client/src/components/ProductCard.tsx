import { Link } from 'react-router-dom';
import { useSettings } from '@/context/SettingsContext';
import { buildSingleProductMessage, buildWhatsAppLink } from '@/lib/whatsapp';
import { trackEvent } from '@/lib/analytics';
import { formatPrice, truncate } from '@/lib/format';
import { PlaceholderImage } from './PlaceholderImage';
import type { Product } from '@/types';

interface Props {
  product: Product;
}

export function ProductCard({ product }: Props) {
  const { settings, whatsappConfigured } = useSettings();

  const waLink = whatsappConfigured
    ? buildWhatsAppLink(
        settings,
        buildSingleProductMessage(settings, {
          productName: product.name,
          variantName: null,
          quantity: 1,
          price: product.price,
        })
      )
    : null;

  return (
    <article className="group relative flex flex-col">
      <Link
        to={`/product/${product.slug}`}
        className="relative block aspect-[4/5] overflow-hidden bg-brand-50"
        aria-label={`View ${product.name}`}
      >
        {product.images[0] ? (
          <img
            src={product.images[0]}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
        ) : (
          <PlaceholderImage seed={product.slug} />
        )}
        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          {product.featured ? <span className="badge-leaf">New edit</span> : null}
          {product.bestseller ? <span className="badge-pink">Loved</span> : null}
        </div>
      </Link>

      <div className="flex flex-1 flex-col gap-2 pt-4">
        <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-brand-600">
          {product.category?.name ?? 'Label Marly'}
        </p>
        <Link to={`/product/${product.slug}`} className="focus-visible:rounded">
          <h3 className="font-display text-xl font-medium leading-snug text-ink hover:text-brand-700">
            {truncate(product.name, 56)}
          </h3>
        </Link>
        <p className="text-sm font-medium text-ink">{formatPrice(product.price)}</p>
        <p className="line-clamp-2 text-xs font-light leading-relaxed text-ink-soft">
          {product.description}
        </p>

        <div className="mt-auto flex gap-2 pt-3">
          <Link to={`/product/${product.slug}`} className="btn-outline flex-1 !px-3 !py-2.5 text-[10px]">
            Details
          </Link>
          {waLink ? (
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent({ type: 'whatsapp_click', productSlug: product.slug })}
              className="btn-whatsapp flex-1 !px-3 !py-2.5 text-[10px]"
              aria-label={`Enquire about ${product.name}`}
            >
              <WhatsAppGlyph className="h-4 w-4" /> Enquire
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}

export function WhatsAppGlyph({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21.5 3.5L10.5 14.5" />
      <path d="M21.5 3.5l-7 17-4-6.5-6.5-4 17.5-6.5z" />
    </svg>
  );
}
