const statusMap = {
  INTERNAL_ERROR: 500,
  NOT_FOUND: 404,
  FORBIDDEN: 403,
  NOT_AUTHORIZED: 401,
  BAD_REQUEST: 400,
};

export default class HttpError extends Error {
  statusCode: number;
  constructor({
    status,
    message,
  }: {
    status: keyof typeof statusMap;
    message: string;
  }) {
    super(message);
    this.statusCode = statusMap[status];
  }
}
