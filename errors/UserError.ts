// User Creation Error : User Creation Error

export class UserCreationError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = 'User Creation Error';
  }
}

// User Not Found Error : User Not Found Error
export class UserNotFoundError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = 'User Not Found Error';
  }
}

// User Update Error : User Update Error
export class UserUpdateError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = 'User Update Error';
  }
}

// User Deletion Error : User Deletion Error
export class UserDeletionError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = 'User Deletion Error';
  }
}
