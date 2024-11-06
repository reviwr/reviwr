#!/usr/bin/env node
import { Command } from "commander";
import { ConfigCommand } from "./commands/config.command";
// import { ReviewCommand } from "./commands/review.command";
// import { PullRequestCommand } from "./commands/pull-request.command";

const program = new Command();

program.version("1.0.0").description("A CLI tool for code review using AI");

program
  .command("config")
  .description("Configure API credentials")
  .action(ConfigCommand.execute);

// program
//   .command("review")
//   .description("Review code changes")
//   .option("--report", "Generate markdown report")
//   .action(ReviewCommand.execute);

// program
//   .command("pull-request")
//   .description("Generate pull request description")
//   .action(PullRequestCommand.execute);

program.parse(process.argv);
