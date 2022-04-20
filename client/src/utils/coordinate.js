import proj4 from 'proj4';

export const coordiWGStoKATEC = (lng, lat) => {
  const katec =
    '+proj=tmerc +lat_0=38 +lon_0=128 +k=0.9999 +x_0=400000 +y_0=600000 +ellps=bessel +units=m +no_defs +towgs84=-115.80,474.99,674.11,1.16,-2.31,-1.63,6.43';
  const WGS84 = '+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs';

  let result = proj4(WGS84, katec, [lng, lat]);
  return result;
};

export const coordiKATECtoWGS = (katecX, katecY) => {
  const katec =
    '+proj=tmerc +lat_0=38 +lon_0=128 +k=0.9999 +x_0=400000 +y_0=600000 +ellps=bessel +units=m +no_defs +towgs84=-115.80,474.99,674.11,1.16,-2.31,-1.63,6.43';
  const WGS84 = '+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs';

  let result = proj4(katec, WGS84, [katecX, katecY]);
  return result;
};
