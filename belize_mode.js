



// Chill mode map spots (island bases + key sites)
const chillSpots = [
  {ll:[17.9240,-87.9713],label:'Ambergris Caye — home base 🏝️',color:'#00bcd4'},
  {ll:[17.7480,-88.0320],label:'Caye Caulker — day trip 🚲',color:'#4caf50'},
  {ll:[16.5136,-88.3680],label:'Placencia — second base option 🌴',color:'#26a69a'},
  {ll:[17.2100,-88.6830],label:'ATM Cave — Actun Tunichil Muknal 🏛️',color:'#8d6e63'},
  {ll:[16.4903,-87.9050],label:'Gladden Spit 🐋 — whale sharks May 3 🌕',color:'#ffd54f'},
  {ll:[17.2000,-87.5333],label:'Half Moon Caye 🌊 — wall diving',color:'#1565c0'},
];
const diveSpots = [
  {ll:[17.9240,-87.9713],label:'San Pedro / Ambergris Caye',color:'#00bcd4'},
  {ll:[15.8394,-88.3680],label:'Belize City (BZE)',color:'#7986cb'},
  {ll:[16.5136,-88.3680],label:'Placencia',color:'#26a69a'},
  {ll:[17.3167,-87.5167],label:'Great Blue Hole 🔵',color:'#1565c0'},
  {ll:[16.4903,-87.9050],label:'Gladden Spit 🐋',color:'#ffd54f'},
  {ll:[17.2000,-87.5333],label:'Half Moon Caye 🌊',color:'#4caf50'},
  {ll:[17.3000,-87.8000],label:'Turneffe Atoll',color:'#7e57c2'},
  {ll:[16.5042,-88.9853],label:'Cockscomb Jaguar Reserve 🐆',color:'#8d6e63'},
];

function renderMapSpots(spots) {
  // Clear existing markers by rebuilding (simple approach)
  if (window._belizeMarkers) window._belizeMarkers.forEach(m => window._belizeMap && window._belizeMap.removeLayer(m));
  window._belizeMarkers = [];
  spots.forEach(s => {
    const m = L.circleMarker(s.ll, {radius:9, fillColor:s.color, color:'#fff', weight:2, fillOpacity:0.9}).addTo(window._belizeMap)
      .bindTooltip('<b>' + s.label + '</b>', {direction:'top'});
    const lbl = L.marker(s.ll, {icon:L.divIcon({className:'',
      html:'<div style="color:'+s.color+';font-size:10px;font-weight:700;white-space:nowrap;text-shadow:0 0 4px #000,0 0 4px #000;margin-top:-22px;margin-left:13px">'+s.label+'</div>',
      iconSize:[150,20],iconAnchor:[0,10]})}).addTo(window._belizeMap);
    window._belizeMarkers.push(m, lbl);
  });
}

function setTripMode(mode) {
  // Hide all views first
  document.querySelector('.tabs').style.display = 'none';
  document.querySelectorAll('.tab-content').forEach(t => t.style.display = 'none');
  document.getElementById('chillView').style.display = 'none';
  document.getElementById('tafView').style.display = 'none';

  // Reset all nav buttons
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
    if (window._belizeMap) window._belizeMap.setView([17.0, -87.8], 8);

  } else if (mode === 'chill') {
    document.getElementById('chillView').style.display = 'block';
    document.getElementById('navChill').style.background = 'rgba(0,188,212,0.2)';
    document.getElementById('navChill').style.color = '#e0f7fa';
    renderMapSpots(chillSpots);
    if (window._belizeMap) window._belizeMap.setView([16.8, -88.2], 7);

  } else if (mode === 'taf') {
    document.getElementById('tafView').style.display = 'block';
    document.getElementById('navTaf').style.background = 'rgba(76,175,80,0.2)';
    document.getElementById('navTaf').style.color = '#e0f7fa';
    const tafSpots = [
      {ll:[17.9240,-87.9713],label:'Ambergris Caye — Base 1 (3 nts)',color:'#00bcd4'},
      {ll:[17.7480,-88.0320],label:'Caye Caulker — day trip option',color:'#4caf50'},
      {ll:[16.5136,-88.3680],label:'Placencia — Turtle Inn (4 nts)',color:'#a5d6a7'},
      {ll:[17.7800,-88.6600],label:'Lamanai Ruins 🏛️',color:'#8d6e63'},
      {ll:[17.2228,-89.6229],label:'Tikal, Guatemala 🏛️',color:'#ff7043'},
      {ll:[17.2100,-88.6830],label:'ATM Cave 🏛️',color:'#795548'},
      {ll:[16.4903,-87.9050],label:'Gladden Spit 🐋 whale sharks',color:'#ffd54f'},
      {ll:[16.5042,-88.9853],label:'Cockscomb Jaguar Reserve 🐆',color:'#388e3c'},
      {ll:[17.2000,-87.5333],label:'Half Moon Caye 🌊',color:'#1565c0'},
    ];
    renderMapSpots(tafSpots);
    if (window._belizeMap) window._belizeMap.setView([17.2, -88.6], 7);
  }

  localStorage.setItem('belizeTripMode', mode);
  if (window._belizeMap) window._belizeMap.invalidateSize();
}


