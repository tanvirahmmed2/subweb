import Image from 'next/image'
import Link from 'next/link'

const details = [
  {
    id: 1,
    title: "Online Orders & Secure Checkout",
    description:
      "Deliver an effortless, end-to-end shopping journey engineered to maximize sales conversions and minimize cart abandonment. Our high-performance order processing architecture incorporates intuitive product discovery, fast predictive search, dynamic real-time shopping cart management, and a streamlined, friction-free checkout workflow. To protect your business and inspire customer trust, every transaction is shielded with enterprise-grade SSL encryption and full PCI-DSS compliance. The platform integrates seamlessly with industry-leading payment gateways—including Stripe, PayPal, Apple Pay, Google Pay, Buy Now Pay Later (BNPL) services, and localized banking options. In addition, automated tax rate computations, live shipping fee estimations, instant email/SMS order confirmations, and self-service digital invoicing ensure a reliable, world-class purchasing experience from the initial cart addition to final doorstep delivery.",
    image: '/online-orders-and-secure-checkout.jpg',
  },
  {
    id: 2,
    title: "Responsive Shopping Experience",
    description:
      "Empower your customers to discover, browse, and purchase effortlessly on any device with an adaptable, mobile-first design system crafted for exceptional visual appeal and peak performance. Every storefront layout, high-definition product gallery, navigation drawer, and checkout screen dynamically reshapes to provide pixel-perfect fidelity across smartphones, tablets, laptops, and ultra-wide desktop monitors. Engineered with ultra-fast page load times, sub-second asset delivery, and strict adherence to Google Core Web Vitals standards, the interface features tactile touch-friendly gesture controls, responsive image compression, and fluid micro-animations that together produce a native-app-quality experience directly within the browser, dramatically decreasing bounce rates while enhancing your organic search engine rankings.",
    image: '/responsive-shopping-experience.jpg',
  },
  {
    id: 3,
    title: "Customer & Sales Management",
    description:
      "Transform one-time buyers into loyal brand advocates through an integrated, intelligent customer relationship management (CRM) and sales operations center. Gain complete visibility into every customer's journey with comprehensive buyer profiles that track lifetime purchase histories, average order values, frequency of visits, and detailed support interactions from a single, centralized dashboard. Easily group your audience into dynamic customer segments for targeted email marketing campaigns, manage customer inquiries and support tickets efficiently, and process returns, exchanges, or store credits with speed and precision. Equipped with automated re-engagement workflows, customer lifetime value (LTV) analytics, and staff activity logs, this system equips your team with the intelligence needed to deliver exceptional service while steadily scaling repeat revenue.",
    image: '/customer-and-sales-management.jpg',
  },
  {
    id: 4,
    title: "Inventory & Store Management",
    description:
      "Maintain complete, error-free command over your entire product catalog, supply chain, and retail locations with an advanced multi-channel inventory management system. Instantaneous bi-directional stock synchronization keeps product counts aligned across all your online storefronts, digital channels, and physical brick-and-mortar points of sale simultaneously, eliminating the risk of accidental overselling or frustrating out-of-stock experiences. Set customizable automated low-stock warnings, trigger instant purchase orders to suppliers, and manage multi-warehouse fulfillment routes with ease. With comprehensive support for bulk CSV/Excel product imports, barcode scanner workflows, complex variant matrices (such as custom sizes, colors, and materials), and tiered wholesale pricing, managing your store's operations becomes effortless and reliable.",
    image: '/inventory-and-store-management.jpg',
  },
  {
    id: 5,
    title: "Sales Analytics & Business Reports",
    description:
      "Empower your leadership team to make proactive, data-driven decisions with comprehensive financial analytics, revenue tracking, and automated business intelligence reporting. Monitor key performance indicators in real time through interactive visual dashboards that break down gross sales, net profits, conversion funnels, refund rates, and sales velocity across specific product lines or geographic regions. Generate GAAP-ready accounting statements, exportable tax reports, and staff performance metrics in CSV, Excel, or PDF formats with a single click. By translating complex transactional data into actionable commercial insights, you can accurately forecast seasonal inventory demand, fine-tune your pricing strategies, optimize marketing spend, and identify high-growth market opportunities with total clarity.",
    image: '/sales-and-business-reports.jpg',
  },
]

export default function Services() {
  return (
    <section className="py-24 px-6" style={{ background: 'var(--background)' }}>
      <div className="w-full">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-14">
          <div>
            <h2 className="text-[clamp(1.6rem,3.5vw,2.4rem)] font-semibold tracking-tight m-0" style={{ color: 'var(--foreground)' }}>
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

        <div className="w-full flex flex-col gap-12">
          {details.map((service) => (
            <div key={service.id} className="w-full flex flex-col gap-6">
              <p className="w-full text-center text-2xl md:text-3xl font-semibold" style={{ color: 'var(--foreground)' }}>
                {service.title}
              </p>

              <div className="w-full overflow-hidden rounded-xl">
                <Image
                  src={service.image}
                  alt={service.title}
                  width={1200}
                  height={500}
                  className="w-full aspect-5/2 object-cover"
                />
              </div>

              <p className="text-base md:text-lg leading-relaxed text-justify opacity-70 " >
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
