import { Command } from "commander";
import * as readline from "readline";
import { ConfigService } from "../../infrastructure/services/config-service";

export class ConfigCommand {
  private static configService = new ConfigService();

  static async execute() {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    console.log("Configuração do Reviwr CLI");
    console.log(
      "Para utilizar o Reviwr, você precisa de uma chave API do Google Gemini."
    );
    console.log(
      "Obtenha sua chave em: https://makersuite.google.com/app/apikey\n"
    );

    rl.question("Digite sua chave API do Gemini: ", async (apiKey) => {
      if (!apiKey.trim()) {
        console.error("A chave API é obrigatória.");
        rl.close();
        return;
      }

      try {
        await ConfigCommand.configService.saveApiKey(apiKey);
        console.log("\nChave API salva com sucesso! ✨");
        console.log("Você já pode começar a usar o Reviwr.");
      } catch (error) {
        console.error("Erro ao salvar a chave API:", error);
      }
      rl.close();
    });
  }

  static async checkConfig(): Promise<boolean> {
    try {
      return await ConfigCommand.configService.hasConfiguration();
    } catch (error) {
      console.error("Erro ao verificar configuração:", error);
      return false;
    }
  }
}
