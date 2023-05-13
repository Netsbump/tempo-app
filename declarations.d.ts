// declarations.d.ts

declare global {
    interface Navigator {
      wakeLock?: {
        request: (type?: string) => Promise<any>;
      };
    }
  }
  
  export {};
  