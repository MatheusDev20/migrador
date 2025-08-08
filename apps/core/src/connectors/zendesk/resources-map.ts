import { ZendeskResourceTypeMap } from "src/types";

export const resourceMap = {
  users: {
    path: "users.json",
    listField: "users",
    nextPageKey: "next_page",
    pageChunkSize: 100,
  },

  tickets: {
    path: "tickets.json",
    listField: "tickets",
    pageChunkSize: 100,
    nextPageKey: "next_page",
  },

  articles: {
    path: "help_center/articles.json",
    listField: "articles",
    pageChunkSize: 100,
    nextPageKey: "next_page",
  },
} as const satisfies Record<
  keyof ZendeskResourceTypeMap,
  {
    path: string;
    listField: string;
    nextPageKey: string;
    pageChunkSize: number;
  }
>;

export type ResourceName = keyof typeof resourceMap;
export type ZendeskResourceConfig = (typeof resourceMap)[ResourceName];
