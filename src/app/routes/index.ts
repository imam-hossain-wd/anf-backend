/* eslint-disable @typescript-eslint/ban-ts-comment */
import express from 'express';
import { UserRoutes } from '../modules/user/user.route';
import { MemberRoutes } from '../modules/member/member.route';
import { VolunteerRoutes } from '../modules/volunteer/volunteer.route';
import { InstructorRoutes } from '../modules/instructor/instructor.route';



const router = express.Router();

const moduleRoutes = [
  {
    path: '/user',
    route: UserRoutes,
  },
  {
    path: '/member',
    route: MemberRoutes,
  },
  {
    path: '/volunteer',
    route: VolunteerRoutes,
  },
  {
    path: '/instructor',
    route: InstructorRoutes,
  },

];

//@ts-ignore
moduleRoutes.forEach(route => router.use(route.path, route.route));

export const routes = router;