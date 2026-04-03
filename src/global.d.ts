export {};

declare global {
  interface Window {
    todoAPI: {
      getTasks: () => Promise<any>;
      addTask: (
        title: string,
        description: string
      ) => Promise<any>;
      deleteTask: (
        id: number
      ) => Promise<any>;
    };
  }
}