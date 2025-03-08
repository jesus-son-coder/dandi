import { Inter } from "next/font/google";
import { NotificationProvider } from './components/NotificationProvider';
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Dandi - API Key Management",
  description: "Manage your API keys for the Research API",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NotificationProvider>
          {children}
        </NotificationProvider>
      </body>
    </html>
  );
}
