export interface Store {
  id: string;
  data: StoreData;
}

export interface StoreData {
  name?: string;
  category?: string;
  employees?: string[];
}
