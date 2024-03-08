import type { StatusErrorEmpty } from '../types/types';

class Validation {
  public isNotEmpty(value: string): StatusErrorEmpty {
    if (!value) {
      return {
        ok: false,
        error: {
          message: 'Field is empty',
        },
      };
    }
    return {
      ok: true,
    };
  }
}
export const validationServise = new Validation();
