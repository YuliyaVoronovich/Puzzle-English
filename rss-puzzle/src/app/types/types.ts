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

export type Hints = {
  translate: boolean;
  audio: boolean;
  picture: boolean;
};
