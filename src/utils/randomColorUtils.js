const getRandomRGBColor = () => {
    const r_value = getRandomChannelValue();
    const g_value = getRandomChannelValue();
    const b_value = getRandomChannelValue();
    const randomRGBColor = `rgb(${r_value}, ${g_value}, ${b_value})`;
    console.log("RGB color generated: " +randomRGBColor);
    return randomRGBColor;
  }

const getRandomChannelValue = () => {
let channelValue = 0;
//ogranicavanje petlje na vece channel vrijednosti osigurava da ce boja biti svjetlija i crni tekst uvijek citljiv na svijetloj podlozi
do {
    channelValue = Math.floor(Math.random()*255);
} while (channelValue < 130);

return channelValue;
}

export default getRandomRGBColor;