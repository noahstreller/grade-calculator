"use client";
import { Category } from "@/db/schema";
import { catchProblem } from "@/lib/problem";
import { getCurrentCategoryElseInsert } from "@/lib/services/category-service";
import { getPreferencesElseGetDefault } from "@/lib/services/preferences-service";
import { useSession } from "next-auth/react";
import { createContext, useContext, useEffect, useState } from "react";

type CategoryContextType = {
  category: Category | undefined;
  setCategory: (category: Category) => void;
  loading: boolean;
};

const defaultContextValue: CategoryContextType = {
  category: undefined,
  setCategory: () => void 0,
  loading: true,
};

const CategoryContext = createContext(defaultContextValue);

export function CategoryProvider({ children }: { children: React.ReactNode }) {
  const [category, setCategory] = useState<Category>({
    id: 0,
    name: "",
    selected: false,
    userId: "",

    //todo
  });
  const [loading, setLoading] = useState(true);
  const session = useSession();

  useEffect(() => {
    if (session.status === "authenticated") {
      getCurrentCategoryElseInsert().then((result): void => {
        setCategory(catchProblem(result));
        setLoading(false);
      });
    }
  }, [session]);

  return (
    <CategoryContext.Provider
      value={{ category: category, setCategory: setCategory, loading }}
    >
      {children}
    </CategoryContext.Provider>
  );
}

export const useCategory = () => useContext(CategoryContext);
