import { Link } from 'react-router-dom';
import { publicApi } from '@/api/endpoints';
import { useApi } from '@/hooks/useApi';
import { useSettings } from '@/context/SettingsContext';
import { EmptyState } from '@/components/EmptyState';
import { Seo } from '@/components/seo/Seo';
import { PlaceholderImage } from '@/components/PlaceholderImage';

export function GalleryPage() {
  const { data, loading, error, refetch } = useApi(
    () => publicApi.listGallery().then((r) => r.items),
    []
  );
  const { settings } = useSettings();

  return (
    <>
      <Seo
        title="Lookbook"
        description="The Label Marly lookbook — abayas, occasion wear, kaftans and custom pieces by Mariam Hamidani."
        canonicalPath="/gallery"
      />

      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-10">
        <header className="max-w-3xl">
          <p className="eyebrow">The lookbook</p>
          <h1 className="mt-3 font-display text-5xl font-medium leading-none sm:text-6xl">
            Worn by you.
          </h1>
          <p className="mt-5 text-sm font-light leading-relaxed text-ink-soft">
            A glimpse of recent pieces, fittings and client moments. Follow along on Instagram for
            new drops, fabrics and behind-the-scenes from the studio.
          </p>
        </header>

        {loading ? (
          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {[...Array(6)].map((_, i) => <div key={i} className="skeleton aspect-[3/4]" />)}
          </div>
        ) : error ? (
          <div className="mt-10">
            <EmptyState icon="error" title="Couldn't load the lookbook" description={error} action={<button className="btn-outline" onClick={() => refetch()}>Try again</button>} />
          </div>
        ) : !data?.length ? (
          <div className="mt-10">
            <EmptyState
              title="Lookbook coming soon"
              description="We're curating our favourite moments — follow along on Instagram in the meantime."
            />
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {data.map((g) => {
              const body = (
                <>
                  {g.image ? (
                    <img src={g.image} alt={g.caption || 'Label Marly piece'} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 hover:scale-105" />
                  ) : (
                    <PlaceholderImage seed={`ig-${g._id}`} />
                  )}
                  {g.caption ? (
                    <p className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/85 to-transparent p-4 pt-10 text-[10px] font-medium uppercase tracking-[0.16em] text-cream">
                      {g.caption}
                    </p>
                  ) : null}
                </>
              );
              return g.externalUrl ? (
                <a key={g._id} href={g.externalUrl} target="_blank" rel="noopener noreferrer" className="group relative aspect-[3/4] overflow-hidden bg-brand-50">
                  {body}
                </a>
              ) : (
                <div key={g._id} className="group relative aspect-[3/4] overflow-hidden bg-brand-50">
                  {body}
                </div>
              );
            })}
          </div>
        )}

        <div className="mt-12 flex flex-wrap justify-center gap-3">
          <a href={settings.instagramUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
            Follow on Instagram
          </a>
          <Link to="/shop" className="btn-outline">Shop the collection</Link>
        </div>
      </div>
    </>
  );
}
