const resp = await fetch('https://raw.communitydragon.org/latest/cdragon/tft/en_us.json');
const data = await resp.json();
const setNames = data.setData.map(setData => setData.mutator);
console.log(setNames);
