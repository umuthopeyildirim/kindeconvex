"use client";
import { ReactNode } from "react";
import { ConvexProviderWithAuth, ConvexReactClient } from "convex/react";
import { ConvexProviderWithKinde } from "@/app/lib/ConvexProviderWithKinde";
import { KindeProvider } from "@kinde-oss/kinde-auth-nextjs";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export default function ConvexClientProvider({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <KindeProvider>
      <ConvexProviderWithKinde client={convex}>
        {children}
      </ConvexProviderWithKinde>
    </KindeProvider>
  );
}
