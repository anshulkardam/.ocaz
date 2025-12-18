"use client";

import { trpc } from "@/trpc/client";

export default function ClientGreetings() {
  const [res] = trpc.hello.useSuspenseQuery({ text: "mambo" });
  return <div>{res.greeting}</div>;
}
