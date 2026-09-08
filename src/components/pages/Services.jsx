import Image from 'next/image'
import Link from 'next/link'

const details = [
  {
    id: 1,
    title: "Online Orders & Secure Checkout",
    description:
      "Provide a smooth shopping experience with product browsing, cart management, secure checkout, and multiple payment options.",
    image: '/online-orders-and-secure-checkout.jpg',
  },
  {
    id: 2,
    title: "Responsive Shopping Experience",
    description:
      "A fully responsive interface that works smoothly across desktops, tablets, and mobile devices.",
    image: '/responsive-shopping-experience.jpg',
  },
  {
    id: 3,
    title: "Customer & Sales Management",
    description:
      "Manage customers, orders, purchase history, sales records, and important business insights from one dashboard.",
    image:'/customer-and-sales-management.jpg',
  },
  {
    id: 4,
    title: "Inventory & Store Management",
    description:
      "Track product stock, manage inventory, monitor low-stock items, and organize multiple stores or branches efficiently.",
    image: '/inventory-and-store-management.jpg',
  },
]

export default function Services() {
  return (
    <section className="py-24 px-6" style={{ background: 'var(--background)' }}>
      <div className="w-full">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-14">
          <div>
            <span className="inline-block px-3 py-0.5 rounded-full text-[0.75rem] font-bold tracking-widest uppercase mb-3 bg-primary/10 text-primary">
              What We Do
            </span>
            <h2 className="text-[clamp(1.6rem,3.5vw,2.4rem)] font-extrabold tracking-tight m-0" style={{ color: 'var(--foreground)' }}>
              Our Expert <span className="text-primary">Services</span>
            </h2>
          </div>
          <Link
            href="/contact"
            className="font-semibold text-[0.9375rem] no-underline text-secondary hover:text-secondary-dark transition-colors"
          >
            Request custom work →
          </Link>
        </div>

        <div className="w-full flex flex-col gap-4">
          {details.map((service) => (
            <div key={service.id}>
              <p>{service.title}</p>
                <Image src={service.image} alt={service.title} width={1000} height={1000} className='w-full aspect-5/2 object-cover'/>
                <p>{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
