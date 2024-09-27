import { describe, it, expect, vi , beforeEach} from 'vitest';
import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/error';
import { errorController } from '../controllers/errorController'; // Adjust the path accordingly

describe('Error Controller', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    req = {
      originalUrl: '/api/test', // Mocking API request
    };
    res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    };
    next = vi.fn();
  });

  it('should handle operational errors', () => {
    const error = new AppError('Test error message', 400);
    error.isOperational = true; // Set isOperational to true for this test

    errorController(error, req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      status: 'fail',
      message: 'Test error message',
    });
  });

  it('should handle non-operational errors', () => {
    const error = new AppError('Test error message', 500);
    error.isOperational = false; // Set isOperational to false for this test

    errorController(error, req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      status: 'error',
      message: 'Test error message',
    });
  });



  it('should set default error properties', () => {
    const error = new Error('Some error') as AppError;
    errorController(error, req as Request, res as Response, next);

    expect(error.statusCode).toBe(500); // Default status code
    expect(error.status).toBe('error'); // Default status
  });
});
