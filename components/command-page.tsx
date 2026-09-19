'use client';

import { commandData } from '@/lib/commands';

export function CommandPage({ name }: { name: string }) {
  const cmd = commandData.find((c) => c.name === name);
  if (!cmd) {
    return <p className="text-fd-muted-foreground">Command not found.</p>;
  }

  const info = cmd.detailedInfo;

  return (
    <div className="not-prose my-6 text-sm">
      <p className="mb-4 text-fd-muted-foreground">{cmd.description}</p>

      {cmd.usage && (
        <div className="mb-4 rounded-lg border border-fd-border bg-fd-background px-3 py-2 font-mono text-xs">
          {cmd.usage}
        </div>
      )}

      {info?.whatItDoes && (
        <p className="mb-4 text-fd-muted-foreground">{info.whatItDoes}</p>
      )}

      {cmd.examples.length > 0 && (
        <div className="mb-4">
          <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-fd-muted-foreground">
            Examples
          </h3>
          <div className="flex flex-col gap-1.5">
            {cmd.examples.map((ex, i) => (
              <div
                key={i}
                className="rounded border border-fd-border bg-fd-background px-2.5 py-1.5 font-mono text-xs text-fd-muted-foreground"
              >
                {ex}
              </div>
            ))}
          </div>
        </div>
      )}

      {cmd.tips.length > 0 && (
        <div>
          <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-fd-muted-foreground">
            Tips
          </h3>
          <ul className="list-disc pl-5 text-fd-muted-foreground">
            {cmd.tips.map((t, i) => (
              <li key={i}>{t}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}