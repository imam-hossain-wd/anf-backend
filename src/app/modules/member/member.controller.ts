import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { MemberService } from "./member.service";
import { RequestHandler } from "express";
import { IMember } from "./member.interface";

const createMember: RequestHandler = catchAsync(async (req, res) => {
  const memberData = req.body;
  const result = await MemberService.createMember(memberData);
  sendResponse<IMember>(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Member created successfully!',
    data: result,
  });
});

const getAllMembers: RequestHandler = catchAsync(async (req, res) => {
  const result = await MemberService.getAllMembers();
  sendResponse<IMember[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Retrieved all members successfully',
    data: result,
  });
});

const getSingleMember: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await MemberService.getSingleMember(id);
  sendResponse<IMember>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Retrieved single member successfully',
    data: result,
  });
});

const updateMember: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;
  const result = await MemberService.updateMember(id, updatedData);
  sendResponse<IMember>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Member updated successfully",
    data: result,
  });
});

const deleteMember: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await MemberService.deleteMember(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Member deleted successfully!',
    data: result
  });
});

export const MemberController = {
  createMember,
  getAllMembers,
  getSingleMember,
  updateMember,
  deleteMember,
};