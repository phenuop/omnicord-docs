import { readFileSync, writeFileSync, mkdirSync, existsSync, rmSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const COMMANDS_DIR = join(ROOT, 'content', 'docs', 'commands');
const TS_PATH = join(ROOT, 'lib', 'commands.ts');

const commandData = (() => {
  const src = readFileSync(TS_PATH, 'utf8');
  const m = src.match(/export\s+const\s+commandData\s*(?::\s*Command\[\])?\s*=\s*(\[[\s\S]*?\]);/);
  if (!m) {
    console.error('Could not find commandData in lib/commands.ts');
    process.exit(1);
  }
  return eval(m[1]);
})();

console.log(`Found ${commandData.length} commands.`);

const esc = (text) => {
  if (typeof text !== 'string') return text;
  return text
    .split(/(`[^`]*`)/g)
    .map((p) =>
      p.startsWith('`') && p.endsWith('`')
        ? p
        : p.replace(/<([^<>]+)>/g, '`<$1>`').replace(/\{/g, '\\{').replace(/\}/g, '\\}')
    )
    .join('');
};

const codeBlock = (str) =>
  ['```', String(str).replace(/```/g, '``\u200b`'), '```'].join('\n');

const escapeJson = (str) => JSON.stringify(str);

const section = (lines, heading, body) => {
  if (!body) return;
  lines.push(`## ${heading}`, '');
  body(lines);
};

const h3List = (lines, items, getText) => {
  for (const item of items) {
    const [hText, hBody] = getText(item);
    lines.push(`### ${esc(hText)}`, '');
    if (hBody) lines.push(esc(hBody), '');
  }
};

const h4List = (lines, items, getText) => {
  for (const item of items) {
    const [hText, hBody] = getText(item);
    lines.push(`#### ${esc(hText)}`, '');
    if (hBody) lines.push(esc(hBody), '');
  }
};

const bulletList = (lines, items, getText) => {
  for (const item of items) {
    lines.push(`- ${esc(getText(item))}`);
  }
  lines.push('');
};

const tableList = (lines, rows, headers, getRow) => {
  lines.push(`| ${headers.join(' | ')} |`);
  lines.push(`|${headers.map(() => '------').join('|')}|`);
  for (const row of rows) {
    lines.push(`| ${getRow(row).map(esc).join(' | ')} |`);
  }
  lines.push('');
};

const buildCommandMdx = (cmd) => {
  const lines = [];
  const info = cmd.detailedInfo || {};

  lines.push('---');
  lines.push(`title: ".${cmd.name}"`);
  lines.push(`description: ${escapeJson(cmd.description)}`);
  lines.push('---');
  lines.push('');

  const imports = [];
  if (cmd.tips.length > 0) imports.push('CommandTips');
  if (imports.length > 0) {
    lines.push(`import { ${imports.join(', ')} } from '@/components/command-tips';`);
    lines.push('');
  }

  lines.push('## Overview', '');
  lines.push(esc(cmd.description), '');
  if (info.whatItDoes) lines.push(esc(info.whatItDoes), '');

  lines.push('## Usage', '');
  lines.push(codeBlock(cmd.usage), '');

  if (cmd.aliases.length > 0) {
    lines.push(
      '**Aliases:** ' + cmd.aliases.map((a) => '`.' + a + '`').join(', '),
      ''
    );
  }

  const metaBits = [];
  if (cmd.cooldown) metaBits.push(`**Cooldown:** ${cmd.cooldown}s`);
  if (cmd.guildOnly) metaBits.push('**Guild Only**');
  if (cmd.ownerOnly) metaBits.push('**Owner Only**');
  if (metaBits.length) lines.push(metaBits.join(' | '), '');

  if (info.subcommands?.length) {
    section(lines, 'Subcommands', (l) =>
      h3List(l, info.subcommands, (sc) => [sc.name, sc.description])
    );
  }

  if (info.modes?.length) {
    section(lines, 'Battle Modes', (l) =>
      h3List(l, info.modes, (m) => [m.name, m.description])
    );
  }

  if (info.filters?.length) {
    section(lines, 'Available Filters', (l) =>
      bulletList(l, info.filters, (f) =>
        `${f.filter ? '`' + f.filter + '`' : '`' + f.name + '`'} - ${f.description}`
      )
    );
  }

  if (info.ranks?.length) {
    section(lines, 'Battle Ranks', (l) =>
      tableList(l, info.ranks, ['Rank', 'Rating'], (r) => [r.name, r.rating])
    );
  }

  if (info.boxTypes?.length) {
    section(lines, 'Box Types', (l) =>
      h3List(l, info.boxTypes, (b) => [b.name, b.description])
    );
  }

  if (info.types?.length) {
    section(lines, 'Types', (l) =>
      h3List(l, info.types, (t) => [t.name, t.description])
    );
  }

  if (info.options?.length) {
    section(lines, 'Options', (l) =>
      h3List(l, info.options, (o) => [o.name, o.description])
    );
  }

  if (info.games?.length) {
    section(lines, 'Games', (l) =>
      h4List(l, info.games, (g) => [g, ''])
    );
  }

  if (info.sections?.length) {
    section(lines, 'Sections', (l) =>
      h3List(l, info.sections, (s) => [s.name, s.description])
    );
  }

  if (info.itemTypes?.length) {
    section(lines, 'Item Types', (l) =>
      h4List(l, info.itemTypes, (it) => [it, ''])
    );
  }

  if (info.shopTypes?.length) {
    section(lines, 'Shop Types', (l) =>
      h3List(l, info.shopTypes, (st) => [st.name, st.description])
    );
  }

  if (info.currency) {
    section(lines, 'Currency Types', (l) => {
      l.push(`- **Tyden**: ${esc(info.currency.tyden)}`);
      l.push(`- **Nullite**: ${esc(info.currency.nullite)}`);
      l.push('');
    });
  }

  if (info.features?.length) {
    section(lines, 'Features', (l) =>
      h4List(l, info.features, (f) => [f, ''])
    );
  }

  if (info.information?.length) {
    section(lines, 'Information', (l) =>
      h4List(l, info.information, (i) => [i, ''])
    );
  }

  if (info.benefits?.length) {
    section(lines, 'Benefits', (l) =>
      h4List(l, info.benefits, (b) => [b, ''])
    );
  }

  if (info.rewards) {
    section(lines, 'Rewards', (l) => {
      if (Array.isArray(info.rewards)) {
        h4List(l, info.rewards, (r) => [r, '']);
      } else {
        l.push(esc(info.rewards), '');
      }
    });
  }

  if (info.cost) section(lines, 'Cost', (l) => l.push(esc(info.cost), ''));
  if (info.limits) section(lines, 'Limits', (l) => l.push(esc(info.limits), ''));

  if (info.requirements) {
    section(lines, 'Requirements', (l) => {
      if (typeof info.requirements === 'string') {
        l.push(esc(info.requirements), '');
      } else {
        for (const [k, v] of Object.entries(info.requirements)) {
          l.push(`- **${esc(k)}**: ${esc(v)}`);
        }
        l.push('');
      }
    });
  }

  if (info.restrictions?.length) {
    section(lines, 'Restrictions', (l) =>
      h4List(l, info.restrictions, (r) => [r, ''])
    );
  }

  if (info.rules) section(lines, 'Rules', (l) => l.push(esc(info.rules), ''));
  if (info.rankers)
    section(lines, 'Rankers', (l) => l.push(esc(info.rankers), ''));

  if (info.items?.length) {
    section(lines, 'Items', (l) =>
      h4List(l, info.items, (it) => [it, ''])
    );
  }

  if (cmd.examples.length > 0) {
    section(lines, 'Examples', (l) =>
      l.push(codeBlock(cmd.examples.join('\n')), '')
    );
  }

  if (cmd.tips.length > 0) {
    lines.push('## Tips', '');
    lines.push(`<CommandTips items={${JSON.stringify(cmd.tips)}} />`, '');
  }

  return lines.join('\n');
};

for (const cmd of commandData) {
  const folder = cmd.category.toLowerCase();
  const dir = join(COMMANDS_DIR, folder);
  if (existsSync(dir)) rmSync(dir, { recursive: true, force: true });
}

const categoriesSeen = new Set();

for (const cmd of commandData) {
  const folder = cmd.category.toLowerCase();
  categoriesSeen.add(folder);
  const dir = join(COMMANDS_DIR, folder);
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, `${cmd.name}.mdx`), buildCommandMdx(cmd), 'utf8');
}

for (const folder of categoriesSeen) {
  const dir = join(COMMANDS_DIR, folder);
  const pages = commandData
    .filter((c) => c.category.toLowerCase() === folder)
    .map((c) => c.name)
    .sort();
  writeFileSync(
    join(dir, 'meta.json'),
    JSON.stringify(
      { title: folder.charAt(0).toUpperCase() + folder.slice(1), pages },
      null,
      2
    ),
    'utf8'
  );
}

writeFileSync(
  join(COMMANDS_DIR, 'meta.json'),
  JSON.stringify(
    { title: 'All Commands', pages: ['index', ...[...categoriesSeen].sort()] },
    null,
    2
  ),
  'utf8'
);

console.log(
  `\nGenerated ${commandData.length} command pages across ${categoriesSeen.size} categories.`
);