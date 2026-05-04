/**
 * Finanzwesir Janitor Script v1.1.0
 *
 * Transforms Markdown-rendered patterns inside .gh-content into
 * styled Design-System components (Info/Warn/Fazit Boxes, Check/Warn Lists).
 *
 * Ghost CMS renders Markdown to standard HTML. This script runs after
 * rendering and upgrades specific patterns to the Finanzwesir Design-System.
 *
 * Patterns:
 *   > [!NOTE] Title    → Info-Box (Feder.svg, Petrol)
 *   > [!WARNING] Title → Warn-Box (Schwert.svg, Purpur)
 *   > [!TIP] Title     → Fazit-Box (kein Icon, Gray)
 *   - [+] Text         → Checklist (Petrol Haken)
 *   - [-] Text         → Warnlist (Purpur Kreuz)
 *
 * Icon path: Set via data-icon-base attribute on the script tag, or
 *   pass { iconBasePath: '/path/' } to init(). Must end with '/'.
 *
 * Quality: Defensive, idempotent, no innerHTML for user content.
 * Scope: Only operates inside .gh-content elements.
 */
(function FwJanitor() {
  'use strict';

  // ── Constants ──────────────────────────────────────────────────────

  const PROCESSED_ATTR = 'data-fw-janitor';
  const PROCESSED_VALUE = 'done';
  const SCOPE_SELECTOR = '.gh-content';

  /** Icon base path — auto-detected from script tag or set via init() */
  const _scriptEl = document.currentScript;
  let _iconBasePath = (_scriptEl && _scriptEl.getAttribute('data-icon-base')) || '';

  /** Box type definitions — maps pattern to visual config */
  const BOX_TYPES = Object.freeze({
    NOTE: Object.freeze({
      pattern: /^\[!NOTE\]\s*/,
      icon: 'Feder.svg',
      iconAlt: 'Info',
      wrapperClass: 'bg-petrol-tint border border-petrol-20 rounded-xl p-6 md:p-8 my-8 flex flex-col md:flex-row gap-4 md:gap-8 items-start',
      iconBgClass: 'bg-petrol-30',
      titleClass: 'font-display text-lg md:text-xl text-petrol mb-2 mt-1',
      contentClass: 'text-text-secondary m-0 text-lg leading-relaxed'
    }),
    WARNING: Object.freeze({
      pattern: /^\[!WARNING\]\s*/,
      icon: 'Schwert.svg',
      iconAlt: 'Achtung',
      wrapperClass: 'bg-white border-l-4 border-purpur shadow-soft p-6 md:p-8 my-8 flex flex-col md:flex-row gap-4 md:gap-8 items-start',
      iconBgClass: 'bg-purpur-30',
      titleClass: 'font-display text-lg md:text-xl text-purpur mb-2 mt-1',
      contentClass: 'text-text-secondary m-0 text-lg leading-relaxed'
    }),
    TIP: Object.freeze({
      pattern: /^\[!TIP\]\s*/,
      icon: null, // Fazit has no icon
      iconAlt: null,
      wrapperClass: 'bg-gray-50 rounded-xl p-6 md:p-8 border border-gray-200 shadow-sm my-8',
      iconBgClass: null,
      titleClass: 'font-display text-xl text-petrol mb-4',
      contentClass: 'text-text-secondary m-0 text-lg'
    })
  });

  /** SVG paths for list icons */
  const CHECK_SVG = '<svg class="w-6 h-6 text-petrol shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg>';
  const WARN_SVG = '<svg class="w-6 h-6 text-purpur shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M6 18L18 6M6 6l12 12"></path></svg>';

  // ── Helpers ────────────────────────────────────────────────────────

  /** Check if element was already processed */
  function _isProcessed(el) {
    return el && el.getAttribute(PROCESSED_ATTR) === PROCESSED_VALUE;
  }

  /** Mark element as processed (idempotency guard) */
  function _markProcessed(el) {
    if (el) el.setAttribute(PROCESSED_ATTR, PROCESSED_VALUE);
  }

  /**
   * Detect which box type a blockquote represents.
   * Returns { type, title, contentNodes } or null.
   */
  function _detectBoxType(blockquote) {
    const firstP = blockquote.querySelector('p');
    if (!firstP) return null;

    const text = (firstP.textContent || '').trim();

    for (const [key, config] of Object.entries(BOX_TYPES)) {
      if (config.pattern.test(text)) {
        const title = text.replace(config.pattern, '').trim();

        // Collect remaining content nodes (everything after first <p>)
        const contentNodes = [];
        let sibling = firstP.nextElementSibling;
        while (sibling) {
          contentNodes.push(sibling);
          sibling = sibling.nextElementSibling;
        }

        return { type: key, config, title, contentNodes };
      }
    }

    return null; // Not a pattern blockquote — leave untouched
  }

  // ── Box Transformation ─────────────────────────────────────────────

  /**
   * Build a box DOM node from config.
   * Uses createElement + textContent (no innerHTML for user text).
   */
  function _buildBox(config, title, contentNodes) {
    const wrapper = document.createElement('div');
    wrapper.className = config.wrapperClass;

    // Icon container (NOTE and WARNING only, not TIP)
    if (config.icon) {
      const iconOuter = document.createElement('div');
      iconOuter.className = 'w-16 h-16 md:w-[72px] md:h-[72px] shrink-0 flex items-center justify-center rounded-2xl ' + config.iconBgClass + ' p-1';

      const iconImg = document.createElement('img');
      iconImg.src = _iconBasePath + config.icon;
      iconImg.alt = config.iconAlt;
      iconImg.className = 'w-full h-full object-contain hard-rim';

      iconOuter.appendChild(iconImg);
      wrapper.appendChild(iconOuter);
    }

    // Text container
    const textOuter = document.createElement('div');
    textOuter.className = config.icon ? 'flex-1 min-w-0' : ''; // Fazit has no flex-1

    // Title
    if (title) {
      const h4 = document.createElement('h4');
      h4.className = config.titleClass;
      h4.textContent = title; // Safe: textContent, not innerHTML
      textOuter.appendChild(h4);
    }

    // Content (move existing DOM nodes — preserves any safe HTML Ghost rendered)
    if (contentNodes.length > 0) {
      const contentDiv = document.createElement('div');
      contentDiv.className = config.contentClass;
      for (const node of contentNodes) {
        contentDiv.appendChild(node); // Moves node, doesn't clone
      }
      textOuter.appendChild(contentDiv);
    }

    wrapper.appendChild(textOuter);
    return wrapper;
  }

  /** Find and transform all pattern blockquotes in scope */
  function _transformBoxes(scope) {
    const blockquotes = scope.querySelectorAll('blockquote');

    for (const bq of blockquotes) {
      if (_isProcessed(bq)) continue;

      try {
        const detected = _detectBoxType(bq);
        if (!detected) {
          // Normal blockquote — mark and skip
          _markProcessed(bq);
          continue;
        }

        const box = _buildBox(detected.config, detected.title, detected.contentNodes);
        _markProcessed(box);

        bq.parentNode.replaceChild(box, bq);
      } catch (err) {
        console.warn('[fw-janitor] Box transformation failed:', err);
        _markProcessed(bq); // Don't retry on error
      }
    }
  }

  // ── List Transformation ────────────────────────────────────────────

  /** Detect if a <ul> contains [+] or [-] items */
  function _detectListType(ul) {
    const items = ul.querySelectorAll('li');
    if (items.length === 0) return null;

    // Check first item to determine type
    const firstText = (items[0].textContent || '').trim();

    if (firstText.startsWith('[+]')) return 'check';
    if (firstText.startsWith('[-]')) return 'warn';
    return null;
  }

  /** Build a styled list item */
  function _buildListItem(text, svgHTML) {
    const li = document.createElement('li');
    li.className = 'flex items-start gap-3';

    // SVG icon (static, not user content — innerHTML is safe here)
    const svgContainer = document.createElement('span');
    svgContainer.innerHTML = svgHTML;
    const svg = svgContainer.firstChild;

    const span = document.createElement('span');
    span.textContent = text; // Safe: textContent for user content

    li.appendChild(svg);
    li.appendChild(span);
    return li;
  }

  /** Find and transform all [+]/[-] lists in scope */
  function _transformLists(scope) {
    const lists = scope.querySelectorAll('ul');

    for (const ul of lists) {
      if (_isProcessed(ul)) continue;

      try {
        const listType = _detectListType(ul);
        if (!listType) {
          _markProcessed(ul);
          continue;
        }

        const isCheck = listType === 'check';
        const prefix = isCheck ? /^\[\+\]\s*/ : /^\[-\]\s*/;
        const svgHTML = isCheck ? CHECK_SVG : WARN_SVG;
        const listClass = isCheck ? 'fw-checklist' : 'fw-warnlist';

        // Build new list
        const newUl = document.createElement('ul');
        newUl.className = listClass + ' space-y-3 text-lg mb-8';

        const items = ul.querySelectorAll('li');
        for (const item of items) {
          const rawText = (item.textContent || '').trim();
          const cleanText = rawText.replace(prefix, '');
          newUl.appendChild(_buildListItem(cleanText, svgHTML));
        }

        _markProcessed(newUl);
        ul.parentNode.replaceChild(newUl, ul);
      } catch (err) {
        console.warn('[fw-janitor] List transformation failed:', err);
        _markProcessed(ul);
      }
    }
  }

  // ── Init ───────────────────────────────────────────────────────────

  function init(config) {
    const cfg = config || {};
    if (typeof cfg.iconBasePath === 'string') {
      _iconBasePath = cfg.iconBasePath;
    }

    const scopes = document.querySelectorAll(SCOPE_SELECTOR);

    if (scopes.length === 0) return; // No content areas — nothing to do

    for (const scope of scopes) {
      _transformBoxes(scope);
      _transformLists(scope);
    }
  }

  // ── Auto-Start ─────────────────────────────────────────────────────

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    // DOM already loaded (script loaded async/deferred)
    init();
  }

  // Expose for manual re-run (e.g. after dynamic content load)
  window.FwJanitor = Object.freeze({ init });

})();
