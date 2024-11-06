export interface ConfigPort {
  saveApiKey(apiKey: string): Promise<void>;
  getApiKey(): Promise<string | null>;
  hasConfiguration(): Promise<boolean>;
  clearConfiguration(): Promise<void>;
}
