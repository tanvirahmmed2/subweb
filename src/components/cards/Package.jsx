import Link from 'next/link'
import Image from 'next/image'

export default function PackageCard({ pkg }) {
  const { name, slug, description, price, discount, image, features = [] } = pkg
  const finalPrice = discount > 0 ? price - Math.round((price * discount) / 100) : price

  return (
    <div className="flex flex-col h-full rounded-2xl overflow-hidden border border-primary/18 bg-tertiary hover:shadow-xl hover:shadow-primary/12 hover:-translate-y-1 transition-all duration-200">

      {/* Image / gradient header */}
      {image ? (
        <div className="relative w-full aspect-[2/1] bg-primary/5">
          <Image src={image} alt={name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 380px" />
        </div>
      ) : (
        <div className="w-full aspect-[2/1] bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center">
          <span className="text-5xl text-white/80">⬡</span>
        </div>
      )}

      <div className="flex flex-col flex-1 p-6">
        {/* Name */}
        <h3 className="text-lg font-extrabold mb-1.5" style={{ color: 'var(--foreground)' }}>{name}</h3>

        {description && (
          <p className="text-sm text-primary-dark leading-relaxed line-clamp-2 mb-4">{description}</p>
        )}

        {/* Price row */}
        <div className="flex items-baseline gap-2 mb-5">
          <span className="text-2xl font-extrabold text-primary">
            {price === 0 ? 'Free' : `$${finalPrice}`}
          </span>
          {discount > 0 && price > 0 && (
            <>
              <span className="text-base line-through text-primary-dark/60">${price}</span>
              <span className="text-xs font-bold text-white bg-secondary px-2 py-0.5 rounded-full">-{discount}%</span>
            </>
          )}
        </div>

        {/* Feature list */}
        {features.length > 0 && (
          <ul className="flex flex-col gap-2 list-none p-0 m-0 mb-6 flex-1">
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
        <Link
          href={`/packages/${slug}`}
          className="mt-auto block text-center py-2.5 bg-primary hover:bg-primary-dark text-white font-bold text-[0.9375rem] rounded-xl no-underline transition-colors duration-150"
        >
          View Details
        </Link>
      </div>
    </div>
  )
}
