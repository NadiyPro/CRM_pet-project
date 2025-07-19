export class TransformHelper {
  public static trim({ value }: { value: string }): string {
    return value ? value.toString().trim() : value;
  }
}
