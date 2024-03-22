import type { StatusErrorValidation } from '../interfaces/types';

class Validation {
  private patternInput = '^[A-Z][\\-a-zA-z]+$';

  private fieldMinLengthMap = new Map<string, number>([
    ['Name', 3],
    ['Surname', 4],
  ]);

  public isValidField(target: HTMLInputElement): StatusErrorValidation {
    if (
      !(
        this.isNotEmpty(target.value) &&
        this.isPattern(target.value) &&
        this.isLengthMoreThen(target, this.fieldMinLengthMap.get(target.name))
      )
    ) {
      return {
        ok: false,
        error: {
          message: `The field should not be empty, only Latin characters and "-", the first letter is capitalized and it length ${this.fieldMinLengthMap.get(target.name)} symbols`,
        },
      };
    }
    return {
      ok: true,
    };
  }

  public isPattern(value: string): boolean {
    const regexp = new RegExp(this.patternInput);
    return regexp.test(value);
  }

  public isNotEmpty(value: string): boolean {
    return !!value;
  }

  public isLengthMoreThreeSymbol(target: HTMLInputElement): boolean {
    return target.value.length >= 3;
  }

  public isLengthMoreFourSymbol(target: HTMLInputElement): boolean {
    return target.value.length >= 4;
  }

  public isLengthMoreThen(target: HTMLInputElement, length: number | undefined): boolean {
    return length !== undefined && target.value.length >= length;
  }
}
export const ValidationServise = new Validation();
