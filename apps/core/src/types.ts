export type Connector<T = any> = {
  connect: () => Promise<void>;
  list(params: ListParams): Promise<ListResult<T>>;
  disconnect: () => Promise<void>;
  count: () => Promise<number>;
};

type ZendeskAuthOptions = {
  subDomain: string;
  email: string;
  token: string;
};

export type ConnectorOptions<SourceOptions = any> = {
  destination: {
    type: "zendesk";
    auth: ZendeskAuthOptions;
  };

  source: {
    type: SourceType;
    options: SourceOptions;
  };
};

export type ZendeskSourceOptions<
  T extends keyof ZendeskResourceTypeMap = keyof ZendeskResourceTypeMap,
> = {
  name: T;
  auth: ZendeskAuthOptions;
};

export type ZendeskRecord<T> = {
  data: T[];
};

export type ZendeskUser = {
  id: number;
  name: string;
  email: string;
  created_at: string;
  updated_at: string;
  role: string;
  active: boolean;
};

export type ZendeskTicket = {
  id: number;
  subject: string;
  description: string;
  status: string;
  priority: string;
  created_at: string;
  updated_at: string;
  requester_id: number;
  assignee_id: number;
};

export type ZendeskArticle = {
  id: number;
  title: string;
  body: string;
  section_id: number;
  created_at: string;
  updated_at: string;
  locale: string;
};

export type ZendeskResourceTypeMap = {
  users: ZendeskUser;
  tickets: ZendeskTicket;
  articles: ZendeskArticle;
};

export type SourceType = "zendesk" | "other";

export type Cursor = string | null;

export interface ListParams {
  limit?: number;
  cursor?: Cursor;
  filters?: Record<string, any>;
}

export interface ListResult<T> {
  items: T[];
  meta: {
    has_more: boolean;
    after_cursor: string | null;
    before_cursor: string | null;
  };
  nextCursor?: Cursor;
}
