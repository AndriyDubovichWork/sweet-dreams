import type { Metadata } from 'next';
import Context from './context';
import './globals.scss';
import Header from './features/dreams/Layout/Header';

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
