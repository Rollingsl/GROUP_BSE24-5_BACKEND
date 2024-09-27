
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/error';
import { asyncHandler } from '../utils/asyncHandler';
import { PrismaClient } from '@prisma/client';
import { status } from '../utils/status';
import { getOnlineStatus } from '../controllers/statusController'; // Adjust the import path
import { EventEmitter } from 'events';

// Mock asyncHandler
vi.mock('../utils/asyncHandler', () => ({
  asyncHandler: (fn: Function) => fn,
}));

// Mock PrismaClient
vi.mock('@prisma/client', () => ({
  PrismaClient: vi.fn(() => ({
    onlineStatus: {
      update: vi.fn(),
    },
  })),
}));

// Mock status.listenStatusEvent
vi.mock('../utils/status', () => ({
  status: {
    listenStatusEvent: vi.fn(() => new EventEmitter()),
  },
}));

describe('getOnlineStatus', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;
  let prisma: any;

  beforeEach(() => {
    req = {
      on: vi.fn(),
    };
    res = {
      setHeader: vi.fn(),
      status: vi.fn().mockReturnThis(),
      write: vi.fn(),
      locals: {
        user: {
          userId: 'testUserId',
        },
      },
    };
    next = vi.fn();
    prisma = new PrismaClient();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.clearAllTimers();
  });

  it('should set correct headers', async () => {
    await getOnlineStatus(req as Request, res as Response, next);

    expect(res.setHeader).toHaveBeenCalledWith('Content-Type', 'text/event-stream');
    expect(res.setHeader).toHaveBeenCalledWith('Cache-Control', 'no-cache');
    expect(res.setHeader).toHaveBeenCalledWith('Connection', 'keep-alive');
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it('should send warmup message', async () => {
    await getOnlineStatus(req as Request, res as Response, next);

    expect(res.write).toHaveBeenCalledWith(`data: ${JSON.stringify({ message: 'warmup', userId: 'testUserId' })}\n\n`);
  });

  it('should send heartbeat message every 30 seconds', async () => {
    await getOnlineStatus(req as Request, res as Response, next);

    vi.advanceTimersByTime(30000);
    expect(res.write).toHaveBeenCalledWith(`data: ${JSON.stringify({ message: 'heartbeat', userId: 'testUserId' })}\n\n`);

    vi.advanceTimersByTime(30000);
    expect(res.write).toHaveBeenCalledTimes(3); // warmup + 2 heartbeats
  });


  it('should call next with AppError if userId is not provided', async () => {
    res.locals.user.userId = undefined;

    await getOnlineStatus(req as Request, res as Response, next);

    expect(next).toHaveBeenCalledWith(expect.any(AppError));
    expect(next.mock.calls[0][0].message).toBe('Please provide userId');
    expect(next.mock.calls[0][0].statusCode).toBe(400);
  });
});