export interface Store {
  id: number;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
}

export interface Staff {
  id: number;
  name: string;
  store_id: number;

  // API 응답에 포함될 수 있음
  store?: Store;
}
