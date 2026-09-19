function linkify(text: string) {
  const urlRegex = /https?:\/\/[^\s)]+/g;

  const parts: (string | React.ReactNode)[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = urlRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }

    const url = match[0];
    const label = labelForUrl(url);

    parts.push(
      <a
        key={match.index}
        href={url}
        target="_blank"
        rel="noreferrer noopener"
        className="text-fd-primary underline underline-offset-2 hover:opacity-80"
      >
        {label}
      </a>
    );

    lastIndex = match.index + url.length;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts;
}

function labelForUrl(url: string): string {
  try {
    const u = new URL(url);
    const host = u.hostname.replace(/^www\./, '');

    const names: Record<string, string> = {
      'docs.omnicord.site': 'Docs',
      'omnicord.site': 'Website',
      'shop.omnicord.site': 'Shop',
      'discord.gg': 'Support Server',
      'discord.com': 'Discord',
    };

    if (names[host]) return names[host];

    if (host.includes('discord.gg') || host.includes('discord.com')) {
      return 'Discord';
    }

    const parts = host.split('.');
    if (parts.length >= 2) {
      const name = parts[0];
      return name.charAt(0).toUpperCase() + name.slice(1);
    }

    return host;
  } catch {
    return url;
  }
}

export function CommandTips({ items }: { items: string[] }) {
  if (!items || items.length === 0) return null;

  return (
    <div className="my-4">
      {items.map((tip, i) => (
        <div
          key={i}
          className="mb-2 flex items-start gap-2 rounded-lg border border-fd-border/60 bg-fd-card/40 px-3 py-2 text-sm text-fd-muted-foreground"
        >
          <span className="text-fd-primary">&#8226;</span>
          <span>{linkify(tip)}</span>
        </div>
      ))}
    </div>
  );
}