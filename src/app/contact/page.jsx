import ContactForm from '@/components/forms/Contact'

export default function ContactPage() {
  return (
    <div className="w-full p-4 md:p-10">
      {/* Header */}
      <div className="text-center mb-14">
        <h1 className="text-3xl md:text-5xl font-semibold tracking-tight mb-4" style={{ color: 'var(--foreground)' }}>
          Contact <span className="text-primary">Us</span>
        </h1>
        <p className="text-[1.0625rem] text-primary-dark max-w-md mx-auto leading-relaxed">
          Have a question or need help? Send us a message and we&apos;ll respond promptly.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

        <div>
          <h2 className="text-3xl font-semibold mb-6 text-primary">How to reach?</h2>
          <div className="flex flex-col gap-5">
            {[
              { title: 'Email', body: 'support@disibin.com' },
              { title: 'Phone', body: '+8801805003886' },
              { title: 'Address', body: 'Mymensingh, Bangladesh' },
            ].map((item) => (
              <div key={item.title} className="flex gap-4 p-5  bg-tertiary">
                <h3 className="font-semibold text-base mb-1" style={{ color: 'var(--foreground)' }}>{item.title}</h3>
                <p className="text-sm text-primary-dark leading-relaxed m-0">{item.body}</p>
              </div>
            ))}
          </div>
        </div>

        <ContactForm />
      </div>
    </div>
  )
}
