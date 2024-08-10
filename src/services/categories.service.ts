import {
  Category,
  CategoryCreation,
  CategoryFilter,
  CategoryUpdate,
} from "@/types/category";
import { db } from "@/util/db";
import format from "pg-format";
import { logger } from "@/util/logger";
import * as uuid from "uuid";
import { dbService } from "@/services/db.service";
import * as _ from "lodash";

async function addCategory(
  category: CategoryCreation,
): Promise<Category | null> {
  try {
    const res = await db.query(
      `insert into "Categories" (slug, name, description, active)
       values ($1, $2, $3, $4)
       returning *`,
      [category.slug, category.name, category.description, category.active],
    );
    return (res.rows[0] ?? null) as Category;
  } catch (err) {
    logger.verbose(err);
    return null;
  }
}

async function getCategory(idOrSlug: string): Promise<Category | null> {
  const column = uuid.validate(idOrSlug) ? "id" : "slug";
  const res = await db.query(
    `select id, slug, name, description, active, "createdDate"
     from "Categories"
     where ${column} = $1
    `,
    [idOrSlug],
  );

  return (res.rows[0] ?? null) as Category | null;
}

async function updateCategory(
  id: string,
  data: CategoryUpdate,
): Promise<Category | null> {
  const cols = ["slug", "name", "description", "active"] as const;

  const existingCols = cols.filter((key) => key in data);

  if (!existingCols.length) {
    return null;
  }

  const updateQuery = existingCols
    .map((col) => `${col} = ${format.literal(data[col])}`)
    .join(",");

  const res = await db.query(
    format(
      `update "Categories"
       set ${updateQuery}
       where id = $1
       returning id, slug, name, description, active, "createdDate"`,
    ),
    [id],
  );

  return (res.rows[0] ?? null) as Category | null;
}

async function deleteCategory(id: string): Promise<Category | null> {
  const res = await db.query(
    `delete
     from "Categories"
     where id = $1
     returning id, slug, name, description, active, "createdDate"`,
    [id],
  );

  return (res.rows[0] ?? null) as Category | null;
}

function getCategoriesSearchQuery(params: CategoryFilter) {
  const searchQueries: string[] = [];

  if (!_.isNil(params.active)) {
    searchQueries.push(`active = ${format.literal(params.active)}`);
  }

  if (!_.isNil(params.search)) {
    const searchLiteral = format.literal(`%${params.search}%`);
    searchQueries.push(`(
      immutable_unaccent(name) ilike unaccent(${searchLiteral}) or 
      immutable_unaccent(description) ilike unaccent(${searchLiteral})
    )`);
  } else if (!_.isNil(params.name) || !_.isNil(params.description)) {
    searchQueries.push(
      "(" +
        (["name", "description"] as const)
          .filter((key) => params[key])
          .map((key) => {
            const literal = format.literal(`%${params[key]}%`);
            return `immutable_unaccent(${key}) ilike unaccent(${literal})`;
          })
          .join(" and ") +
        ")",
    );
  }

  return searchQueries.length ? `where ${searchQueries.join(" and ")}` : "";
}

async function getCategoriesOrderQuery(params: CategoryFilter) {
  let order = "asc";
  let sortCol = params.sort;
  if (sortCol.startsWith("-")) {
    order = "desc";
    sortCol = params.sort.slice(1);
  }

  const cols = await dbService.getColumns("Categories");

  return cols.includes(sortCol)
    ? `order by ${format.ident(sortCol)} ${order}`
    : "";
}

async function getCategories(params: CategoryFilter): Promise<Category[]> {
  try {
    const searchQuery = getCategoriesSearchQuery(params);
    const orderQuery = await getCategoriesOrderQuery(params);
    const offset = (params.page - 1) * params.pageSize;
    const res = await db.query(
      format(
        `select id, slug, name, description, active, "createdDate"
         from "Categories" ${searchQuery} ${orderQuery}
         limit $1 offset $2
        `,
      ),
      [params.pageSize, offset],
    );
    return (res.rows ?? []) as Category[];
  } catch (err) {
    logger.verbose(err);
    return [];
  }
}

export const categoriesService = {
  addCategory,
  getCategory,
  updateCategory,
  deleteCategory,
  getCategories,
};
