import { source } from '@/lib/source';
import { notFound } from 'next/navigation';
import { ImageResponse } from 'next/og';
import { getPageImageUrl } from '@/lib/shared';
import { buildBreadcrumbTrail } from '@/lib/embed';

export const dynamic = 'force-static';

const fontUrls = {
  regular:
    'https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuLyfMZg.ttf',
  bold:
    'https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuFuYMZg.ttf',
};

const emojiUrls = {
  admin: 'https://cdn.discordapp.com/emojis/1568888770546372649.png?size=64',
  docs: 'https://cdn.discordapp.com/emojis/1569000806932287568.png?size=96',
  discordlogo: 'https://cdn.discordapp.com/emojis/1568996206338904128.png?size=64',
  kofi: 'https://cdn.discordapp.com/emojis/1568997776635727923.png?size=64',
};

async function fetchFont(url: string) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Failed to load OG font: ${response.status}`);
  return response.arrayBuffer();
}

async function fetchEmoji(url: string): Promise<string | undefined> {
  try {
    const response = await fetch(url);
    if (!response.ok) return undefined;
    const image = Buffer.from(await response.arrayBuffer()).toString('base64');
    return `data:image/png;base64,${image}`;
  } catch {
    return undefined;
  }
}

function clampDescription(description: string) {
  const lines = [''];
  let truncated = false;
  for (const word of description.trim().split(/\s+/)) {
    const line = lines[lines.length - 1];
    if (line.length + word.length + (line ? 1 : 0) <= 54) {
      lines[lines.length - 1] = line ? `${line} ${word}` : word;
    } else if (lines.length < 3) {
      lines.push(word);
    } else {
      truncated = true;
      break;
    }
  }

  if (truncated) {
    const last = lines[2];
    lines[2] = `${last.slice(0, 50).trimEnd()}...`;
  }
  return lines.filter(Boolean).join('\n');
}

export async function GET(_req: Request, { params }: RouteContext<'/og/docs/[...slug]'>) {
  const { slug } = await params;
  const page = source.getPage(slug.slice(0, -1));
  if (!page) notFound();

  const [regularFont, boldFont, admin, docs, discordlogo, kofi] = await Promise.all([
    fetchFont(fontUrls.regular),
    fetchFont(fontUrls.bold),
    fetchEmoji(emojiUrls.admin),
    fetchEmoji(emojiUrls.docs),
    fetchEmoji(emojiUrls.discordlogo),
    fetchEmoji(emojiUrls.kofi),
  ]);

  const breadcrumb = [
    'Omnicord',
    ...buildBreadcrumbTrail(page).map((segment) => segment.title),
  ];
  const description = clampDescription(page.data.description ?? '');
  const title = page.data.title;
  const titleFontSize = title.length > 18 ? 76 : 96;
  const displayTitle =
    title.length > 22 ? `${title.slice(0, 21).trimEnd()}…` : title;
  const icon = (src: string | undefined, size: number) =>
    src ? <img src={src} width={size} height={size} /> : null;

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          width: '100%',
          height: '100%',
          boxSizing: 'border-box',
          padding: 64,
          backgroundColor: '#111214',
          backgroundImage:
            'radial-gradient(800px 480px at 0% 0%, hsla(147, 100%, 39%, 0.08), transparent 70%), radial-gradient(700px 440px at 100% 100%, hsla(147, 100%, 39%, 0.035), transparent 70%)',
          color: '#f5f6fa',
          fontFamily: 'Inter',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: 0,
            width: '100%',
          }}
        >
          <div style={{ display: 'flex', marginRight: 14 }}>
            {icon(admin, 44)}
          </div>
          {breadcrumb.map((segment, index) => (
            <div
              key={`${segment}-${index}`}
              style={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              {index > 0 && (
                <div
                  style={{
                    display: 'flex',
                    margin: '0 12px',
                    color: '#6D6F78',
                    fontSize: 26,
                  }}
                >
                  &gt;
                </div>
              )}
              <div
                style={{
                  display: 'flex',
                  color: index === breadcrumb.length - 1 ? '#4ADE80' : '#B5BAC1',
                  fontSize: 26,
                  lineHeight: 1.2,
                  fontWeight: index === breadcrumb.length - 1 ? 700 : 400,
                }}
              >
                {segment}
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            display: 'flex',
            flex: 1,
            alignItems: 'center',
            gap: 32,
            minHeight: 0,
          }}
        >
          <div
            style={{
              display: 'flex',
              width: 6,
              height: 236,
              flexShrink: 0,
              borderRadius: 999,
              background: '#00C864',
            }}
          />
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              gap: 22,
              flex: 1,
              minWidth: 0,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
              {icon(docs, 72)}
              <div
                style={{
                  display: 'flex',
                  flex: 1,
                  minWidth: 0,
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                  fontSize: titleFontSize,
                  lineHeight: 1,
                  fontWeight: 700,
                  color: '#ffffff',
                  letterSpacing: -2,
                }}
              >
                {displayTitle}
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                whiteSpace: 'pre-wrap',
                overflow: 'hidden',
                maxWidth: 960,
                maxHeight: 144,
                fontSize: 34,
                lineHeight: 1.4,
                color: '#A0A5AD',
              }}
            >
              {description}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
          <div
            style={{
              display: 'flex',
              width: '100%',
              height: 1,
              background: 'rgba(255, 255, 255, 0.1)',
            }}
          />
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              width: '100%',
              paddingTop: 20,
              color: '#DBDEE1',
              fontSize: 28,
              fontWeight: 700,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              {icon(discordlogo, 40)}
              <div style={{ display: 'flex' }}>Support</div>
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                marginLeft: 40,
              }}
            >
              {icon(kofi, 40)}
              <div style={{ display: 'flex' }}>Donate</div>
            </div>
            <div
              style={{
                display: 'flex',
                marginLeft: 'auto',
                color: '#A0A5AD',
                fontSize: 26,
                fontWeight: 400,
              }}
            >
              docs.omnicord.site
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: 'Inter', data: regularFont, weight: 400 },
        { name: 'Inter', data: boldFont, weight: 700 },
      ],
    },
  );
}

export function generateStaticParams() {
  return source.getPages().map((page) => ({
    lang: page.locale,
    slug: getPageImageUrl(page).segments,
  }));
}
