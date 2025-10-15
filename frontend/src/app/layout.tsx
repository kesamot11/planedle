import './globals.css';
import Footer from './components/Footer';
import Link from 'next/link';
import Navbar from './components/Navbar';
import { Poppins } from 'next/font/google';
import { Providers } from './providers';

const poppins = Poppins({ subsets: ['latin'], weight: ['600'] });

export const metadata = { title: 'Planedle', description: 'Guess the aircraft!', icons: { icon: '/logo.png' } };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Providers>
          <Navbar />
          <main>{children}</main>
        </Providers>
        <Footer />
      </body>
    </html>
  );
}
