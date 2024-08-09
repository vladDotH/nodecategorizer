export interface Category {
  id: string;
  slug: string;
  name: string;
  description?: string;
  createdDate: Date;
  active: boolean;
}

export type CategoryCreation = Omit<Category, "id" | "createdDate">;
export type CategoryUpdate = Partial<CategoryCreation>;

export type CategoryFilter = Partial<
  Pick<Category, "name" | "description" | "active">
> & {
  search?: string;
  pageSize?: number;
  page?: number;
  sort?: string;
};
