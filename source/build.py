b=open('v3/shell_bottom.html').read()
head='<meta charset="utf-8">\n'+open('src.html').read().split('<style>')[0].rstrip()+'\n<script>try{var t=localStorage.getItem("gt-theme");if(t==="light"||t==="dark")document.documentElement.setAttribute("data-theme",t)}catch(e){}</script>\n'
css=open('v3/base.css').read()+open('v3/add.css').read()
pages=''.join(open('v3/'+f).read() for f in ['pg_home.html','pg_explorer_journey.html','pg_services_tickets.html','pg_rest.html'])
js=''.join(open('v3/'+f).read()+'\n' for f in ['core.js','data.js','p_journey.js','p_pages1.js','p_pages2.js'])
html=head+'<style>'+css+'</style>\n'+open('v3/shell_top.html').read()+'<main id="main" tabindex="-1">\n'+pages+'</main>\n'+b+'<script>\n'+js+'</script>\n'
open('gordon-travel-v3.html','w').write(html.replace('/*IMGS_JSON*/null',open('imgs.json').read()))
