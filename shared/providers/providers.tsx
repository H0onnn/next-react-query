import { type ReactNode } from "react";
import QueryProvider from "./query-provider";

type ProvidersProps = {
  children: ReactNode;
};

const Providers = ({ children }: ProvidersProps) => {
  return <QueryProvider>{children}</QueryProvider>;
};

export default Providers;
