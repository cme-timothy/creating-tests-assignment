import useTimer from "../hooks/useTimer";
import { act, renderHook } from "@testing-library/react";

test("timer output = 00:00:01 if setTimer(1)", () => {
  const { result } = renderHook(useTimer);

  act(() => {
    result.current.setTimer(1);
  });

  expect(result.current.timer).toBe("00:00:01");
});
