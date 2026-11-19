jest.mock("async-redis", () => {
  const client = { get: jest.fn(), set: jest.fn(), on: jest.fn() };
  return {
    __esModule: true,
    default: { createClient: jest.fn(() => client), __client: client },
  };
});

jest.mock("../config", () => ({
  __esModule: true,
  default: {
    buildId: 0,
    deployKey: "test",
    redisOptions: { connectionString: "redis://example.invalid:1" },
  },
}));

import asyncRedis from "async-redis";
import {
  safeGet,
  safeSet,
  resetRedisCooldown,
  COMMAND_TIMEOUT_MS,
  COOLDOWN_MS,
} from "./redis";

const mockClient = asyncRedis.__client;

describe("redis safe helpers", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.spyOn(console, "log").mockImplementation(() => {});
    mockClient.get.mockReset();
    mockClient.set.mockReset();
    resetRedisCooldown();
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  it("returns the value when Redis works", async () => {
    mockClient.get.mockResolvedValue("hello");
    await expect(safeGet("a")).resolves.toBe("hello");
  });

  it("treats a rejected command (e.g. bad password) as a cache miss, not an error", async () => {
    mockClient.get.mockRejectedValue(new Error("WRONGPASS invalid password"));
    await expect(safeGet("a")).resolves.toBeNull();
  });

  it("does not throw when a set fails", async () => {
    mockClient.set.mockRejectedValue(new Error("NOAUTH Authentication required"));
    await expect(safeSet("a", "b", "EX", 60)).resolves.toBeNull();
  });

  it("gives up on a command that never answers instead of hanging", async () => {
    mockClient.get.mockReturnValue(new Promise(() => {}));

    const result = safeGet("a");
    jest.advanceTimersByTime(COMMAND_TIMEOUT_MS + 1);

    await expect(result).resolves.toBeNull();
  });

  it("skips Redis during the cooldown after a failure, then retries", async () => {
    mockClient.get.mockRejectedValueOnce(new Error("boom"));
    await safeGet("a");
    expect(mockClient.get).toHaveBeenCalledTimes(1);

    // Within the cooldown Redis is not called at all
    mockClient.get.mockResolvedValue("late");
    await expect(safeGet("a")).resolves.toBeNull();
    expect(mockClient.get).toHaveBeenCalledTimes(1);

    // After the cooldown we try again
    jest.advanceTimersByTime(COOLDOWN_MS + 1);
    await expect(safeGet("a")).resolves.toBe("late");
    expect(mockClient.get).toHaveBeenCalledTimes(2);
  });
});
