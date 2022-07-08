const resp = await fetch('https://raw.communitydragon.org/latest/cdragon/tft/en_us.json');
const data = await resp.json();
const setNames = Object.keys(data.sets);
console.log(setNames);
