import { ConfigService } from "../../infrastructure/services/config-service";
import { CodeReviewService } from "../../infrastructure/services/code-review-service";
import { GitService } from "../../infrastructure/services/git-service";
import { writeFileSync } from "fs";

export class CodeReviewCommand {
  private static configService = new ConfigService();
  private static reviewService: CodeReviewService;

  static async execute() {
    const isConfigured = await CodeReviewCommand.checkConfig();
    if (!isConfigured) {
      console.error(
        "Você precisa configurar a chave API do Gemini antes de prosseguir."
      );
      return;
    }

    const gitService = new GitService();
    CodeReviewCommand.reviewService = new CodeReviewService(
      gitService,
      CodeReviewCommand.configService
    );

    const result = await CodeReviewCommand.reviewService.reviewInsights();
    const teste = `<!doctype html>
<html>
<head>
  <meta charset="utf-8"/>
  <title>Marked in the browser</title>
</head>
<body>
  <div id="content"></div>
  <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
  <script>
    document.getElementById('content').innerHTML =
      marked.parse(\`${result}\`);
  </script>
</body>
</html>`;
    writeFileSync("./code-insights.html", teste);
    console.log("Code Insights:", teste);
  }

  static async checkConfig(): Promise<boolean> {
    try {
      return await CodeReviewCommand.configService.hasConfiguration();
    } catch (error) {
      console.error("Erro ao verificar configuração:", error);
      return false;
    }
  }
}
