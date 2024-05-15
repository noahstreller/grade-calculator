import { CategoryButton } from "@/components/category-button";
import { CategoryComboBox } from "@/components/category-combobox";

export function CategoryGroup() {
  return (
    <div className="flex flex-row gap-4">
      <CategoryComboBox className="flex-grow w-full" />
      <div className="flex flex-row gap-2">
        <CategoryButton action="create" />
        <CategoryButton action="edit" />
      </div>
    </div>
  );
}
