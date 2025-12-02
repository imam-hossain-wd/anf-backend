import { Router } from 'express';
import { UserController } from './user.controller';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE, UserRole } from '../../../enums/user';


const router = Router();

router.post(
  '/create',
  // auth(
  //   ENUM_USER_ROLE.ADMIN,
  //   ENUM_USER_ROLE.SUPER_ADMIN,
  //   ENUM_USER_ROLE.PATIENT,
  //   ENUM_USER_ROLE.DOCTOR,
  //   ENUM_USER_ROLE.DONOR
  // ),
  UserController.createUser
);
// router.get(
//   '/',
//   auth(
//     ENUM_USER_ROLE.ADMIN,
//     ENUM_USER_ROLE.SUPER_ADMIN,
//     ENUM_USER_ROLE.PATIENT,
//     ENUM_USER_ROLE.DOCTOR,
//     ENUM_USER_ROLE.DONOR
//   ),
//   UserController.getAllUsers
// );

// router.get(
//   '/:id',
//   auth(
//     UserRole.PATIENT,
//     ENUM_USER_ROLE.SUPER_ADMIN,
//     ENUM_USER_ROLE.ADMIN,
//     ENUM_USER_ROLE.DOCTOR,
//     ENUM_USER_ROLE.DONOR
//   ),
//   UserController.getSingleUser
// );

// router.patch(
//   '/:id',
//   auth(
//     ENUM_USER_ROLE.ADMIN,
//     ENUM_USER_ROLE.SUPER_ADMIN,
//     ENUM_USER_ROLE.PATIENT,
//     ENUM_USER_ROLE.DOCTOR,
//     ENUM_USER_ROLE.DONOR
//   ),
//   UserController.updateUser
// );

// router.delete(
//   '/:id',
//   auth(
//     ENUM_USER_ROLE.ADMIN,
//     ENUM_USER_ROLE.SUPER_ADMIN,
//     ENUM_USER_ROLE.DOCTOR,
//     ENUM_USER_ROLE.DONOR,
//     ENUM_USER_ROLE.PATIENT
//   ),
//   UserController.deleteUser
// );

export const UserRoutes = router;
