export const resourceMap = {
  users: { path: "users.json", listField: "users", nextPageKey: "next_page" },
  tickets: {
    path: "tickets.json",
    listField: "tickets",
    nextPageKey: "next_page",
  },
  articles: {
    path: "help_center/articles.json",
    listField: "articles",
    nextPageKey: "next_page",
  },
  // … any other endpoints
} as const;

export type ResourceName = keyof typeof resourceMap;
export type ZendeskResourceConfig = (typeof resourceMap)[ResourceName];
