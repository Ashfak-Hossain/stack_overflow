export class QuestionCreationError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = 'Question Creation Error';
  }
}

export class QuestionNotFoundError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = 'Question Not Found Error';
  }
}
