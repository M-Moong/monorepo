import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { StateCreator } from "zustand";

/**
 * devtools 미들웨어가 기본으로 적용된 스토어 생성 헬퍼
 *
 * 사용 예시:
 *   export const useMyStore = createStore<MyState>("my-store", (set) => ({ ... }))
 */
export function createStore<T>(
  name: string,
  initializer: StateCreator<T, [["zustand/devtools", never]], []>
) {
  return create<T>()(devtools(initializer, { name }));
}
