// AF-GM-02-Nachputz: einziger, hartkodierter Ort für die Chromium-Laufzeit.
// Grund: Z:\ ist NAS-/Nextcloud-Sync-Ablage — Browser-Binaries gehören nicht
// in den Sync-Pfad. Kein zweiter oder stiller Fallback auf
// %USERPROFILE%\AppData\Local\ms-playwright oder
// node_modules/playwright-core/.local-browsers.

export const GOLDEN_MASTER_BROWSERS_PATH = String.raw`C:\Tools\finanzwesir-playwright\af-gm-02\browsers`;

export async function loadChromium() {
  process.env.PLAYWRIGHT_BROWSERS_PATH = GOLDEN_MASTER_BROWSERS_PATH;
  const { chromium } = await import('playwright');
  const executablePath = chromium.executablePath();
  if (!executablePath.startsWith(GOLDEN_MASTER_BROWSERS_PATH)) {
    throw new Error(
      `GM-ERR-BROWSER-PATH: erwartete Chromium-Laufzeit unter '${GOLDEN_MASTER_BROWSERS_PATH}', ` +
        `tatsächlich aufgelöst zu '${executablePath}'.`
    );
  }
  return { chromium, executablePath };
}
