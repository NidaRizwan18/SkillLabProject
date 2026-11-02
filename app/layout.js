import "./globals.css";
import Providers from "@/context/Providers";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "VitalCoach – small steps for chronic conditions",
  description:
    "An AI health coach that makes managing chronic conditions effortless for busy people.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Navbar />
          <main className="container page">{children}</main>
          <footer className="container footer small muted">
            VitalCoach is a student MVP using dummy data. It is not medical advice.
          </footer>
        </Providers>
      </body>
    </html>
  );
}
