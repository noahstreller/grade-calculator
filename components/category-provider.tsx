"use client";
import { Category } from "@/db/schema";
import { catchProblem } from "@/lib/problem";
import {
  getAllCategories,
  getCurrentCategoryElseInsert,
  selectCategory,
} from "@/lib/services/category-service";
import { useSession } from "next-auth/react";
import { createContext, useContext, useEffect, useState } from "react";

type CategoryContextType = {
  category: Category | undefined;
  setCategory: (category: Category) => void;
  setCategories: (categories: Category[]) => void;
  categories: Category[];
  loading: boolean;
};

const defaultContextValue: CategoryContextType = {
  category: undefined,
  setCategory: () => void 0,
  setCategories: () => void 0,
  categories: [],
  loading: true,
};

const CategoryContext = createContext(defaultContextValue);

export function CategoryProvider({ children }: { children: React.ReactNode }) {
  const [category, setCategory] = useState<Category>();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const session = useSession();

  useEffect(() => {
    if (session.status === "authenticated") {
      getCurrentCategoryElseInsert().then((result): void => {
        setCategory(catchProblem(result));
        setLoading(false);
      });
    }
  }, [session, categories]);

  useEffect(() => {
    if (session.status === "authenticated") {
      getAllCategories().then((result) => {
        setCategories([...catchProblem(result)]);
      });
    }
  }, [session]);

  useEffect(() => {
    if (session.status === "authenticated") {
      if (category?.id) {
        selectCategory(category.id);
        categories.forEach((iteratedCategory) => {
          if (iteratedCategory.id === category.id) {
            iteratedCategory.selected = true;
          } else {
            iteratedCategory.selected = false;
          }
        });
      }
    }
  }, [category, session, categories]);

  return (
    <CategoryContext.Provider
      value={{
        category,
        setCategory,
        setCategories,
        loading,
        categories,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
}

export const useCategory = () => useContext(CategoryContext);
