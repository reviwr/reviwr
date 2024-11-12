import { GeminiAIAdapter } from "../../application/adapter/gemini-ai-adapter";
import { ConfigService } from "./config-service";
import { GitService } from "./git-service";

export class CodeReviewService {
  private gitService: GitService;
  private aiAdapter: GeminiAIAdapter;

  constructor(gitService: GitService, configService: ConfigService) {
    this.gitService = gitService;
    this.aiAdapter = new GeminiAIAdapter(configService);
  }

  async reviewInsights(): Promise<string> {
    const diff = await this.gitService.getDiff();
    return this.aiAdapter.reviewPerformance(diff);
  }
}
