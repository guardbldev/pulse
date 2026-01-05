import Button from "./components/Button";
export interface PaginationOptions {
  pages: string[]|any[];
  perPage?: number;
}
export function Pagination({ pages }: PaginationOptions) {
  let idx = 0;
  return {
    content: typeof pages[0] === "string" ? pages[0] : undefined,
    embeds: typeof pages[0] === "object" ? [pages[0]] : undefined,
    components: [
      Button().label("Prev").onClick(ctx => {
        idx = Math.max(0, idx-1);
        ctx.reply(pages[idx]);
      }),
      Button().label("Next").onClick(ctx => {
        idx = Math.min(pages.length-1, idx+1);
        ctx.reply(pages[idx]);
      })
    ]
  };
}