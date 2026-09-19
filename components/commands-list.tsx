'use client';

import { useEffect, useMemo, useState } from 'react';
import { commandData, categories, type Command } from '@/lib/commands';

function copyToClipboard(text: string) {
  if (navigator.clipboard?.writeText) {
    navigator.clipboard.writeText(text);
  }
}

export function CommandsList() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [openCommand, setOpenCommand] = useState<string | null>(null);

  // Open + scroll to the command in the URL hash on mount and on hash change
  useEffect(() => {
    function handleHash() {
      const hash = window.location.hash.replace(/^#/, '').toLowerCase();
      if (!hash) return;

      const target = commandData.find((c) => c.name.toLowerCase() === hash);
      if (!target) return;

      setSearch('');
      setActiveCategory('all');
      setOpenCommand(target.name);

      requestAnimationFrame(() => {
        const el = document.getElementById(target.name);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return commandData.filter((cmd) => {
      const matchesCategory =
        activeCategory === 'all' || cmd.category === activeCategory;
      if (!matchesCategory) return false;
      if (!q) return true;
      return (
        cmd.name.toLowerCase().includes(q) ||
        cmd.description.toLowerCase().includes(q) ||
        cmd.category.toLowerCase().includes(q) ||
        cmd.aliases.some((a) => a.toLowerCase().includes(q))
      );
    });
  }, [search, activeCategory]);

  return (
    <div className="not-prose my-6">
      <div className="mb-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search commands..."
          className="w-full rounded-lg border border-fd-border bg-fd-card px-4 py-2.5 text-sm text-fd-foreground placeholder:text-fd-muted-foreground focus:border-fd-primary focus:outline-none transition-colors"
        />
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        <button
          onClick={() => setActiveCategory('all')}
          className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
            activeCategory === 'all'
              ? 'border-fd-primary bg-fd-primary/10 text-fd-primary'
              : 'border-fd-border bg-fd-card text-fd-muted-foreground hover:border-fd-primary/40 hover:text-fd-foreground'
          }`}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
              activeCategory === cat
                ? 'border-fd-primary bg-fd-primary/10 text-fd-primary'
                : 'border-fd-border bg-fd-card text-fd-muted-foreground hover:border-fd-primary/40 hover:text-fd-foreground'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-lg border border-fd-border bg-fd-card px-4 py-8 text-center text-sm text-fd-muted-foreground">
          No commands found.
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {filtered.map((cmd, i) => (
            <CommandCard
              key={`${cmd.name}-${i}`}
              cmd={cmd}
              isOpen={openCommand === cmd.name}
              onToggle={() =>
                setOpenCommand(openCommand === cmd.name ? null : cmd.name)
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}

function CommandCard({
  cmd,
  isOpen,
  onToggle,
}: {
  cmd: Command;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const info = cmd.detailedInfo;

  function handlePermalink(e: React.MouseEvent) {
    e.stopPropagation();
    const url = `${window.location.origin}${window.location.pathname}#${cmd.name}`;
    navigator.clipboard?.writeText(url);
    history.replaceState(null, '', `#${cmd.name}`);
  }

  return (
    <div
      id={cmd.name}
      className="scroll-mt-24 rounded-xl border border-fd-border bg-fd-card overflow-hidden transition-colors hover:border-fd-primary/30"
    >
      <div
        onClick={onToggle}
        className="flex w-full cursor-pointer items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-fd-accent/40"
      >
        <a
          href={`#${cmd.name}`}
          onClick={handlePermalink}
          className="font-mono text-sm font-medium text-fd-primary hover:underline"
          title="Copy link to this command"
        >
          .{cmd.name}
        </a>
        <span className="rounded-full border border-fd-border bg-fd-background px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-fd-muted-foreground">
          {cmd.category}
        </span>
        {cmd.aliases.length > 0 && (
          <div className="hidden gap-1 md:flex">
            {cmd.aliases.slice(0, 3).map((a) => (
              <span
                key={a}
                className="rounded border border-fd-border bg-fd-background px-1.5 py-0.5 font-mono text-[10px] text-fd-muted-foreground"
              >
                {a}
              </span>
            ))}
          </div>
        )}
        <span
          className={`ml-auto text-xs text-fd-muted-foreground transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
        >
          ▼
        </span>
      </div>

      {isOpen && (
        <div className="border-t border-fd-border px-4 py-4 text-sm">
          <p className="mb-3 text-fd-muted-foreground">{cmd.description}</p>

          {cmd.usage && (
            <div
              onClick={() => copyToClipboard(cmd.usage)}
              className="mb-3 cursor-pointer rounded-lg border border-fd-border bg-fd-background px-3 py-2 font-mono text-xs text-fd-foreground transition-colors hover:border-fd-primary/50"
            >
              {cmd.usage}
            </div>
          )}

          {info?.whatItDoes && (
            <Section title="What it does">
              <p className="text-fd-muted-foreground">{info.whatItDoes}</p>
            </Section>
          )}

          {info?.filters && info.filters.length > 0 && (
            <Section title="Available Filters">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-fd-border">
                      <th className="px-2 py-1.5 text-left font-medium text-fd-muted-foreground">
                        Category
                      </th>
                      <th className="px-2 py-1.5 text-left font-medium text-fd-muted-foreground">
                        Filter
                      </th>
                      <th className="px-2 py-1.5 text-left font-medium text-fd-muted-foreground">
                        Description
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {info.filters.map((f, i) => (
                      <tr key={i} className="border-b border-fd-border/50">
                        <td className="px-2 py-1.5 text-fd-muted-foreground">
                          {f.name}
                        </td>
                        <td className="px-2 py-1.5">
                          <code className="rounded border border-fd-border bg-fd-background px-1.5 py-0.5 font-mono text-[11px] text-fd-primary">
                            {f.filter}
                          </code>
                        </td>
                        <td className="px-2 py-1.5 text-fd-muted-foreground">
                          {f.description}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Section>
          )}

          {info?.subcommands && info.subcommands.length > 0 && (
            <Section title="Subcommands">
              <ul className="list-disc pl-5 text-fd-muted-foreground">
                {info.subcommands.map((sc, i) => (
                  <li key={i}>
                    <strong className="text-fd-foreground">{sc.name}</strong>:{' '}
                    {sc.description}
                  </li>
                ))}
              </ul>
            </Section>
          )}

          {cmd.examples.length > 0 && (
            <Section title="Examples">
              <div className="flex flex-col gap-1.5">
                {cmd.examples.map((ex, i) => (
                  <div
                    key={i}
                    onClick={() => copyToClipboard(ex.split(' - ')[0])}
                    className="cursor-pointer rounded border border-fd-border bg-fd-background px-2.5 py-1.5 font-mono text-xs text-fd-muted-foreground transition-colors hover:border-fd-primary/50"
                  >
                    {ex}
                  </div>
                ))}
              </div>
            </Section>
          )}

          {cmd.tips.length > 0 && (
            <Section title="Tips">
              <ul className="list-disc pl-5 text-fd-muted-foreground">
                {cmd.tips.map((t, i) => (
                  <li key={i}>{t}</li>
                ))}
              </ul>
            </Section>
          )}

          <div className="mt-3 flex flex-wrap gap-3 text-xs text-fd-muted-foreground">
            {cmd.cooldown && <span>Cooldown: {cmd.cooldown}s</span>}
            {cmd.guildOnly && <span>Guild Only</span>}
            {cmd.ownerOnly && <span>Owner Only</span>}
          </div>
        </div>
      )}
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-3">
      <h4 className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-fd-muted-foreground">
        {title}
      </h4>
      {children}
    </div>
  );
}