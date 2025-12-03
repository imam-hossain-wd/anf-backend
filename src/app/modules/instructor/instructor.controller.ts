import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { InstructorService } from "./instructor.service";
import { RequestHandler } from "express";
import { IInstructor } from "./instructor.interface";

const createInstructor: RequestHandler = catchAsync(async (req, res) => {
  const instructorData = req.body;
  const result = await InstructorService.createInstructor(instructorData);
  sendResponse<IInstructor>(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Instructor created successfully!',
    data: result,
  });
});

const getAllInstructors: RequestHandler = catchAsync(async (req, res) => {
  const result = await InstructorService.getAllInstructors();
  sendResponse<IInstructor[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Retrieved all instructors successfully',
    data: result,
  });
});

const getSingleInstructor: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await InstructorService.getSingleInstructor(id);
  sendResponse<IInstructor>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Retrieved single instructor successfully',
    data: result,
  });
});

const updateInstructor: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;
  const result = await InstructorService.updateInstructor(id, updatedData);
  sendResponse<IInstructor>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Instructor updated successfully",
    data: result,
  });
});

const deleteInstructor: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await InstructorService.deleteInstructor(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Instructor deleted successfully!',
    data: result
  });
});

const getInstructorsBySpeciality: RequestHandler = catchAsync(async (req, res) => {
  const { speciality } = req.params;
  const result = await InstructorService.getInstructorsBySpeciality(speciality);
  sendResponse<IInstructor[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Retrieved instructors by speciality: ${speciality}`,
    data: result,
  });
});

const getFeaturedInstructors: RequestHandler = catchAsync(async (req, res) => {
  const limit = parseInt(req.query.limit as string) || 6;
  const result = await InstructorService.getFeaturedInstructors(limit);
  sendResponse<IInstructor[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Retrieved featured instructors successfully',
    data: result,
  });
});

export const InstructorController = {
  createInstructor,
  getAllInstructors,
  getSingleInstructor,
  updateInstructor,
  deleteInstructor,
  getInstructorsBySpeciality,
  getFeaturedInstructors,
};