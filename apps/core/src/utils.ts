// helpers
export const encode = (data: any) =>
  Buffer.from(JSON.stringify(data)).toString("base64");

export const decode = <T = any>(c?: string | null): T | undefined =>
  c ? (JSON.parse(Buffer.from(c, "base64").toString("utf8")) as T) : undefined;
