import "./globals.css";

export const metadata = {
  title: "Friendship!",
  description: "A celebration of our 2 months meeting journey",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
