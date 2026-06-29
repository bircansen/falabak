import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

import data from "../data/falabak-data.json";

interface CoinContextType {
  coinBalance: number;
  setCoinBalance: React.Dispatch<
    React.SetStateAction<number>
  >;
}

const CoinContext = createContext<
  CoinContextType | undefined
>(undefined);

interface Props {
  children: ReactNode;
}

export function CoinProvider({
  children,
}: Props) {
  const [coinBalance, setCoinBalance] = useState(
    data.user.coinBalance
  );

  return (
    <CoinContext.Provider
      value={{
        coinBalance,
        setCoinBalance,
      }}
    >
      {children}
    </CoinContext.Provider>
  );
}

export function useCoin() {
  const context = useContext(CoinContext);

  if (!context) {
    throw new Error(
      "useCoin must be used within CoinProvider"
    );
  }

  return context;
}