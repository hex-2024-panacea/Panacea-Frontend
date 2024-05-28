export default function NotificationLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <h2>驗證信已送出</h2>
      {children}
    </main>
  );
}
