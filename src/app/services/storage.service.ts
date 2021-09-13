import { Injectable } from "@angular/core";
import { Storage } from "@capacitor/storage";

@Injectable({
  providedIn: "root",
})
export class StorageService {
  constructor() {}

  async set(key: string, value: any): Promise<void> {
    await Storage.set({
      key,
      value: JSON.stringify(value),
    });
  }

  async get(key: string): Promise<any> {
    const item = await Storage.get({ key });
    return item.value;
  }

  async remove(key: string): Promise<void> {
    await Storage.remove({
      key,
    });
  }

  async clear() {
    await Storage.clear();
  }

  async keys(): Promise<string[]> {
    const resp = await Storage.keys();
    return resp.keys;
  }
}