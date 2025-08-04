export type Connector<T> = {
  connect: () => Promise<void>;
  fetchBatch: () => Promise<T[]>;
  disconnect: () => Promise<void>;
};

export type ZendeskConnectorOptions = {
  subDomain: string;
  token: string;
  email: string;
};

export type ZendeskResource = {
  name: string;
  apiPath: string;
};

export type ZendeskRecord<T> = {
  data: T[];
};

export type ZendeskUser = {
  name: string;
  createdAt: string;
};
