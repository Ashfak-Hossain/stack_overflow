export class TagNotFoundError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = 'Tag Not Found Error';
  }
}

export class TagCreationError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = 'Tag Creation Error';
  }
}
