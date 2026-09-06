import ContactForm from '@/components/forms/Contact'

export default function ContactPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      {/* Header */}
      <div className="text-center mb-12">
        <span className="inline-block px-3.5 py-1 bg-primary/10 text-primary rounded-full text-[0.75rem] font-bold tracking-widest uppercase mb-4">
          Support
        </span>
        <h1 className="text-[clamp(2rem,4.5vw,3.25rem)] font-extrabold tracking-tight mb-4" style={{ color: 'var(--foreground)' }}>
          Contact <span className="text-primary">Us</span>
        </h1>
        <p className="text-[1.0625rem] text-primary-dark max-w-md mx-auto leading-relaxed">
          Have a question or need help? Send us a message and we&apos;ll respond promptly.
        </p>
      </div>

      {/* Two-column layout on large screens */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

        {/* Info panel */}
        <div>
          <h2 className="text-xl font-bold mb-6 text-primary">Why reach out?</h2>
          <div className="flex flex-col gap-5">
            {[
              { icon: '💬', title: 'General Inquiries', body: 'Questions about our products, services, or pricing.' },
              { icon: '🛠️', title: 'Technical Support', body: 'Issues with themes, packages, or your dashboard.' },
              { icon: '🤝', title: 'Partnerships', body: 'Interested in collaborating with Demart?' },
            ].map((item) => (
              <div key={item.title} className="flex gap-4 p-5 rounded-2xl border border-primary/15 bg-tertiary">
                <span className="text-2xl flex-shrink-0">{item.icon}</span>
                <div>
                  <h3 className="font-bold text-base mb-1" style={{ color: 'var(--foreground)' }}>{item.title}</h3>
                  <p className="text-sm text-primary-dark leading-relaxed m-0">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <ContactForm />
      </div>
    </div>
  )
}
