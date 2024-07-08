import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ConfigProvider } from 'antd';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import Navbar from '../components/Navbar/Navbar';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

interface FooterOption {
  title: string;
  url: string;
}

const footerOptions: FooterOption[] = [
  {
    title: '關於我們',
    url: '/about',
  },
  {
    title: '隱私權政策',
    url: '/privacy',
  },
  {
    title: '常見問題',
    url: '/faq',
  },
  {
    title: '聯絡我們',
    url: '/contact',
  },
];

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
          <Navbar />
          <AntdRegistry>{children}</AntdRegistry>
          <footer className="body flex justify-center bg-primary-500 py-[40px]">
            <div className="flex w-full max-w-[1296px] justify-between">
              <ul>
                {footerOptions.map(({ url, title }, index) => (
                  <li key={index} className="mr-5 inline-block">
                    <a href={url} className="text-[#FAFAFA]">
                      {title}
                    </a>
                  </li>
                ))}
              </ul>
              <p className="text-[#FAFAFA]">Panacea © All Rights Reserved.</p>
            </div>
          </footer>
        </body>
      </ConfigProvider>
    </html>
  );
}
