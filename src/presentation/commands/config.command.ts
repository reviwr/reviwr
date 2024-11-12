import * as readline from "readline";
import { ConfigService } from "../../infrastructure/services/config-service";
import { MESSAGES } from "../../shared/messages/messages";

export class ConfigCommand {
  private static configService = new ConfigService();

  /**
   * Executa o comando de configuração.
   * @returns
   */
  static async execute() {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    console.log(MESSAGES.CONFIG_HEADER);
    console.log(MESSAGES.API_KEY_PROMPT);
    console.log(MESSAGES.API_KEY_URL);

    rl.question(MESSAGES.ENTER_API_KEY, async (apiKey) => {
      if (!apiKey.trim()) {
        console.error(MESSAGES.API_KEY_REQUIRED);
        rl.close();
        return;
      }

      ConfigCommand.configService
        .saveApiKey(apiKey)
        .then(() => {
          console.log(MESSAGES.API_KEY_SAVED);
          console.log(MESSAGES.START_USING);
        })
        .catch((error) => {
          console.error(MESSAGES.ERROR_SAVING_API_KEY, error);
        })
        .finally(() => {
          rl.close();
        });
    });
  }

  /**
   * Verifica se a configuração já foi feita.
   * @returns
   */
  static async checkConfig(): Promise<boolean> {
    return ConfigCommand.configService
      .hasConfiguration()
      .then(() => true)
      .catch((error) => {
        console.error(MESSAGES.ERROR_CHECKING_CONFIG, error);
        return false;
      });
  }
}
