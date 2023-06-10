export default function UserPage({ params }: { params: { id: string } }) {
  const { id } = params;
  return (
    <main className="flex min-h-screen">
      <h1>Artwork {id}</h1>
    </main>
  );
}
