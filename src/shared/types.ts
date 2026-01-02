export interface AssetItem {
  id: string;
  name: string;
  url: string;
}

export interface AssetsJSON {
  Characters: AssetItem[];
  Items: AssetItem[];
  Tomes: AssetItem[];
  Weapons: AssetItem[];
}

export type TypeOfAsset = "Characters" | "Items" | "Tomes" | "Weapons";
