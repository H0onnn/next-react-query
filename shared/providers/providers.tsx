import { type ReactNode } from "react";
import QueryProvider from "./query-provider";
import { Toaster } from "./toaster";

type ProvidersProps = {
  children: ReactNode;
};

const Providers = ({ children }: ProvidersProps) => {
  return (
    <QueryProvider>
      {children}
      <Toaster richColors={true} />
    </QueryProvider>
  );
};

export default Providers;
