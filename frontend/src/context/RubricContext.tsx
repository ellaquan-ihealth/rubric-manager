// src/pages/rubrics/RubricContext.tsx
import { createContext, useContext, useState, ReactNode } from "react";

type Rubric = {
  id: number;
  name: string;
  domain: string;
  subdomain: string;
  category: string;
  proposedName?: string;
};

type RubricContextType = {
  rubrics: Rubric[];
  setRubrics: React.Dispatch<React.SetStateAction<Rubric[]>>;
  rubricsToReview: Rubric[];
  setRubricsToReview: React.Dispatch<React.SetStateAction<Rubric[]>>;
};

const RubricContext = createContext<RubricContextType | undefined>(undefined);

export const RubricProvider = ({ children }: { children: ReactNode }) => {
  const [rubrics, setRubrics] = useState<Rubric[]>([]);
  const [rubricsToReview, setRubricsToReview] = useState<Rubric[]>([]);

  return (
    <RubricContext.Provider
      value={{ rubrics, setRubrics, rubricsToReview, setRubricsToReview }}
    >
      {children}
    </RubricContext.Provider>
  );
};

export const useRubricContext = () => {
  const context = useContext(RubricContext);
  if (!context) {
    throw new Error("useRubricContext must be used within a RubricProvider");
  }
  return context;
};
