import axios from "axios";

type Props = { path: string };

export const useApi = (props: Props) => {
  const { path } = props;

  const http = axios.create({
    baseURL: "http://localhost:8080/api",
    headers: {
      "Content-Type": "application/json",
    },
  });

  class Api<T> {
    getAll() {
      return http.get<T[]>(`/${path}`);
    }

    get(id: string) {
      return http.get<T>(`/${path}/${id}`);
    }

    create(data: T) {
      return http.post<T>(`/${path}`, data);
    }

    update(data: T, id: string) {
      return http.put<string>(`/${path}/${id}`, data);
    }

    delete(id: string) {
      return http.delete<object>(`/${path}/${id}`);
    }

    deleteAll() {
      return http.delete<object>(`/${path}`);
    }

    findByTitle(title: string) {
      return http.get<T[]>(`/${path}?title=${title}`);
    }
  }

  return {
    Api,
  };
};
