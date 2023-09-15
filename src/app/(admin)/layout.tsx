'use client';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>Forever Glow | Admin</title>
        <meta title="description" content="Buy anything online" />
      </head>
      <body>{children}</body>
    </html>
  );
}
