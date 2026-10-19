from PIL import Image, ImageDraw
from pathlib import Path
import json
root=Path(__file__).resolve().parents[1]
paths=json.loads((root/'docs/v2.5.2-pose-sources.json').read_text(encoding='utf-8-sig'))
for id,path in paths.items():
    target=root/f'assets/characters/poses/{id}.webp'
    if target.exists() and target.stat().st_size and target.stat().st_mtime>Path(path).stat().st_mtime:
        continue
    im=Image.open(path).convert('RGBA')
    im=im.crop(im.getbbox())
    im.thumbnail((704,960),Image.Resampling.LANCZOS)
    out=Image.new('RGBA',(768,1024))
    out.alpha_composite(im,((768-im.width)//2,(1024-im.height)//2))
    out.save(target,quality=90,method=4)
ids=list(paths)
for start in range(0,len(ids),6):
    sheet=Image.new('RGB',(1200,780),'#e8f4ef');d=ImageDraw.Draw(sheet)
    for n,id in enumerate(ids[start:start+6]):
        x=(n%3)*400;y=(n//3)*390
        d.text((x+10,y+5),id,fill='black')
        for file,dx,size in [(root/f'assets/characters/mugshots/{id}.webp',0,(180,180)),(root/f'assets/characters/poses/{id}.webp',180,(210,350))]:
            im=Image.open(file).convert('RGBA');im.thumbnail(size)
            sheet.paste(im,(x+dx,y+30),im)
    sheet.save(root/f'docs/v2.5.2-pairs-{start//6+1}.png')
