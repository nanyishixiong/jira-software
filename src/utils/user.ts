import { User } from "types/User";
import { useHttp } from "./http";
import { useQuery } from "react-query";

export const useUsers = (param?: Partial<User>) => {
  const client = useHttp();
  return useQuery<User[], Error>(["users", param], () =>
    client("users", { data: param })
  );
};
