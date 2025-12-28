"use client";

import { trpc } from "@/trpc/client";
import { Spinner } from "../ui/spinner";

export default function AdminGate({ children }: { children: React.ReactNode }) {
  const adminQuery = trpc.admin.me.useQuery();
  const userQuery = trpc.user.me.useQuery();

  if (adminQuery.isLoading || userQuery.isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center gap-4">
        <Spinner /> <span>Loading...</span>
      </div>
    );
  }

  if (adminQuery.data) {
    return <>{children}</>;
  }

  const userId = userQuery.data?.id;

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="p-8 max-w-md mx-auto border rounded-lg">
        <h2 className="text-xl font-semibold text-red-600">You are not an admin</h2>
        <p className="mt-2 text-gray-700">
          If this is a mistake, copy your user ID and send it to support.
        </p>

        <div className="mt-4 flex items-center gap-2">
          <input
            readOnly
            value={userId || "Not logged in"}
            className="flex-1 px-3 py-2 border rounded bg-gray-100 text-sm"
          />
          <button
            onClick={() => {
              if (userId) {
                navigator.clipboard.writeText(userId);
                alert("Copied to clipboard");
              }
            }}
            className="px-3 py-2 text-sm bg-black text-white rounded"
            disabled={!userId}
          >
            Copy
          </button>
        </div>
      </div>
    </div>
  );
}
