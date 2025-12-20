/// <reference types="astro/client" />
/// <reference path="../.astro/types.d.ts" />

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}

export {};
