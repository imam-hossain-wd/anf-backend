import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { VolunteerService } from "./volunteer.service";
import { RequestHandler } from "express";
import { IVolunteer } from "./volunteer.interface";

const createVolunteer: RequestHandler = catchAsync(async (req, res) => {
  const volunteerData = req.body;
  const result = await VolunteerService.createVolunteer(volunteerData);
  sendResponse<IVolunteer>(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Volunteer created successfully!',
    data: result,
  });
});

const getAllVolunteers: RequestHandler = catchAsync(async (req, res) => {
  const result = await VolunteerService.getAllVolunteers();
  sendResponse<IVolunteer[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Retrieved all volunteers successfully',
    data: result,
  });
});

const getSingleVolunteer: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await VolunteerService.getSingleVolunteer(id);
  sendResponse<IVolunteer>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Retrieved single volunteer successfully',
    data: result,
  });
});

const updateVolunteer: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;
  const result = await VolunteerService.updateVolunteer(id, updatedData);
  sendResponse<IVolunteer>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Volunteer updated successfully",
    data: result,
  });
});

const updateVolunteerStatus: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;
  const { status } = req.body;
  const result = await VolunteerService.updateVolunteerStatus(id, status);
  sendResponse<IVolunteer>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Volunteer status updated successfully",
    data: result,
  });
});

const deleteVolunteer: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await VolunteerService.deleteVolunteer(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Volunteer deleted successfully!',
    data: result
  });
});

export const VolunteerController = {
  createVolunteer,
  getAllVolunteers,
  getSingleVolunteer,
  updateVolunteer,
  updateVolunteerStatus,
  deleteVolunteer,
};