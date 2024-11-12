import { ConfigCommand } from "./config.command";
import { ConfigService } from "../../infrastructure/services/config-service";
import { MESSAGES } from "../../shared/messages/messages";

jest.mock("readline");
jest.mock("../../infrastructure/services/config-service");

describe("ConfigCommand", () => {
  let mockReadline: any;
  let mockConfigService: jest.Mocked<ConfigService>;

  beforeEach(() => {
    mockReadline = require("readline");
    mockConfigService = new ConfigService() as jest.Mocked<ConfigService>;
    ConfigCommand["configService"] = mockConfigService;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("execute", () => {
    it("should display the correct messages and save the API key", async () => {
      const questionMock = jest.fn((_, callback) => callback("valid-api-key"));
      mockReadline.createInterface.mockReturnValue({
        question: questionMock,
        close: jest.fn(),
      });

      mockConfigService.saveApiKey.mockResolvedValue(undefined);

      console.log = jest.fn();
      console.error = jest.fn();

      await ConfigCommand.execute();

      expect(console.log).toHaveBeenCalledWith(MESSAGES.CONFIG_HEADER);
      expect(console.log).toHaveBeenCalledWith(MESSAGES.API_KEY_PROMPT);
      expect(console.log).toHaveBeenCalledWith(MESSAGES.API_KEY_URL);
      expect(questionMock).toHaveBeenCalledWith(
        MESSAGES.ENTER_API_KEY,
        expect.any(Function)
      );
      expect(mockConfigService.saveApiKey).toHaveBeenCalledWith(
        "valid-api-key"
      );
      expect(console.log).toHaveBeenCalledWith(MESSAGES.API_KEY_SAVED);
      expect(console.log).toHaveBeenCalledWith(MESSAGES.START_USING);
    });

    it("should display an error message if API key is empty", async () => {
      const questionMock = jest.fn((_, callback) => callback(""));
      mockReadline.createInterface.mockReturnValue({
        question: questionMock,
        close: jest.fn(),
      });

      console.error = jest.fn();

      await ConfigCommand.execute();

      expect(console.error).toHaveBeenCalledWith(MESSAGES.API_KEY_REQUIRED);
    });
  });

  describe("checkConfig", () => {
    it("should return true if configuration exists", async () => {
      mockConfigService.hasConfiguration.mockResolvedValue(true);

      const result = await ConfigCommand.checkConfig();

      expect(result).toBe(true);
    });

    it("should return false and log an error if configuration check fails", async () => {
      const error = new Error("Failed to check configuration");
      mockConfigService.hasConfiguration.mockRejectedValue(error);

      console.error = jest.fn();

      const result = await ConfigCommand.checkConfig();

      expect(result).toBe(false);
      expect(console.error).toHaveBeenCalledWith(
        MESSAGES.ERROR_CHECKING_CONFIG,
        error
      );
    });
  });
});
