import { HydrateClient, trpc } from "@/trpc/server";
import { Suspense } from "react";
import ClientGreetings from "./client-greetings";

export default async function Home() {
  void trpc.hello.prefetch({text: "mambo"});

  return (
    <HydrateClient>
      <div className="text-2xl">This rendered on server</div>
      <Suspense fallback="Loading....">
        <ClientGreetings />
      </Suspense>
    </HydrateClient>
  );
}
