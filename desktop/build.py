# AniManxwa kompyuter versiyasini yig'adi -> _site/ (GitHub Pages ga yuklanadi)
# Mobil fayllarga (www/, scripts/, android) TEGMAYDI: ulardan faqat nusxa oladi.
import os, re, sys, json, shutil, zipfile, struct, glob

OUT = "_site"
D = "desktop"


def find(name):
    for p in (os.path.join("www", name), name):
        if os.path.isfile(p):
            return p
    sys.exit("::error::Topilmadi: www/" + name)


shutil.rmtree(OUT, ignore_errors=True)
os.makedirs(OUT)

# 1) server manzili (mobil bilan umumiy api.txt)
api = open("api.txt", encoding="utf-8").read().strip() if os.path.exists("api.txt") else ""
if not api.startswith("http"):
    sys.exit("::error::api.txt ichida server manzili yo'q (https://...). Kompyuter versiyasi serversiz ishlamaydi.")

# 2) app.js va style.css: mobil bilan BIR XIL, faqat server manzili joylanadi
a = open(find("app.js"), encoding="utf-8").read().replace("__API__", api)
a = re.sub(r'H1="[0-9a-f]{64}",H2="[0-9a-f]{64}"', 'H1="",H2=""', a)  # server rejimida parol xeshi kerak emas
open(os.path.join(OUT, "app.js"), "w", encoding="utf-8").write(a)
shutil.copy(find("style.css"), os.path.join(OUT, "style.css"))

# 3) kompyuterga xos fayllar
for f in ("desktop.css", "desktop.js", "sw.js", "404.html"):
    shutil.copy(os.path.join(D, f), os.path.join(OUT, f))

# 4) index.html: mobil index.html dan olinadi, kompyuter qismlari qo'shiladi
h = open(find("index.html"), encoding="utf-8").read()
head = ('<link rel="manifest" href="manifest.webmanifest">'
        '<link rel="icon" href="icon-192.png">'
        '<link rel="apple-touch-icon" href="icon-192.png">'
        '<link rel="stylesheet" href="desktop.css">')
if "</head>" not in h or "</body>" not in h:
    sys.exit("::error::index.html ichida </head> yoki </body> topilmadi")
h = h.replace("</head>", head + "</head>", 1)
h = h.replace("</body>", '<script src="desktop.js"></script></body>', 1)
open(os.path.join(OUT, "index.html"), "w", encoding="utf-8").write(h)

# 5) ikonkalar (icons.zip dan; keyin yangilansa ham o'zi oladi)
icons = []
z = "icons.zip" if os.path.exists("icons.zip") else os.path.join("scripts", "icons.zip")
if os.path.exists(z):
    tmp = "_icons"
    shutil.rmtree(tmp, ignore_errors=True)
    zipfile.ZipFile(z).extractall(tmp)
    best, bs = None, 0
    for p in glob.glob(tmp + "/**/ic_launcher.png", recursive=True):
        with open(p, "rb") as f:
            hd = f.read(24)
        if hd[:8] == b"\x89PNG\r\n\x1a\n":
            w = struct.unpack(">I", hd[16:20])[0]
            if w > bs:
                best, bs = p, w
    if best:
        try:
            from PIL import Image
            im = Image.open(best).convert("RGBA")
            for s in (192, 512):
                im.resize((s, s), Image.LANCZOS).save(os.path.join(OUT, "icon-%d.png" % s))
                icons.append({"src": "icon-%d.png" % s, "sizes": "%dx%d" % (s, s), "type": "image/png", "purpose": "any"})
        except Exception:
            shutil.copy(best, os.path.join(OUT, "icon-192.png"))
            icons.append({"src": "icon-192.png", "sizes": "%dx%d" % (bs, bs), "type": "image/png"})
    shutil.rmtree(tmp, ignore_errors=True)

man = {"name": "AniManxwa", "short_name": "AniManxwa", "start_url": "./", "scope": "./",
       "display": "standalone", "background_color": "#000000", "theme_color": "#000000",
       "icons": icons}
json.dump(man, open(os.path.join(OUT, "manifest.webmanifest"), "w", encoding="utf-8"), ensure_ascii=False)
open(os.path.join(OUT, ".nojekyll"), "w").close()
print("Tayyor. Server:", api, "| ikonka:", len(icons))
