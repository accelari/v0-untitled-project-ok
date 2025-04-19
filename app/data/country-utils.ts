// This file is a utility file for country-related functions
// It should be imported in the country files

export const createExtendedCountry = (code: string, name: string, region: string, type: string, rules: any = {}) => {
  return {
    code,
    name,
    region,
    type,
    ...rules,
  }
}
