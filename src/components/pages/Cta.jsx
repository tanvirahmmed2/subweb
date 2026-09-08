import Link from "next/link";

export default function Cta() {
  return (
    <section className="w-full flex flex-col items-center justify-center gap-8 overflow-hidden py-24 px-6 bg-primary text-tertiary-light">
      <p className="text-4xl md:text-7xl text-center">Let&apos;s build your brand</p>
      <Link href={'https://dashboard.disibin.com'} className="bg-tertiary-light text-primary p-1 px-6 rounded-full">Continue</Link>
    </section>
  )
}
