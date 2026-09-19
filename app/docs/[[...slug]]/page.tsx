import { source } from '@/lib/source';
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
  MarkdownCopyButton,
  ViewOptionsPopover,
} from 'fumadocs-ui/layouts/notebook/page';
import { notFound } from 'next/navigation';
import { getMDXComponents } from '@/components/mdx';
import type { Metadata } from 'next';
import { createRelativeLink } from 'fumadocs-ui/mdx';
import { getPageImageUrl, getPageMarkdownUrl, gitConfig } from '@/lib/shared';
import { CustomBreadcrumb } from '@/components/breadcrumb';

type Segment = { title: string; url?: string };

function buildBreadcrumbTrail(
  page: ReturnType<typeof source.getPage>
): Segment[] {
  if (!page) return [];

  const segments: Segment[] = [];
  const tree = source.pageTree;
  let nodes: any[] = tree.children;
  const urlParts = page.url.split('/').filter(Boolean);

  for (let i = 0; i < urlParts.length; i++) {
    const currentPart = '/' + urlParts.slice(0, i + 1).join('/');

    const match = nodes.find(
      (n: any) =>
        n.url === currentPart ||
        n.$ref?.folder === urlParts.slice(0, i + 1).join('/')
    );

    if (match) {
      segments.push({
        title: match.name,
        url: i === urlParts.length - 1 ? undefined : match.url,
      });
      if (match.children) nodes = match.children;
    }
  }
  if (segments.length === 0) {
    return [{ title: page.data.title }];
  }
  const last = segments[segments.length - 1];
  if (last.title !== page.data.title) {
    segments[segments.length - 1] = {
      title: page.data.title,
    };
  }

  return segments;
}

export default async function Page(props: PageProps<'/docs/[[...slug]]'>) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const MDX = page.data.body;
  const markdownUrl = getPageMarkdownUrl(page).url;
  const segments = buildBreadcrumbTrail(page);

  return (
    <DocsPage toc={page.data.toc} full={page.data.full}>
      <CustomBreadcrumb segments={segments} />
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription className="mb-0">{page.data.description}</DocsDescription>
      <div className="flex flex-row gap-2 items-center border-b pb-6">
        <MarkdownCopyButton markdownUrl={markdownUrl} />
        <ViewOptionsPopover
          markdownUrl={markdownUrl}
          githubUrl={`https://github.com/${gitConfig.user}/${gitConfig.repo}/blob/${gitConfig.branch}/content/docs/${page.path}`}
        />
      </div>
      <DocsBody>
        <MDX
          components={getMDXComponents({
            a: createRelativeLink(source, page),
          })}
        />
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(
  props: PageProps<'/docs/[[...slug]]'>
): Promise<Metadata> {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
    openGraph: {
      images: getPageImageUrl(page).url,
    },
  };
}