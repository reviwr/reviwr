import * as fs from "fs";
import * as path from "path";
import * as os from "os";

export class ConfigService {
  private readonly configDir: string;
  private readonly credentialsPath: string;

  constructor() {
    this.configDir = path.join(os.homedir(), ".rwr");
    this.credentialsPath = path.join(this.configDir, "credentials.txt");
    this.ensureConfigDirExists();
  }

  private ensureConfigDirExists(): void {
    if (!fs.existsSync(this.configDir)) {
      fs.mkdirSync(this.configDir, { recursive: true });
    }
  }

  public async saveApiKey(apiKey: string): Promise<void> {
    if (!apiKey.trim()) {
      throw new Error("A chave API não pode estar vazia");
    }

    try {
      const encodedKey = Buffer.from(apiKey).toString("base64");
      const content = `api_key=${encodedKey}`;
      await fs.promises.writeFile(this.credentialsPath, content, "utf-8");
    } catch (error: any) {
      throw new Error(`Erro ao salvar a chave API: ${error.message}`);
    }
  }

  public async getApiKey(): Promise<string | null> {
    try {
      if (!fs.existsSync(this.credentialsPath)) {
        return null;
      }

      const encodedKey = await fs.promises.readFile(
        this.credentialsPath,
        "utf-8"
      );
      return Buffer.from(encodedKey, "base64").toString("utf-8");
    } catch (error: any) {
      throw new Error(`Erro ao ler a chave API: ${error.message}`);
    }
  }

  public async hasConfiguration(): Promise<boolean> {
    return fs.existsSync(this.credentialsPath);
  }

  public async clearConfiguration(): Promise<void> {
    try {
      if (await this.hasConfiguration()) {
        await fs.promises.unlink(this.credentialsPath);
      }
    } catch (error: any) {
      throw new Error(`Erro ao limpar a configuração: ${error.message}`);
    }
  }
}
