import ButtonLogin from "@/components/ButtonLogin";
export default function Home() {
  const isLoggedIn = true;
  const name = "Goyo";

  return (
    <main>
      <section className="bg-base-200">
        <div className="flex justify-between items-center px-8 py-2 max-w-3xl mx-auto">
          <div className="font-bold">CodeFastSaas logo</div>
          <div className="space-x-4 max-md:hidden">
            <a className="link link-hover">Pricing</a>
            <a className="link link-hover">FAQ</a>
          </div>
          <div>
            <ButtonLogin isLoggedIn={isLoggedIn} name={name} />
          </div>
        </div>
      </section>

      <section className="text-center py-32 px-8 max-w-3xl mx-auto">
        <h1 className="text-xl sm:text-2xl md:text-4xl lg:text-6xl font-bold mb-6">
          Collect customer feedback to build better products
        </h1>
        <div className="opacity-80 mb-10">
          Create a feedback board in minutes, prioritize features and make
          products that your customers actually will love
        </div>
        <ButtonLogin isLoggedIn={isLoggedIn} name={name} />
      </section>
    </main>
  );
}
