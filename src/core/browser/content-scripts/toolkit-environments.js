const PRODUCTION_IDS = [
  'lmhdkkhepllpnondndgpgclfjnlofgjl' // chrome
];

const BETA_IDS = [
  'mkgdgjnaaejddflnldinkilabeglghlo' // chrome
];

export function getEnvironmentFromID(id) {
  if (PRODUCTION_IDS.includes(id)) {
    return 'PRODUCTION';
  }

  if (BETA_IDS.includes(id)) {
    return 'BETA';
  }

  return 'DEVELOPMENT';
}
