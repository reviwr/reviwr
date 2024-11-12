import * as fs from "fs";
import * as path from "path";
import * as os from "os";
import { ConfigPort } from "../../application/ports/config-port";
import { MESSAGES } from "../../shared/messages/messages";

export class ConfigService implements ConfigPort {
  private readonly configDir: string;
  private readonly credentialsPath: string;

  constructor() {
    this.configDir = path.join(os.homedir(), ".rwr");
    this.credentialsPath = path.join(this.configDir, "credentials.txt");
    this.ensureConfigDirExists();
  }

  /**
   * Verifica se o diretório de configuração existe, caso contrário, cria.
   * @returns
   * @private
   */
  private ensureConfigDirExists(): void {
    if (!fs.existsSync(this.configDir)) {
      fs.mkdirSync(this.configDir, { recursive: true });
    }
  }

  /**
   * Salva a chave de API no arquivo de configuração.
   * @param apiKey
   * @returns
   */
  public async saveApiKey(apiKey: string): Promise<void> {
    if (!apiKey.trim()) {
      throw new Error(MESSAGES.ERROR_READING_API_KEY);
    }

    const encodedKey = Buffer.from(apiKey).toString("base64");

    return fs.promises
      .writeFile(this.credentialsPath, encodedKey, "utf-8")
      .catch((error) => {
        throw new Error(`Erro ao salvar a chave API: ${error.message}`);
      });
  }

  /**
   * Captura a chave de API salva no arquivo de configuração.
   * @returns
   */
  public async getApiKey(): Promise<string | null> {
    return fs.promises
      .readFile(this.credentialsPath, "utf-8")
      .then((encodedContent) =>
        Buffer.from(encodedContent, "base64").toString("utf-8")
      )
      .catch((error) => {
        console.error(MESSAGES.ERROR_READING_API_KEY, error);
        return null;
      });
  }

  /**
   * Verifica se o arquivo de configuração existe.
   * @returns
   */
  public async hasConfiguration(): Promise<boolean> {
    return fs.existsSync(this.credentialsPath);
  }
}
