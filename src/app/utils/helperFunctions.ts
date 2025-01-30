export function convertName(name: string) {
    const slug = name.toLocaleLowerCase().replace(/ /g, "-");
    return slug;
  }