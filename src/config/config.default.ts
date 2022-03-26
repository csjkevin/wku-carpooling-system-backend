import { MidwayConfig, MidwayAppInfo } from '@midwayjs/core';

export default (appInfo: MidwayAppInfo) => {
  return {
    // use for cookie sign key, should change to your own and keep security
    keys: appInfo.name + '_1648318223734_750',
    egg: {
      port: 7001,
    },
    // security: {
    //   csrf: false,
    // },
    orm: {
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: process.env.WKU_CARPOOLING_SYSTEM_DB_USER,
      password: process.env.WKU_CARPOOLING_SYSTEM_DB_PASS,
      database: process.env.WKU_CARPOOLING_SYSTEM_DB_NAME,
      synchronize: false,
      logging: false,
    },
  } as MidwayConfig;
};
