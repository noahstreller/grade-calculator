"use server";

import { ArchiveData } from "@/db/schema";
import { getProblem, Problem } from "@/lib/problem";
import {
  deleteArchivedataFromDb,
  getAllArchivedataFromDb,
  getArchivedataByIdFromDb,
  insertArchivedataIntoDb,
} from "@/lib/repositories/archive-repo";
import { getUserId } from "@/lib/services/service-util";
import pino from "pino";

export async function getAllArchivedata(): Promise<ArchiveData[] | Problem> {
  try {
    const userId = await getUserId();
    pino().debug("Getting all archive data for user=" + userId);
    return await getAllArchivedataFromDb(userId);
  } catch (e: any) {
    return getProblem({
      errorMessage: e.message,
      errorCode: e.code,
      detail: e.detail,
    }) satisfies Problem;
  }
}

export async function getArchivedataById(
  id: number
): Promise<ArchiveData | Problem> {
  try {
    const userId = await getUserId();
    pino().debug("Getting archive data by id=" + id + " for user=" + userId);
    return await getArchivedataByIdFromDb(id, userId);
  } catch (e: any) {
    return getProblem({
      errorMessage: e.message,
      errorCode: e.code,
      detail: e.detail,
    }) satisfies Problem;
  }
}

export async function insertArchivedata(
  data: string,
  category: string
): Promise<ArchiveData | Problem> {
  try {
    const userId = await getUserId();
    pino().info(
      "Inserting compressed archive data=" + data + " for user=" + userId
    );
    return await insertArchivedataIntoDb(data, category, userId);
  } catch (e: any) {
    return getProblem({
      errorMessage: e.message,
      errorCode: e.code,
      detail: e.detail,
    }) satisfies Problem;
  }
}

export async function deleteArchivedata(
  id: number
): Promise<ArchiveData | Problem> {
  try {
    const userId = await getUserId();
    pino().info("Deleting archive data by id=" + id + " for user=" + userId);
    return await deleteArchivedataFromDb(id, userId);
  } catch (e: any) {
    return getProblem({
      errorMessage: e.message,
      errorCode: e.code,
      detail: e.detail,
    }) satisfies Problem;
  }
}
