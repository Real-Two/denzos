import Link from 'next/link';

export const metadata = { title: 'Contact the maison' };
export default function ContactPage() {
  return <main className="max-w-6xl mx-auto px-6 py-12"><header className="collection-cover"><p className="editor-kicker">Denzos · Client care</p><h1>Contact<br/><em>the maison.</em></h1></header>
    <div className="grid md:grid-cols-2 gap-8 py-8"><section><h2 className="font-cormorant text-4xl mb-3">Write to us</h2><a className="underline" href="mailto:hello@denzos.in">hello@denzos.in</a></section>
    <section><h2 className="font-cormorant text-4xl mb-3">Choosing a fragrance?</h2><Link href="/testers" className="underline">Explore discovery testers ↗</Link><br/><Link href="/faq" className="inline-block mt-3 underline">Frequently asked questions ↗</Link></section></div></main>;
}