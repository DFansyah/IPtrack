const axios = require('axios')
const yargs = require('yargs')

const apiKey = '47a0a599933c4f27b02db13e364cfe34' // Or you can use your APIkey

const argv = yargs
  .option('ip', {
    alias: 'i',
    description: 'IP address to look up',
    type: 'string',
    demandOption: true,
  })
  .help()
  .alias('help', 'h')
  .argv;

async function fetchIpInfo(ip) {
  try {
    const apiUrl = `https://api.ipgeolocation.io/ipgeo?apiKey=${apiKey}&ip=${ip}`;
    const { data } = await axios.get(apiUrl);
    return data || null;
  } catch (error) {
    console.error(`❌ Error retrieving IP information: ${error.message}`);
    return null;
  }
}

async function fetchCoordinates(ip) {
  try {
    const fetch = (await import('node-fetch')).default;
    const res = await fetch(`https://ipwho.is/${ip}`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(`❌ Error fetching coordinates: ${error.message}`);
    return null;
  }
}

function formatResult(ipInfo, coordinates) {
  const {
    country_name,
    country_code2,
    country_capital,
    city,
    isp,
    organization,
    latitude,
    longitude,
  } = ipInfo;

  const countryFlag = countryToEmojiFlag(country_code2);
  const coordsDisplay = coordinates
    ? `📍 Coordinates: ${coordinates.latitude}, ${coordinates.longitude}`
    : '📍 Coordinates: Not available';

  return `
=========================================
🌐 IP Address Information
=========================================
${countryFlag} Country        : ${country_name}
🏙  Capital        : ${country_capital}
🏢 City           : ${city || 'N/A'}
🔹 ISP            : ${isp || 'N/A'}
🔹 Organization   : ${organization || 'N/A'}
🌍 Latitude       : ${latitude || 'N/A'}
🌍 Longitude      : ${longitude || 'N/A'}
-----------------------------------------
${coordsDisplay}

✅ Provided by DFansyah
=========================================
  `;
}

function isValidIP(ip) {
  return /^(\d{1,3}\.){3}\d{1,3}$/.test(ip);
}

function countryToEmojiFlag(countryCode) {
  return countryCode
    .toUpperCase()
    .replace(/./g, char => String.fromCodePoint(char.charCodeAt(0) + 127397));
}

async function getIPInfo(ip) {
  if (!isValidIP(ip)) {
    console.error('❌ Please provide a valid IP address.');
    return;
  }

  const ipInfo = await fetchIpInfo(ip);
  if (!ipInfo) return;

  const coordinates = await fetchCoordinates(ip);

  console.log(formatResult(ipInfo, coordinates));
}

getIPInfo(argv.ip);
