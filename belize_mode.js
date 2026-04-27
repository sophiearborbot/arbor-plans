// Chill mode map spots
const chillSpots = [
  {ll:[17.9240,-87.9713],label:'Sunset Caribe — Ambergris (Apr 29–May 2) 🏨',color:'#00bcd4'},
  {ll:[17.1500,-87.7500],label:'Hol Chan + Shark Ray Alley 🦈',color:'#29b6f6'},
  {ll:[16.5136,-88.3680],label:'Naia Resort — Placencia (May 2–6) 🌴',color:'#26a69a'},
  {ll:[16.4200,-87.8200],label:'Silk Cayes 🤿',color:'#4caf50'},
  {ll:[17.2100,-88.6830],label:'ATM Cave 🏛️',color:'#8d6e63'},
  {ll:[16.4903,-87.9050],label:'Gladden Spit 🐋',color:'#ffd54f'},
  {ll:[17.2500,-88.9500],label:'Caves Branch 🤿 ATV cave',color:'#8d6e63'},
  {ll:[17.2000,-87.5333],label:'Half Moon Caye 🌊',color:'#1565c0'},
];

const diveSpots = [
  {ll:[17.9240,-87.9713],label:'Sunset Caribe / San Pedro — Ambergris',color:'#00bcd4'},
  {ll:[17.1500,-87.7500],label:'Hol Chan Marine Reserve 🐠',color:'#29b6f6'},
  {ll:[17.0800,-87.7200],label:'Shark Ray Alley 🦈',color:'#00e5ff'},
  {ll:[16.5136,-88.3680],label:'Naia Resort / Placencia',color:'#26a69a'},
  {ll:[16.4200,-87.8200],label:'Silk Cayes 🤿 — Day 4 dive',color:'#4caf50'},
  {ll:[16.4903,-87.9050],label:'Gladden Spit 🐋 — whale sharks (low odds)',color:'#ffd54f'},
  {ll:[17.2000,-87.5333],label:'Half Moon Caye Wall 🌊',color:'#1565c0'},
  {ll:[17.3000,-87.8000],label:'Turneffe Atoll',color:'#7e57c2'},
  {ll:[17.2500,-88.9500],label:'Caves Branch 🤿',color:'#8d6e63'},
];

function renderMapSpots(spots) {
  if (window._belizeMarkers) window._belizeMarkers.forEach(m => window._belizeMap && window._belizeMap.removeLayer(m));
  window._belizeMarkers = [];
  spots.forEach(s => {
    const m = L.circleMarker(s.ll, {radius:9, fillColor:s.color, color:'#fff', weight:2, fillOpacity:0.9}).addTo(window._belizeMap)
      .bindTooltip('<b>' + s.label + '</b>', {direction:'top'});
    const lbl = L.marker(s.ll, {icon:L.divIcon({className:'',
      html:'<div style="color:'+s.color+';font-size:10px;font-weight:700;white-space:nowrap;text-shadow:0 0 4px #000,0 0 4px #000;margin-top:-22px;margin-left:13px">'+s.label+'</div>',
      iconSize:[200,20],iconAnchor:[0,10]})}).addTo(window._belizeMap);
    window._belizeMarkers.push(m, lbl);
  });
}

function setTripMode(mode) {
  document.querySelector('.tabs').style.display = 'none';
  document.querySelectorAll('.tab-content').forEach(t => t.style.display = 'none');
  document.getElementById('chillView').style.display = 'none';
  document.getElementById('tafView').style.display = 'none';

  ['navDive','navChill','navTaf'].forEach(id => {
    const b = document.getElementById(id);
    if (b) { b.style.background = 'transparent'; b.style.color = '#80deea'; }
  });

  if (mode === 'dive') {
    document.querySelector('.tabs').style.display = 'flex';
    document.querySelectorAll('.tab-content').forEach(t => t.style.display = '');
    document.querySelectorAll('.tab-content.active').forEach(t => t.style.display = 'block');
    document.getElementById('navDive').style.background = 'rgba(0,188,212,0.2)';
    document.getElementById('navDive').style.color = '#e0f7fa';
    renderMapSpots(diveSpots);
    if (window._belizeMap) window._belizeMap.setView([17.0, -88.2], 7);

  } else if (mode === 'chill') {
    document.getElementById('chillView').style.display = 'block';
    document.getElementById('navChill').style.background = 'rgba(0,188,212,0.2)';
    document.getElementById('navChill').style.color = '#e0f7fa';
    renderMapSpots(chillSpots);
    if (window._belizeMap) window._belizeMap.setView([17.0, -88.2], 7);

  } else if (mode === 'taf') {
    document.getElementById('tafView').style.display = 'block';
    document.getElementById('navTaf').style.background = 'rgba(76,175,80,0.2)';
    document.getElementById('navTaf').style.color = '#e0f7fa';
    const tafSpots = [
      {ll:[17.9240,-87.9713],label:'Sunset Caribe — Ambergris (Apr 29–May 2) 🏨',color:'#00bcd4'},
      {ll:[17.1500,-87.7500],label:'Hol Chan + Shark Ray Alley 🦈',color:'#29b6f6'},
      {ll:[17.2000,-87.5333],label:'Half Moon Caye Wall 🌊',color:'#1565c0'},
      {ll:[17.7800,-88.6600],label:'Lamanai Ruins 🏛️ (day trip)',color:'#8d6e63'},
      {ll:[16.5136,-88.3680],label:'Naia Resort — Placencia (May 2–6) 🌴',color:'#a5d6a7'},
      {ll:[16.4903,-87.9050],label:'Gladden Spit 🐋 whale sharks (May 3)',color:'#ffd54f'},
      {ll:[16.4200,-87.8200],label:'Silk Cayes 🤿 (May 4)',color:'#4caf50'},
      {ll:[16.5042,-88.9853],label:'Cockscomb Jaguar Reserve 🐆',color:'#388e3c'},
      {ll:[17.2100,-88.6830],label:'ATM Cave 🏛️',color:'#795548'},
      {ll:[17.2500,-88.9500],label:'Caves Branch 🤿 ATV (May 5)',color:'#8d6e63'},
    ];
    renderMapSpots(tafSpots);
    if (window._belizeMap) window._belizeMap.setView([17.0, -88.2], 7);
  }

  localStorage.setItem('belizeTripMode', mode);
  if (window._belizeMap) setTimeout(() => window._belizeMap.invalidateSize(), 100);
}

// Restore saved mode on load
window.addEventListener('load', () => {
  const saved = localStorage.getItem('belizeTripMode') || 'dive';
  setTimeout(() => setTripMode(saved), 300);
});
