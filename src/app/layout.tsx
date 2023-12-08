import type { Metadata } from 'next';
import Header from './components/Layout/Header';
import Context from './context';
import './globals.scss';

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
      <body>
        <Context>
          <Header />
          {children}
        </Context>
      </body>
    </html>
  );
}
