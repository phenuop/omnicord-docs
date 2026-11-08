import { source } from '@/lib/source';
import { buildEmbed } from '@/lib/embed';
import { notFound } from 'next/navigation';

export const dynamic = 'force-static';

export function generateStaticParams() {
  return source.generateParams();
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug?: string[] }> },
) {
  const { slug } = await params;
  const page = source.getPage(slug);
  if (!page) notFound();
  return Response.json(buildEmbed(page));
}