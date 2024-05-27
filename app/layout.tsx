import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ConfigProvider } from 'antd';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Panacea',
  description: 'Panacea',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ConfigProvider
        theme={{
          token: {
            // Seed Token
            colorPrimary: '#33A6B8',
            // colorPrimary: '#177FAC',

            // Alias Token
            // colorBgContainer: '#f6ffed',
            colorText: '#1D1D1f',
            colorTextHeading: '#1D1D1f',
            colorTextBase: '#1D1D1f',
          },
        }}
      >
        <body className={inter.className}>
          <AntdRegistry>{children}</AntdRegistry>
        </body>
      </ConfigProvider>
    </html>
  );
}
