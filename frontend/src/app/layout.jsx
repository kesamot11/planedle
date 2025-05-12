import './globals.css';

import Footer from './components/Footer';

import { Poppins } from 'next/font/google';

const poppins = Poppins({ subsets: ['latin'], weight: ['600'] });

export const metadata = {
  title: 'Planedle',
  description: 'Guess the aircraft!',
  icons: {
    icon: '/logo.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
