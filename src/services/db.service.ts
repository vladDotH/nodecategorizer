import { db } from "@/util/db";
import format from "pg-format";

async function getColumns(table: string): Promise<string[]> {
  const res = await db.query(`
      select column_name
      from information_schema.columns
      where table_name = ${format.literal(table)}
      ;
  `);

  return res.rows?.map((row) => row.column_name) ?? [];
}

export const dbService = {
  getColumns,
};
