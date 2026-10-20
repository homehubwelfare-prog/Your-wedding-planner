const originalDesigns = [
{"src": "assets/pamphlets/pamphlet-01.jpg", "title": "Invitation Design 01", "category": "Chocolate & Gifts"},
{"src": "assets/pamphlets/pamphlet-02.jpg", "title": "Invitation Design 02", "category": "Celebrations"},
{"src": "assets/pamphlets/pamphlet-03.jpg", "title": "Invitation Design 03", "category": "Celebrations"},
{"src": "assets/pamphlets/pamphlet-04.jpg", "title": "Invitation Design 04", "category": "Celebrations"},
{"src": "assets/pamphlets/pamphlet-05.jpg", "title": "Invitation Design 05", "category": "Wedding & Events"},
{"src": "assets/pamphlets/pamphlet-06.jpg", "title": "Invitation Design 06", "category": "Wedding & Events"},
{"src": "assets/pamphlets/pamphlet-07.jpg", "title": "Invitation Design 07", "category": "Wedding & Events"},
{"src": "assets/pamphlets/pamphlet-08.jpg", "title": "Invitation Design 08", "category": "Wedding & Events"},
{"src": "assets/pamphlets/pamphlet-09.jpg", "title": "Invitation Design 09", "category": "Wedding & Events"},
{"src": "assets/pamphlets/pamphlet-10.jpg", "title": "Invitation Design 10", "category": "Wedding & Events"},
{"src": "assets/pamphlets/pamphlet-11.jpg", "title": "Invitation Design 11", "category": "Wedding & Events"},
{"src": "assets/pamphlets/pamphlet-12.jpg", "title": "Invitation Design 12", "category": "Wedding & Events"},
{"src": "assets/pamphlets/pamphlet-13.jpg", "title": "Invitation Design 13", "category": "Wedding & Events"},
{"src": "assets/pamphlets/pamphlet-14.jpg", "title": "Invitation Design 14", "category": "Wedding & Events"},
{"src": "assets/pamphlets/pamphlet-15.jpg", "title": "Invitation Design 15", "category": "Wedding & Events"},
{"src": "assets/pamphlets/pamphlet-16.jpg", "title": "Invitation Design 16", "category": "Wedding & Events"},
{"src": "assets/pamphlets/pamphlet-17.jpg", "title": "Invitation Design 17", "category": "Wedding & Events"},
{"src": "assets/pamphlets/pamphlet-18.jpg", "title": "Invitation Design 18", "category": "Wedding & Events"},
{"src": "assets/pamphlets/pamphlet-19.jpg", "title": "Invitation Design 19", "category": "Celebrations"},
{"src": "assets/pamphlets/pamphlet-20.jpg", "title": "Invitation Design 20", "category": "Wedding & Events"}
];
const gallery = document.getElementById('gallery');
const filters = document.getElementById('filters');
let activeFilter = 'All';
let currentDesigns = [];
let lightboxIndex = 0;
function getUploads(){try{return JSON.parse(localStorage.getItem('ydpUploads')||'[]')}catch(e){return []}}
function renderGallery(){
 const uploads=getUploads();
 const designs=[...uploads.map((x,i)=>({...x,category:'My Uploads',isUpload:true})),...originalDesigns];
 currentDesigns=designs.filter(d=>activeFilter==='All'||d.category===activeFilter);
 gallery.innerHTML='';
 if(!currentDesigns.length){gallery.innerHTML='<p>No new uploads yet. Check back soon.</p>';return}
 currentDesigns.forEach((d,i)=>{
  const card=document.createElement('article');card.className='design-card';
  const img=document.createElement('img');img.className='design-image';img.src=d.src;img.alt=d.title||'Invitation design';img.loading='lazy';img.addEventListener('click',()=>openLightbox(i));
  const info=document.createElement('div');info.className='design-info';
  const h=document.createElement('h3');h.textContent=d.title||'Invitation Design';
  const p=document.createElement('p');p.textContent=d.category||'Design sample';
  const actions=document.createElement('div');actions.className='card-actions';
  const view=document.createElement('button');view.className='tiny-btn';view.textContent='View design';view.onclick=()=>openLightbox(i);
  const ask=document.createElement('a');ask.className='tiny-btn';ask.textContent='Customise on WhatsApp';ask.href='https://wa.me/917409589875?text='+encodeURIComponent('Hi, I liked '+(d.title||'this invitation design')+'. I would like to customise it.');ask.target='_blank';ask.rel='noopener';
  actions.append(view,ask);info.append(h,p,actions);card.append(img,info);gallery.append(card);
 });
}
filters.addEventListener('click',e=>{const b=e.target.closest('[data-filter]');if(!b)return;activeFilter=b.dataset.filter;filters.querySelectorAll('button').forEach(x=>x.classList.toggle('active',x===b));renderGallery()});
function openLightbox(i){lightboxIndex=i;showLightbox();document.getElementById('lightbox').classList.add('open');document.getElementById('lightbox').setAttribute('aria-hidden','false')}
function showLightbox(){const d=currentDesigns[lightboxIndex];if(!d)return;document.getElementById('lightboxImage').src=d.src;document.getElementById('lightboxTitle').textContent=d.title||'Invitation design'}
function moveLightbox(delta){lightboxIndex=(lightboxIndex+delta+currentDesigns.length)%currentDesigns.length;showLightbox()}
document.getElementById('lightboxClose').onclick=()=>{document.getElementById('lightbox').classList.remove('open');document.getElementById('lightbox').setAttribute('aria-hidden','true')};
document.getElementById('lightboxPrev').onclick=()=>moveLightbox(-1);document.getElementById('lightboxNext').onclick=()=>moveLightbox(1);
document.getElementById('lightbox').addEventListener('click',e=>{if(e.target.id==='lightbox')document.getElementById('lightboxClose').click()});
document.addEventListener('keydown',e=>{if(e.key==='Escape')document.getElementById('lightboxClose').click();if(e.key==='ArrowLeft')moveLightbox(-1);if(e.key==='ArrowRight')moveLightbox(1)});
document.getElementById('menuToggle').onclick=()=>document.getElementById('nav').classList.toggle('open');
document.querySelectorAll('#nav a').forEach(a=>a.addEventListener('click',()=>document.getElementById('nav').classList.remove('open')));
document.getElementById('year').textContent=new Date().getFullYear();renderGallery();
