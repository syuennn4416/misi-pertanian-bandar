from pathlib import Path
p = Path(__file__).resolve().parent.parent
html = (p / 'index.html').read_text()
css = (p / 'style.css').read_text()
content = '\n'.join('\n'.join(line for line in (p / ('js/' + name + '.js')).read_text().splitlines() if not line.startswith('import ')).replace('export const ', 'const ').replace('export function ', 'function ').replace('export class ', 'class ') for name in ['content', 'progress', 'science', 'assembly', 'hands', 'phase3-content', 'phase3'])
art = (p / 'js/art.js').read_text().replace('export function ', 'function ')
game = '\n'.join(line for line in (p / 'js/game.js').read_text().splitlines() if not line.startswith('import '))
html = html.replace('<link rel="stylesheet" href="style.css">', '<style>' + css + '</style>')
html = html.replace('<script type="module" src="js/game.js"></script>', '<script>\n' + content + '\n' + art + '\n' + game + '\n</script>')
(p / 'Misi-Pertanian-Bandar.html').write_text(html)
