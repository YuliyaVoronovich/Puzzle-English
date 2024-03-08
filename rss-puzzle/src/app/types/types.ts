export type StatusErrorEmpty = {
  ok: true | false;
  error?: {
    message: TypeMessage;
  };
};

export type TypeMessage =
  | 'Field is empty'
  | 'Field length less 3'
  | 'Field length less 4'
  | 'Only letters A-z and hyphen';
