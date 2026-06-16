// Shared easing curves, typed as fixed-length tuples so they satisfy
// framer-motion's BezierDefinition (mutable [number, number, number, number]).
// Do NOT use `as const` here -- it produces a readonly tuple, which is not
// assignable to BezierDefinition and causes TS2322 on `transition.ease`.

export const EASE_OUT_EXPO: [number, number, number, number] = [0.22, 1, 0.36, 1];
export const EASE_PRELOADER: [number, number, number, number] = [0.76, 0, 0.24, 1];
