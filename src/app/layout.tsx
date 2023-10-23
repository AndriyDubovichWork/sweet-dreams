import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Context from './context';

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
        <Context>{children}</Context>
      </body>
    </html>
  );
}
