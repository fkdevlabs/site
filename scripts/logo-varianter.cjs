// Tar fram logovarianter från den uppladdade loggan (vit bakgrund, ingen alfa).
// Kör från sajtens rotmapp: node scripts/logo-varianter.cjs
const sharp = require('sharp');
const SRC = 'public/images/fkdevlabs_versaler_vit_3d.png';

(async () => {
  const { data, info } = await sharp(SRC).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width: W, height: H } = info;

  // "Color to alpha" mot vitt: varje pixel blir färg + genomskinlighet så att mjuka skuggor behålls.
  const dark = Buffer.alloc(W * H * 4);
  const light = Buffer.alloc(W * H * 4);
  for (let i = 0, j = 0; i < data.length; i += 3, j += 4) {
    const c = [data[i], data[i + 1], data[i + 2]];
    let a = Math.max(...c.map((v) => (255 - v) / 255));
    if (a < 0.04) a = 0;
    const col = a ? c.map((v) => Math.round(Math.min(255, Math.max(0, (v - 255 * (1 - a)) / a)))) : [0, 0, 0];
    dark.set([...col, Math.round(a * 255)], j);

    // Ljus variant för mörk bakgrund: gråtoner inverteras, blått behålls, skuggor tonas bort.
    const sat = Math.max(...col) - Math.min(...col);
    const L = (col[0] + col[1] + col[2]) / 3;
    if (a && sat < 40) {
      const t = Math.min(1, Math.max(0, (L - 45) / 90)); // 0 = svart text, 1 = grå "LABS"
      const v = Math.round(240 - t * 85);
      const fade = a > 0.6 ? 1 : a / 0.6;
      light.set([v, v + 3, v + 6, Math.round(a * fade * 255)], j);
    } else if (a) {
      // Blått: originalfärgen med full täckning (annars blir det mörkt mot mörk bakgrund).
      light.set([...c, Math.round(Math.min(1, a / 0.35) * 255)], j);
    }
  }

  const raw = (buf) => sharp(buf, { raw: { width: W, height: H, channels: 4 } });
  // Beskärning: hela loggan respektive bara symbolen (oktagonen).
  const full = { left: 205, top: 300, width: 1395, height: 260 };
  const icon = { left: 205, top: 300, width: 255, height: 255 };

  const save = (buf, area, h, out) =>
    raw(buf).extract(area).png().toBuffer().then((b) => sharp(b).trim({ threshold: 1 }).resize({ height: h }).png({ compressionLevel: 9 }).toFile(out));

  console.log(await save(dark, full, 96, 'public/images/logo.png'));
  console.log(await save(light, full, 96, 'public/images/logo-light.png'));
  const ico = await raw(dark).extract(icon).png().toBuffer().then((b) => sharp(b).trim({ threshold: 1 }).toBuffer());
  console.log(await sharp(ico).resize(64, 64, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toFile('public/favicon.png'));
  console.log(
    await sharp(ico).resize(140, 140, { fit: 'contain', background: '#ffffff' }).extend({ top: 20, bottom: 20, left: 20, right: 20, background: '#ffffff' }).flatten({ background: '#ffffff' }).png().toFile('public/apple-touch-icon.png'),
  );
})();
