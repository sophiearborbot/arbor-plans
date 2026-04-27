// Map spots — hotels emphasized, excursions labeled
const chillSpots = [
  // HOTELS — larger, starred
  {ll:[17.9240,-87.9713], label:'🏨 Sunset Caribe — Ambergris (Apr 29–May 2)', color:'#ff6b6b', size:14, isHotel:true},
  {ll:[16.5136,-88.3680], label:'🏨 Naia Resort — Placencia (May 2–6)', color:'#ff6b6b', size:14, isHotel:true},
  // DAY TRIPS — excursions
  {ll:[17.1500,-87.7500], label:'🦈 Hol Chan + Shark Ray Alley (Day 1-2)', color:'#29b6f6', size:10},
  {ll:[17.2000,-87.5333], label:'🌊 Half Moon Caye (Day 2)', color:'#4caf50', size:10},
  {ll:[17.7800,-88.6600], label:'🏛️ Lamanai Ruins (Day 3)', color:'#8d6e63', size:10},
  {ll:[16.4903,-87.9050], label:'🐋 Gladden Spit — Whale Sharks (Day 5)', color:'#ffd54f', size:10},
  {ll:[16.4200,-87.8200], label:'🤿 Silk Cayes (Day 6)', color:'#4caf50', size:10},
  {ll:[17.2500,-88.9500], label:'🤿 Caves Branch ATV (Day 7 option)', color:'#8d6e63', size:10},
];

const diveSpots = chillSpots;

function renderMapSpots(spots) {
  if (window._belizeMarkers) window._belizeMarkers.forEach(m => window._belizeMap && window._belizeMap.removeLayer(m));
  window._belizeMarkers = [];
  
  spots.forEach(s => {
    const r = s.size || 10;
    const o = s.isHotel ? 1 : 0.85;
    const m = L.circleMarker(s.ll, {radius:r, fillColor:s.color, color:'#fff', weight:s.isHotel?3:2, fillOpacity:o})
      .addTo(window._belizeMap)
      .bindTooltip('<b>' + s.label + '</b>', {direction:'top'});
    const lbl = L.marker(s.ll, {icon:L.divIcon({className:'',
      html:'<div style="color:'+s.color+';font-size:'+(s.isHotel?'11px':'9px')+';font-weight:700;white-space:nowrap;text-shadow:0 0 4px #000;margin-top:-22px;margin-left:13px">'+s.label+'</div>',
      iconSize:[220,20],iconAnchor:[0,10]})}).addTo(window._belizeMap);
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
      {ll:[17.9240,-87.9713], label:'🏨 Sunset Caribe — Ambergris (Apr 29–May 2)', color:'#ff6b6b', size:14, isHotel:true},
      {ll:[16.5136,-88.3680], label:'🏨 Naia Resort — Placencia (May 2–6)', color:'#ff6b6b', size:14, isHotel:true},
      {ll:[17.1500,-87.7500], label:'🦈 Hol Chan + Shark Ray Alley', color:'#29b6f6', size:10},
      {ll:[17.2000,-87.5333], label:'🌊 Half Moon Caye Wall', color:'#4caf50', size:10},
      {ll:[17.7800,-88.6600], label:'🏛️ Lamanai Ruins', color:'#8d6e63', size:10},
      {ll:[16.4903,-87.9050], label:'🐋 Gladden Spit Whale Sharks', color:'#ffd54f', size:10},
      {ll:[16.4200,-87.8200], label:'🤿 Silk Cayes', color:'#4caf50', size:10},
      {ll:[17.2500,-88.9500], label:'🤿 Caves Branch ATV', color:'#8d6e63', size:10},
    ];
    renderMapSpots(tafSpots);
    if (window._belizeMap) window._belizeMap.setView([17.0, -88.2], 7);
  }

  localStorage.setItem('belizeTripMode', mode);
  if (window._belizeMap) setTimeout(() => window._belizeMap.invalidateSize(), 100);
}

window.addEventListener('load', () => {
  const saved = localStorage.getItem('belizeTripMode') || 'chill';
  setTimeout(() => setTripMode(saved), 500);
});
