import Link from 'next/link'
import Image from 'next/image'

export default function PackageCard({ pkg }) {
  const { name, slug, description, price, discount, image, features = [] } = pkg
  const finalPrice = discount > 0 ? price - discount : price

  return (
    <Link
      href={`/packages/${slug}`}
      className="group flex flex-col h-full rounded-sm overflow-hidden border border-primary/15 bg-tertiary hover:shadow-xl hover:shadow-primary/12 hover:-translate-y-1 transition-all duration-200 no-underline"
    >
      {image ? (
        <div className="relative w-full aspect-video bg-primary/5 overflow-hidden">
          <Image src={image} alt={name} fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="(max-width: 768px) 100vw, 380px" />
        </div>
      ) : (
        <div className="w-full aspect-video bg-linear-to-br from-primary to-primary-dark flex items-center justify-center">
          <span className="text-5xl text-white/80">⬡</span>
        </div>
      )}

      <div className="flex flex-col flex-1 p-5">
        <h3 className="text-lg font-bold mb-1.5" style={{ color: 'var(--foreground)' }}>{name}</h3>

        {description && (
          <div
            className="text-sm text-primary-dark leading-relaxed line-clamp-2 flex-1 mb-4"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        )}

        {/* Price row */}
        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-2xl font-semibold text-primary">
            {finalPrice <= 0 ? 'Free' : `$${finalPrice}`}
          </span>
          {discount > 0 && price > 0 && (
            <>
              <span className="text-base line-through text-primary-dark/60">${price}</span>
              <span className="text-xs font-bold text-white bg-secondary px-2 py-0.5 rounded-full">-${discount}</span>
            </>
          )}
        </div>

        {/* Feature list */}
        {features.length > 0 && (
          <ul className="flex flex-col gap-2 list-none p-0 m-0 mb-5 flex-1">
            {features.slice(0, 5).map((f) => (
              <li
                key={f.name}
                className={`flex items-center gap-2 text-sm ${f.included ? '' : 'opacity-45'}`}
                style={{ color: 'var(--foreground)' }}
              >
                <span className={`text-base flex-shrink-0 ${f.included ? 'text-primary' : 'text-primary-dark'}`}>
                  {f.included ? '✓' : '✗'}
                </span>
                {f.name}
              </li>
            ))}
          </ul>
        )}

        {/* CTA */}
        <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:text-primary-dark transition-colors mt-auto">
          View Package →
        </span>
      </div>
    </Link>
  )
}
