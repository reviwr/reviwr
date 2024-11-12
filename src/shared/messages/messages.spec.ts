import { MESSAGES } from "./messages";

describe("Testes para MESSAGES", () => {
  test("Deve conter a mensagem correta para CONFIG_HEADER", () => {
    expect(MESSAGES.CONFIG_HEADER).toBe("Configuração do Reviwr CLI");
  });

  test("Deve conter a mensagem correta para API_KEY_PROMPT", () => {
    expect(MESSAGES.API_KEY_PROMPT).toBe(
      "Para utilizar o Reviwr, você precisa de uma chave API do Google Gemini."
    );
  });

  test("Deve conter a mensagem correta para API_KEY_URL", () => {
    expect(MESSAGES.API_KEY_URL).toBe(
      "Obtenha sua chave em: https://makersuite.google.com/app/apikey\n"
    );
  });

  test("Deve conter a mensagem correta para ENTER_API_KEY", () => {
    expect(MESSAGES.ENTER_API_KEY).toBe("Digite sua chave API do Gemini: ");
  });

  test("Deve conter a mensagem correta para API_KEY_REQUIRED", () => {
    expect(MESSAGES.API_KEY_REQUIRED).toBe("A chave API é obrigatória.");
  });

  test("Deve conter a mensagem correta para API_KEY_SAVED", () => {
    expect(MESSAGES.API_KEY_SAVED).toBe("\nChave API salva com sucesso! ✨");
  });

  test("Deve conter a mensagem correta para START_USING", () => {
    expect(MESSAGES.START_USING).toBe("Você já pode começar a usar o Reviwr.");
  });

  test("Deve conter a mensagem correta para ERROR_SAVING_API_KEY", () => {
    expect(MESSAGES.ERROR_SAVING_API_KEY).toBe("Erro ao salvar a chave API:");
  });

  test("Deve conter a mensagem correta para ERROR_CHECKING_CONFIG", () => {
    expect(MESSAGES.ERROR_CHECKING_CONFIG).toBe(
      "Erro ao verificar configuração:"
    );
  });

  test("Deve conter a mensagem correta para ERROR_READING_API_KEY", () => {
    expect(MESSAGES.ERROR_READING_API_KEY).toBe("Erro ao ler a chave API:");
  });
});
