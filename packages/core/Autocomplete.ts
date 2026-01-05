export type AutocompleteOption = {
  name: string;
  getChoices: (partial: string, ctx?: any) => Promise<string[]> | string[];
};

export async function getAutocompleteSuggestions(
  options: AutocompleteOption[],
  input: string,
  ctx: any
): Promise<string[]> {
  let out: string[] = [];
  for (const o of options)
    out = out.concat(await o.getChoices(input, ctx));
  return Array.from(new Set(out));
}