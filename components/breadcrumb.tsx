import Link from 'next/link';

type Segment = { title: string; url?: string };

export function CustomBreadcrumb({ segments }: { segments: Segment[] }) {
  return (
    <div className="mb-2 flex flex-row flex-wrap items-center gap-1.5 whitespace-nowrap text-sm text-fd-muted-foreground">
      {segments.map((seg, i) => (
        <span key={i} className="flex items-center gap-1.5">
          {i > 0 && <span className="text-fd-muted-foreground/50">&gt;</span>}
          {seg.url ? (
            <Link href={seg.url} className="truncate hover:text-fd-foreground">
              {seg.title}
            </Link>
          ) : (
            <span className="truncate font-medium text-fd-primary">
              {seg.title}
            </span>
          )}
        </span>
      ))}
    </div>
  );
}