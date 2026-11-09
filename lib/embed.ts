import { source } from '@/lib/source';
import { getPageImageUrl } from '@/lib/shared';

export const SITE = 'https://docs.omnicord.site';

export type Segment = { title: string; url?: string };

export function buildBreadcrumbTrail(
  page: ReturnType<typeof source.getPage>
): Segment[] {
  if (!page) return [];

  const folderUrl = (n: any): string | undefined =>
    n.index?.url ??
    n.children?.find(
      (c: any) => c.type === 'page' && String(c.$id ?? '').endsWith('index.mdx')
    )?.url;

  const walk = (nodes: any[], trail: Segment[]): Segment[] | null => {
    for (const n of nodes) {
      if (n.type === 'page' && n.url === page.url) {
        return [...trail, { title: page.data.title }];
      }
      if (n.type === 'folder') {
        const found = walk(n.children ?? [], [
          ...trail,
          { title: String(n.name), url: folderUrl(n) },
        ]);
        if (found) return found;
      }
    }
    return null;
  };

  const result = walk(source.pageTree.children as any[], []);
  if (!result) return [{ title: page.data.title }];

  
  const last = result[result.length - 1];
  const prev = result[result.length - 2];
  if (prev && prev.title === last.title) result.pop();
  result[result.length - 1] = { title: last.title };
  return result;
}

export function embedJsonUrl(slugs: string[] = []) {
  return `${SITE}/embed${slugs.length ? '/' + slugs.join('/') : ''}/data.json`;
}

export function buildEmbed(page: NonNullable<ReturnType<typeof source.getPage>>) {
  const trail = buildBreadcrumbTrail(page).map((s) => s.title);
  const breadcrumb = ['Omnicord', ...trail].join(' > ');
  const link = `${SITE}${page.url}`;
  const description = (page.data.description ?? '').slice(0, 400);
  const image = new URL(getPageImageUrl(page).url, SITE).toString();

  return {
    component: {
      type: 17,
      accent_color: 5793266,
      components: [
        {
          type: 10,
          content:
            `-# <:admin:1568888770546372649>  ${breadcrumb}\n` +
            `<:docs:1569000806932287568>[Omnicord Documentation - ${page.data.title}](${link})\n` +
            description,
        },
        { type: 14, spacing: 1 },
        {
          type: 10,
          content:
            '-# <:discordlogo:1568996206338904128>[Support](https://discord.gg/bHDYB6MW5Y) • <:kofi:1568997776635727923>[Donate](https://ko-fi.com/omnicord)',
        },
        { type: 12, items: [{ media: { url: image } }] },
      ],
    },
  };
}