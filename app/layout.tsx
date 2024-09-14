import './globals.css';
import TopBar from "@/components/TopBar";

export const metadata = {
  title: 'Barber Appointment',
  description: 'Book your barber appointments with ease!',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-gray-800">
        <TopBar/>
        <main className="container mx-auto p-4">{children}</main>
        <footer className="bg-gray-900 text-white text-center p-4 mt-8">
          © 2024 Barber Shop
        </footer>
      </body>
    </html>
  );
}
