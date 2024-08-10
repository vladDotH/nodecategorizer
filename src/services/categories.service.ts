import {
  Category,
  CategoryCreation,
  CategoryFilter,
  CategoryUpdate,
} from "@/types/category";
import { db } from "@/util/db";

async function addCategory(
  category: CategoryCreation,
): Promise<Category | null> {
  /**/
}

async function getCategory(idOrSlug: string): Promise<Category> {
  /**/
}

async function updateCategory(
  id: string,
  data: CategoryUpdate,
): Promise<Category | null> {
  /**/
}

async function deleteCategory(id: string): Promise<Category> {
  /**/
}

async function getCategories(data: CategoryFilter): Promise<Category[]> {
  /**/
}

export const categoriesService = {
  addCategory,
  getCategory,
  updateCategory,
  deleteCategory,
  getCategories,
};
