export const apiConfig = {
  server: {
    base: `http://${process.env.EC2IP}:2000`,
    soap: `http://${process.env.EC2IP}:2000/service`,
    api: `http://${process.env.EC2IP}:2000/api`,
  },
  endpoints: {
    octane: 'https://api-octane.telcoinabox.com.au/tiabwsv2',
    benzine: 'https://benzine.telcoinabox.com:443/tiab',
  },
  groupNo: process.env.groupNo,
};
