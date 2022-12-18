import useTimer from "../hooks/useTimer";
import { act, renderHook, cleanup } from "@testing-library/react";

afterEach(cleanup);

test("timer output = 00:00:01 if setTimer(1)", () => {
  const { result } = renderHook(useTimer);

  act(() => {
    result.current.setTimer(1);
  });

  expect(result.current.timer).toBe("00:00:01");
});
