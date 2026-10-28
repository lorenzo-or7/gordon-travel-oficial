b=open('v3/shell_bottom.html').read()
import re,base64
import os
REPO=os.environ.get('REPO')=='1'
OUT='repo/index.html' if REPO else 'gordon-travel-v3.html'
_fav=lambda f:(('favicon-'+f[1:-4]+'x'+f[1:-4]+'.png') if f in('f16.png','f32.png') else 'apple-touch-icon.png') if REPO else 'data:image/png;base64,'+base64.b64encode(open('../fav/'+f,'rb').read()).decode()
_h=open('src.html').read().split('<style>')[0].rstrip()
_h=re.sub(r'<link rel="preconnect"[^>]*>\n?','',_h);_h=re.sub(r'<link rel="stylesheet" href="https://fonts[^>]*>\n?','',_h)
head='<meta charset="utf-8">\n<meta name="viewport" content="width=device-width,initial-scale=1">\n'+_h+'\n<link rel="icon" type="image/png" sizes="32x32" href="'+_fav('f32.png')+'">\n<link rel="icon" type="image/png" sizes="16x16" href="'+_fav('f16.png')+'">\n<link rel="apple-touch-icon" sizes="180x180" href="'+_fav('f180.png')+'">\n<script>try{var t=localStorage.getItem("gt-theme");if(t==="light"||t==="dark")document.documentElement.setAttribute("data-theme",t);var c=JSON.parse(localStorage.getItem("gt-consent")||"null");if(c&&c.v===1&&c.fonts){var l=document.createElement("link");l.id="gt-fonts";l.rel="stylesheet";l.href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Manrope:wght@400;500;600;700&display=swap";document.head.appendChild(l)}}catch(e){}</script>\n'
css=open('v3/base.css').read()+open('v3/add.css').read()
pages=''.join(open('v3/'+f).read() for f in ['pg_home.html','pg_explorer_journey.html','pg_services_tickets.html','pg_rest.html'])
js=''.join(open('v3/'+f).read()+'\n' for f in ['core.js','data.js','p_journey.js','p_pages1.js','p_pages2.js','consent.js'])
html=head+'<style>'+css+'</style>\n'+open('v3/shell_top.html').read()+'<main id="main" tabindex="-1">\n'+pages+'</main>\n'+b+(('<script>window.GT_LNY_URL="assets/lanyard.bundle.js"</script>\n<script>\n') if REPO else ('<script type="text/plain" id="lnySrc">'+open('../lny/lanyard.bundle.js').read()+'</script>\n<script>\n'))+js+'</script>\n'
os.makedirs('repo',exist_ok=True)
open(OUT,'w').write(html.replace('/*IMGS_JSON*/null',open('imgs.json').read()))
