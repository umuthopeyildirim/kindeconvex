"use client";
import { useQuery } from "convex/react";
import { api } from "@/../convex/_generated/api";
import { useConvexAuth } from "convex/react";

export default function TaskList() {
  const { isLoading, isAuthenticated } = useConvexAuth();
  console.log(isAuthenticated);
  // console.log(fetchAccessToken());
  const tasks = useQuery(api.tasks.get);
  return (
    <main>
      {isAuthenticated ? "Authenticated" : "Not authenticated"}
      {tasks?.map(({ _id, text }) => <div key={_id}>{text}</div>) ??
        "Loading..."}
    </main>
  );
}
