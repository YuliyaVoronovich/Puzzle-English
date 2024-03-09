export type StatusError = {
  ok: true | false;
  error?: {
    message: string;
  };
};

export interface User {
  name: string;
  surname: string;
}
