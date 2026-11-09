import { source } from '@/lib/source';
import { buildEmbed } from '@/lib/embed';
import { notFound } from 'next/navigation';

export const dynamic = 'force-static';

export function generateStaticParams() {
  return source.generateParams().map(({ slug }) => ({
    slug: [...(slug ?? []), 'data.json'],
  }));
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug?: string[] }> },
) {
  const { slug } = await params;
  if (!slug?.at(-1) || slug.at(-1) !== 'data.json') notFound();

  const page = source.getPage(slug.slice(0, -1));
  if (!page) notFound();
  return Response.json(buildEmbed(page));
}
