'use client'

import { useState } from 'react'
import axios from 'axios'

const fields = [
  { id: 'name', label: 'Your Name', type: 'text', placeholder: '' },
  { id: 'email', label: 'Email', type: 'email', placeholder: 'disibin@example.com' },
  { id: 'subject', label: 'Subject', type: 'text', placeholder: 'How can we help?' },
]

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', description: '' })
  const [status, setStatus] = useState(null)
  const [error, setError] = useState('')

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.id]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    setError('')
    try {
      await axios.post('/api/contact', form)
      setStatus('success')
      setForm({ name: '', email: '', subject: '', description: '' })
    } catch (err) {
      setStatus('error')
      setError(err.response?.data?.error || err.message || 'Something went wrong')
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-5 w-full max-w-xl mx-auto rounded-sm  bg-tertiary p-8"
    >
      <div>
        <h2 className="text-3xl font-semibold text-primary mb-1">Get in Touch</h2>
        <p className="text-sm text-primary-dark">We&apos;ll get back to you as soon as possible.</p>
      </div>

      {fields.map((f) => (
        <div key={f.id} className="flex flex-col gap-1.5">
          <label htmlFor={f.id} className="text-sm font-semibold text-primary-dark">
            {f.label}
          </label>
          <input
            id={f.id}
            type={f.type}
            placeholder={f.placeholder}
            value={form[f.id]}
            onChange={handleChange}
            required
            className="w-full px-4 py-2.5 rounded-lg border border-primary/25 bg-background text-foreground text-[0.9375rem] outline-none "
          />
        </div>
      ))}

      <div className="flex flex-col gap-1.5">
        <label htmlFor="description" className="text-sm font-semibold text-primary-dark">
          Message
        </label>
        <textarea
          id="description"
          placeholder="Describe your issue or question..."
          value={form.description}
          onChange={handleChange}
          required
          rows={5}
          className="w-full px-4 py-2.5 rounded-lg border border-primary/25 bg-background text-foreground text-[0.9375rem] outline-none "
        />
      </div>

      {status === 'success' && (
        <p className="px-4 py-3 rounded-lg bg-primary/10 border border-primary/25 text-primary-dark text-sm m-0">
          ✅ Your message was sent! We&apos;ll reply soon.
        </p>
      )}
      {status === 'error' && (
        <p className="px-4 py-3 rounded-lg bg-secondary/8 border border-secondary/25 text-secondary-dark text-sm m-0">
          ⚠️ {error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className={`py-3 rounded-lg font-bold text-base text-white transition-colors duration-150 ${status === 'loading'
            ? 'bg-primary-light cursor-not-allowed'
            : 'bg-primary hover:bg-primary-dark cursor-pointer'
          }`}
      >
        {status === 'loading' ? 'Sending…' : 'Send Message'}
      </button>
    </form>
  )
}
