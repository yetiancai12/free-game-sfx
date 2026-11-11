(function(){
var BASE=document.documentElement.getAttribute('data-base')||'';
document.addEventListener('click',yt);document.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' ')yt(e)});
function yt(e){var t=e.target.closest&&e.target.closest('.yt');if(!t||t.querySelector('iframe'))return;e.preventDefault();var f=document.createElement('iframe');
f.src='https://www.youtube-nocookie.com/embed/'+t.getAttribute('data-yt')+'?autoplay=1&rel=0';f.allow='autoplay; encrypted-media; picture-in-picture';f.allowFullscreen=true;f.title='Preview video';t.appendChild(f)}
var nov=document.getElementById('nov');if(nov){var d=new Date();if(d<new Date('2026-11-23T00:00:00Z'))nov.hidden=false}
var q=document.getElementById('q');if(!q)return;
var grid=document.getElementById('grid'),count=document.getElementById('count'),none=document.getElementById('none');
var cat=null,eng=null,freeOnly=false,idx=null;
fetch(BASE+'/search.json').then(function(r){return r.json()}).then(function(j){idx=j;run()});
function match(p,words){for(var i=0;i<words.length;i++){if(p.text.indexOf(words[i])<0)return false}return true}
function run(){if(!idx)return;var words=q.value.toLowerCase().split(/\s+/).filter(Boolean);var shown=0,ids={};
idx.forEach(function(p){var ok=match(p,words)&&(!cat||p.cats.indexOf(cat)>=0)&&(!eng||p.engines.indexOf(eng)>=0)&&(!freeOnly||p.free);ids[p.id]=ok;if(ok)shown++});
Array.prototype.forEach.call(grid.children,function(c){c.hidden=!ids[c.getAttribute('data-id')]});
count.textContent=shown+(shown===1?' pack':' packs');none.hidden=shown>0}
q.addEventListener('input',run);
function bind(sel,set){Array.prototype.forEach.call(document.querySelectorAll(sel),function(b){b.setAttribute('aria-pressed','false');b.addEventListener('click',function(){var on=b.getAttribute('aria-pressed')==='true';Array.prototype.forEach.call(document.querySelectorAll(sel),function(x){x.setAttribute('aria-pressed','false')});if(!on)b.setAttribute('aria-pressed','true');set(on?null:b);run()})})}
bind('[data-cat]',function(b){cat=b?b.getAttribute('data-cat'):null});
bind('[data-eng]',function(b){eng=b?b.getAttribute('data-eng'):null});
var fo=document.getElementById('freeonly');fo.setAttribute('aria-pressed','false');fo.addEventListener('click',function(){freeOnly=!freeOnly;fo.setAttribute('aria-pressed',freeOnly);run()});
document.getElementById('clear').addEventListener('click',function(){q.value='';cat=eng=null;freeOnly=false;Array.prototype.forEach.call(document.querySelectorAll('.chip'),function(x){x.setAttribute('aria-pressed','false')});run()});
var hq=new URLSearchParams(location.search).get('q');if(hq){q.value=hq}
})();
