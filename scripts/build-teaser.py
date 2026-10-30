"""Render an explicitly conceptual 36-second art/development montage with FFmpeg."""
from pathlib import Path
import subprocess

ROOT = Path(__file__).resolve().parents[1]
WORK = ROOT / 'build/teaser'
WORK.mkdir(parents=True, exist_ok=True)
SHOTS = [
    ('hero', 'LA EMERGENCIA TERMINÓ.', 'ARTE CONCEPTUAL'),
    ('station', 'LA ORDEN, NO.', 'ARTE CONCEPTUAL'),
    ('colonia_actual', 'CONSTRUYE UNA LUZ PROPIA.', 'CAPTURA DE DESARROLLO'),
    ('foundry', 'RECUPERA LO QUE NOS SOSTIENE.', 'ARTE AMBIENTAL'),
    ('flooded', 'ESCUCHA A QUIENES QUEDAN.', 'ARTE AMBIENTAL'),
    ('prefecto_actual', 'ENFRÉNTATE A QUIENES DECIDIERON.', 'CAPTURA DE DESARROLLO'),
    ('combat_hud_madre', 'NADIE MANTIENE EL ENLACE A SOLAS.', 'CAPTURA DE DESARROLLO'),
    ('hero', 'ESTA NOCHE, LA LUZ SE QUEDA.', 'EN DESARROLLO · SIN BETA PÚBLICA'),
]


def run(args):
    result = subprocess.run(['ffmpeg', '-hide_banner', '-loglevel', 'error', '-y'] + args,
                            cwd=ROOT, capture_output=True)
    if result.returncode:
        raise RuntimeError(result.stderr.decode('utf-8', errors='replace'))


for index, (image, text, label) in enumerate(SHOTS):
    (WORK / f'title-{index}.txt').write_text(text, encoding='utf-8')
    (WORK / f'label-{index}.txt').write_text('CENIZA NEÓN / ' + label, encoding='utf-8')
    # Gentle movement for concept art; unmodified framing for development captures.
    zoom = "zoompan=z='min(1.035,1+on*0.00025)':x='iw/2-iw/zoom/2':y='ih/2-ih/zoom/2':d=108:s=1280x720:fps=24" if 'CAPTURA' not in label else 'fps=24'
    filters = [
        'scale=1280:720:force_original_aspect_ratio=increase', 'crop=1280:720', zoom,
        'setsar=1', 'drawbox=x=0:y=570:w=iw:h=150:color=0x081110@0.82:t=fill',
        'drawbox=x=68:y=602:w=66:h=2:color=0xd3aa72:t=fill',
        f"drawtext=fontfile=public/fonts/barlow-condensed.ttf:textfile=build/teaser/title-{index}.txt:fontcolor=0xeee9dc:fontsize=36:x=68:y=626",
        f"drawtext=fontfile=public/fonts/manrope.ttf:textfile=build/teaser/label-{index}.txt:fontcolor=0xc4b38d:fontsize=11:x=68:y=681",
        'fade=t=in:st=0:d=0.35', 'fade=t=out:st=4.1:d=0.4', 'format=yuv420p'
    ]
    args=['-loop','1','-i',f'public/media/{image}.webp']
    if index == 7:
        args += ['-i','public/media/logo.png','-filter_complex',
                 '[0:v]' + ','.join(filters) + '[scene];[1:v]scale=740:-1[logo];[scene][logo]overlay=(W-w)/2:(H-h)/2-35,fade=t=out:st=4.1:d=0.4[out]', '-map','[out]']
    else:
        args += ['-vf',','.join(filters)]
    args += ['-t','4.5','-an','-c:v','libx264','-preset','fast','-crf','24','-threads','4',str(WORK/f'shot-{index}.mp4')]
    run(args)
    print('Rendered shot',index+1,flush=True)
(WORK/'concat.txt').write_text('\n'.join(f"file 'shot-{i}.mp4'" for i in range(len(SHOTS))), encoding='utf-8')
run(['-f','concat','-safe','0','-i',str(WORK/'concat.txt'),'-i','public/audio/menu.mp3',
     '-map','0:v:0','-map','1:a:0','-c:v','copy','-c:a','aac','-b:a','160k',
     '-af','afade=t=in:st=0:d=1.5,afade=t=out:st=32:d=4','-t','36',
     '-movflags','+faststart','public/media/teaser.mp4'])
vtt='WEBVTT\n\n'
for i, (_, text, label) in enumerate(SHOTS):
    def stamp(seconds):
        return f'00:{int(seconds//60):02}:{int(seconds%60):02}.{int(seconds%1*1000):03}'
    vtt+=f'{stamp(i*4.5)} --> {stamp((i+1)*4.5)}\n{text}\n[{label.lower()}; música instrumental: Dusk Beacon]\n\n'
(ROOT/'public/media/teaser.vtt').write_text(vtt.rstrip()+'\n',encoding='utf-8')
assert (ROOT/'public/media/teaser.mp4').stat().st_size < 25*1024*1024
print('36-second conceptual teaser complete; below the 25 MiB static asset limit')
