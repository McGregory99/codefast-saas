import Link from "next/link";

export default async function SuccessPage() {
  return (
    <main className="min-h-screens flex flex-col justify-center items-center gap-6">
      <h1 className="text-xl font-bold">Thanks for your purchase ❤️</h1>
      <Link href="/dashboard" className="btn btn-primary">
        Dashboard
      </Link>
    </main>
  );
}
