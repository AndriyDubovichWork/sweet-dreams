import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Header from './components/Shared/Layout/Header';
import Context from './context';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'sweet dreams',
  description: 'app for saving dreams',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Context>
          <Header />
          {children}
        </Context>
      </body>
    </html>
  );
}
