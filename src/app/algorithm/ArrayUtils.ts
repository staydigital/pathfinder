export abstract class ArrayUtils {
  static copyStringArrayAndFilterValues (
    thisArray: string[],
    removeValues: string[]
  ): string[] {
    return thisArray.filter((value, index, arr) => {
      return removeValues.lastIndexOf(value) === -1
    })
  }
}
