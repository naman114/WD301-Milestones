export type User = {
  username: string;
  name: string;
  url: string;
  status: "NOT_AUTHENTICATED" | "AUTHENTICATED";
};
