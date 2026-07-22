// Rubikon-Inhaltskern: eingeschraenktes Markdown fuer die redaktionelle JSON-Konfiguration.
// Dieser Kern ist bewusst kein allgemeiner Markdown-Interpreter. Er enthaelt weder DOM- noch
// Netzwerkzugriffe und wird vom Stationsvertrag, Offline-Pruefer und Browser gemeinsam genutzt.

const MAX_LENGTH = 4000;

function fail(detail) {
  return { ok: false, code: 'invalid_rubikon_content', detail };
}

function parseInline(source) {
  const nodes = [];
  let text = '';

  const flushText = () => {
    if (text) nodes.push({ type: 'text', value: text });
    text = '';
  };

  for (let i = 0; i < source.length;) {
    if (source.startsWith('**', i)) {
      const end = source.indexOf('**', i + 2);
      if (end === -1 || end === i + 2) return fail('ungepaarte oder leere **-Formatierung');
      const value = source.slice(i + 2, end);
      if (value.includes('*')) return fail('verschachtelte **-Formatierung ist nicht erlaubt');
      flushText();
      nodes.push({ type: 'strong', value });
      i = end + 2;
      continue;
    }
    if (source[i] === '*') {
      const end = source.indexOf('*', i + 1);
      if (end === -1 || end === i + 1) return fail('ungepaarte oder leere *-Formatierung');
      const value = source.slice(i + 1, end);
      if (value.includes('*')) return fail('verschachtelte *-Formatierung ist nicht erlaubt');
      flushText();
      nodes.push({ type: 'em', value });
      i = end + 1;
      continue;
    }
    text += source[i];
    i += 1;
  }
  flushText();
  return { ok: true, nodes };
}

function parseTextBlock(lines, kind) {
  const children = [];
  for (const line of lines) {
    const inline = parseInline(line);
    if (!inline.ok) return inline;
    children.push(inline.nodes);
  }
  return { ok: true, node: { type: kind, children } };
}

/**
 * Parst die eng begrenzte Rubikon-Syntax. Ergebnis ist ein kleiner, sicherer AST,
 * nie HTML. Zeilen innerhalb eines Absatzes werden als getrennte Textzeilen erhalten;
 * der DOM-Renderer entscheidet bewusst ueber deren sichtbaren Umbruch.
 */
export function parseRubikonMarkdown(markdown) {
  if (typeof markdown !== 'string') return fail('Inhalt ist kein String');
  if (markdown.length === 0 || markdown.length > MAX_LENGTH) return fail('Inhalt ist leer oder zu lang');
  if (/[<>`\\\[\]|]/.test(markdown) || /&(?:#\d+|#x[0-9a-f]+|[a-z]+);/i.test(markdown)) return fail('HTML, Links, Tabellen, Escape- und Code-Syntax sind nicht erlaubt');
  if (/!\[|\[[^\]]*\]\s*\(|^\s*>|^\s*---\s*$/m.test(markdown)) return fail('Bilder, Links, Zitate oder horizontale Regeln sind nicht erlaubt');
  if (/\t/.test(markdown)) return fail('Tabs und damit Listenverschachtelung sind nicht erlaubt');

  const normalized = markdown.replace(/\r\n?/g, '\n').trim();
  if (!normalized) return fail('Inhalt ist leer');
  const ast = [];

  // Arbeitswarteschlange statt einfacher for-Schleife: eine Überschriftszeile ist
  // immer genau ein eigener Block, auch wenn direkt folgender Text (ohne Leerzeile)
  // im selben leerzeilengetrennten Rohblock steht. Der Rest der Zeilen wird dafür
  // als neuer Block erneut vorne eingereiht, statt die ganze Gruppe abzuweisen.
  const queue = normalized.split(/\n[ \t]*\n+/);

  while (queue.length > 0) {
    const block = queue.shift();
    const lines = block.split('\n');
    if (lines.some(line => line.trim() === '')) return fail('leerer Block');

    const heading = /^(#{1,3})\s+(.+)$/.exec(lines[0]);
    if (heading) {
      if (heading[1].length === 1) return fail('Ueberschriften der Ebene 1 sind nicht erlaubt');
      const inline = parseInline(heading[2]);
      if (!inline.ok) return inline;
      ast.push({ type: 'heading', level: heading[1].length, children: inline.nodes });
      if (lines.length > 1) queue.unshift(lines.slice(1).join('\n'));
      continue;
    }

    if (lines.some(line => /^\s+/.test(line))) return fail('Einrueckungen und Listenverschachtelung sind nicht erlaubt');
    const unordered = lines.every(line => /^-\s+\S/.test(line));
    const ordered = lines.every(line => /^\d+\.\s+\S/.test(line));
    if (unordered || ordered) {
      if (unordered && ordered) return fail('Listentypen duerfen nicht gemischt werden');
      const items = [];
      let expected = 1;
      for (const line of lines) {
        const match = unordered ? /^-\s+(.+)$/.exec(line) : /^(\d+)\.\s+(.+)$/.exec(line);
        if (!match) return fail('ungueltige Listenzeile');
        if (!unordered && Number(match[1]) !== expected++) return fail('geordnete Liste muss bei 1 beginnen und fortlaufend sein');
        const inline = parseInline(unordered ? match[1] : match[2]);
        if (!inline.ok) return inline;
        items.push(inline.nodes);
      }
      ast.push({ type: unordered ? 'ul' : 'ol', items });
      continue;
    }

    if (lines.some(line => /^#|^-\s|^\d+\.\s|^\[|^!\[/.test(line))) return fail('unbekannte oder nicht erlaubte Zeilenform');
    const paragraph = parseTextBlock(lines, 'paragraph');
    if (!paragraph.ok) return paragraph;
    ast.push(paragraph.node);
  }

  return { ok: true, ast };
}

export function validateRubikonContent(rubikon) {
  if (typeof rubikon !== 'object' || rubikon === null || Array.isArray(rubikon))
    return fail('rubikon ist kein Objekt');
  const keys = Object.keys(rubikon).sort();
  if (keys.join('|') !== 'long|short') return fail('rubikon muss genau long und short enthalten');
  for (const variant of ['long', 'short']) {
    const result = parseRubikonMarkdown(rubikon[variant]);
    if (!result.ok) return fail('rubikon.' + variant + ': ' + result.detail);
  }
  return { ok: true };
}
