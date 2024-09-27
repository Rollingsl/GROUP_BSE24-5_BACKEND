import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/error';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import { Gender } from '../types/gender';
import * as authModule from '../controllers/userController'; // Adjust the import path

// Mock PrismaClient
vi.mock('@prisma/client', () => ({
  PrismaClient: vi.fn(() => ({
    user: {
      findUnique: vi.fn(),
    },
    accessToken: {
      create: vi.fn(),
    },
  })),
}));

// Mock jwt
vi.mock('jsonwebtoken', () => ({
  default: {
    sign: vi.fn(),
  },
}));

describe('Authentication Module', () => {
  let prisma: any;
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    prisma = new PrismaClient();
    req = {};
    res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
      locals: {},
    };
    next = vi.fn();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

 

  describe('setUserRole', () => {
    it('should set role to patient for patient signup URL', async () => {
      req.url = '/patients/signup';
      await authModule.setUserRole(req as Request, res as Response, next);
      expect(res.locals.role).toBe('patient');
      expect(next).toHaveBeenCalled();
    });

    it('should set role to doctor for doctor signup URL', async () => {
      req.url = '/doctors/signup';
      await authModule.setUserRole(req as Request, res as Response, next);
      expect(res.locals.role).toBe('doctor');
      expect(next).toHaveBeenCalled();
    });

    it('should set role to admin for admin signup URL', async () => {
      req.url = '/admins/signup';
      await authModule.setUserRole(req as Request, res as Response, next);
      expect(res.locals.role).toBe('admin');
      expect(next).toHaveBeenCalled();
    });

    it('should call next with an error for invalid signup URL', async () => {
      req.url = '/invalid/signup';
      await authModule.setUserRole(req as Request, res as Response, next);
      expect(next).toHaveBeenCalledWith(expect.any(AppError));
    });
  });
  describe('setUserRole', () => {
    it('should set role to patient for patient signup URL', async () => {
      req.url = '/patients/signup';
      await authModule.setUserRole(req as Request, res as Response, next);
      expect(res.locals.role).toBe('patient');
      expect(next).toHaveBeenCalled();
    });

    it('should set role to doctor for doctor signup URL', async () => {
      req.url = '/doctors/signup';
      await authModule.setUserRole(req as Request, res as Response, next);
      expect(res.locals.role).toBe('doctor');
      expect(next).toHaveBeenCalled();
    });

    it('should set role to admin for admin signup URL', async () => {
      req.url = '/admins/signup';
      await authModule.setUserRole(req as Request, res as Response, next);
      expect(res.locals.role).toBe('admin');
      expect(next).toHaveBeenCalled();
    });

    it('should call next with an error for invalid signup URL', async () => {
      req.url = '/invalid/signup';
      await authModule.setUserRole(req as Request, res as Response, next);
      expect(next).toHaveBeenCalledWith(expect.any(AppError));
    });
  });
  describe('setUserRole', () => {
    it('should set role to patient for patient signup URL', async () => {
      req.url = '/patients/signup';
      await authModule.setUserRole(req as Request, res as Response, next);
      expect(res.locals.role).toBe('patient');
      expect(next).toHaveBeenCalled();
    });

    it('should set role to doctor for doctor signup URL', async () => {
      req.url = '/doctors/signup';
      await authModule.setUserRole(req as Request, res as Response, next);
      expect(res.locals.role).toBe('doctor');
      expect(next).toHaveBeenCalled();
    });

    it('should set role to admin for admin signup URL', async () => {
      req.url = '/admins/signup';
      await authModule.setUserRole(req as Request, res as Response, next);
      expect(res.locals.role).toBe('admin');
      expect(next).toHaveBeenCalled();
    });

    it('should call next with an error for invalid signup URL', async () => {
      req.url = '/invalid/signup';
      await authModule.setUserRole(req as Request, res as Response, next);
      expect(next).toHaveBeenCalledWith(expect.any(AppError));
    });
  });
  describe('setUserRole', () => {
    it('should set role to patient for patient signup URL', async () => {
      req.url = '/patients/signup';
      await authModule.setUserRole(req as Request, res as Response, next);
      expect(res.locals.role).toBe('patient');
      expect(next).toHaveBeenCalled();
    });

    it('should set role to doctor for doctor signup URL', async () => {
      req.url = '/doctors/signup';
      await authModule.setUserRole(req as Request, res as Response, next);
      expect(res.locals.role).toBe('doctor');
      expect(next).toHaveBeenCalled();
    });

    it('should set role to admin for admin signup URL', async () => {
      req.url = '/admins/signup';
      await authModule.setUserRole(req as Request, res as Response, next);
      expect(res.locals.role).toBe('admin');
      expect(next).toHaveBeenCalled();
    });

    it('should call next with an error for invalid signup URL', async () => {
      req.url = '/invalid/signup';
      await authModule.setUserRole(req as Request, res as Response, next);
      expect(next).toHaveBeenCalledWith(expect.any(AppError));
    });
  });
  describe('setUserRole', () => {
    it('should set role to patient for patient signup URL', async () => {
      req.url = '/patients/signup';
      await authModule.setUserRole(req as Request, res as Response, next);
      expect(res.locals.role).toBe('patient');
      expect(next).toHaveBeenCalled();
    });

    it('should set role to doctor for doctor signup URL', async () => {
      req.url = '/doctors/signup';
      await authModule.setUserRole(req as Request, res as Response, next);
      expect(res.locals.role).toBe('doctor');
      expect(next).toHaveBeenCalled();
    });

    it('should set role to admin for admin signup URL', async () => {
      req.url = '/admins/signup';
      await authModule.setUserRole(req as Request, res as Response, next);
      expect(res.locals.role).toBe('admin');
      expect(next).toHaveBeenCalled();
    });

    it('should call next with an error for invalid signup URL', async () => {
      req.url = '/invalid/signup';
      await authModule.setUserRole(req as Request, res as Response, next);
      expect(next).toHaveBeenCalledWith(expect.any(AppError));
    });
  });
  describe('setUserRole', () => {
    it('should set role to patient for patient signup URL', async () => {
      req.url = '/patients/signup';
      await authModule.setUserRole(req as Request, res as Response, next);
      expect(res.locals.role).toBe('patient');
      expect(next).toHaveBeenCalled();
    });

    it('should set role to doctor for doctor signup URL', async () => {
      req.url = '/doctors/signup';
      await authModule.setUserRole(req as Request, res as Response, next);
      expect(res.locals.role).toBe('doctor');
      expect(next).toHaveBeenCalled();
    });

    it('should set role to admin for admin signup URL', async () => {
      req.url = '/admins/signup';
      await authModule.setUserRole(req as Request, res as Response, next);
      expect(res.locals.role).toBe('admin');
      expect(next).toHaveBeenCalled();
    });

    it('should call next with an error for invalid signup URL', async () => {
      req.url = '/invalid/signup';
      await authModule.setUserRole(req as Request, res as Response, next);
      expect(next).toHaveBeenCalledWith(expect.any(AppError));
    });
  });
  describe('setUserRole', () => {
    it('should set role to patient for patient signup URL', async () => {
      req.url = '/patients/signup';
      await authModule.setUserRole(req as Request, res as Response, next);
      expect(res.locals.role).toBe('patient');
      expect(next).toHaveBeenCalled();
    });

    it('should set role to doctor for doctor signup URL', async () => {
      req.url = '/doctors/signup';
      await authModule.setUserRole(req as Request, res as Response, next);
      expect(res.locals.role).toBe('doctor');
      expect(next).toHaveBeenCalled();
    });

    it('should set role to admin for admin signup URL', async () => {
      req.url = '/admins/signup';
      await authModule.setUserRole(req as Request, res as Response, next);
      expect(res.locals.role).toBe('admin');
      expect(next).toHaveBeenCalled();
    });

    it('should call next with an error for invalid signup URL', async () => {
      req.url = '/invalid/signup';
      await authModule.setUserRole(req as Request, res as Response, next);
      expect(next).toHaveBeenCalledWith(expect.any(AppError));
    });
  });
  describe('setUserRole', () => {
    it('should set role to patient for patient signup URL', async () => {
      req.url = '/patients/signup';
      await authModule.setUserRole(req as Request, res as Response, next);
      expect(res.locals.role).toBe('patient');
      expect(next).toHaveBeenCalled();
    });

    it('should set role to doctor for doctor signup URL', async () => {
      req.url = '/doctors/signup';
      await authModule.setUserRole(req as Request, res as Response, next);
      expect(res.locals.role).toBe('doctor');
      expect(next).toHaveBeenCalled();
    });

    it('should set role to admin for admin signup URL', async () => {
      req.url = '/admins/signup';
      await authModule.setUserRole(req as Request, res as Response, next);
      expect(res.locals.role).toBe('admin');
      expect(next).toHaveBeenCalled();
    });

    it('should call next with an error for invalid signup URL', async () => {
      req.url = '/invalid/signup';
      await authModule.setUserRole(req as Request, res as Response, next);
      expect(next).toHaveBeenCalledWith(expect.any(AppError));
    });
  });
  describe('setUserRole', () => {
    it('should set role to patient for patient signup URL', async () => {
      req.url = '/patients/signup';
      await authModule.setUserRole(req as Request, res as Response, next);
      expect(res.locals.role).toBe('patient');
      expect(next).toHaveBeenCalled();
    });

    it('should set role to doctor for doctor signup URL', async () => {
      req.url = '/doctors/signup';
      await authModule.setUserRole(req as Request, res as Response, next);
      expect(res.locals.role).toBe('doctor');
      expect(next).toHaveBeenCalled();
    });

    it('should set role to admin for admin signup URL', async () => {
      req.url = '/admins/signup';
      await authModule.setUserRole(req as Request, res as Response, next);
      expect(res.locals.role).toBe('admin');
      expect(next).toHaveBeenCalled();
    });

    it('should call next with an error for invalid signup URL', async () => {
      req.url = '/invalid/signup';
      await authModule.setUserRole(req as Request, res as Response, next);
      expect(next).toHaveBeenCalledWith(expect.any(AppError));
    });
  });
  
});