import { Router } from 'express';
import { MemberController } from './member.controller';

const router = Router();

router.post(
  '/create',
  // Add authentication middleware here if needed
  MemberController.createMember
);

router.get(
  '/',
  // Add authentication middleware here if needed
  MemberController.getAllMembers
);

router.get(
  '/:id',
  // Add authentication middleware here if needed
  MemberController.getSingleMember
);

router.patch(
  '/:id',
  // Add authentication middleware here if needed
  MemberController.updateMember
);

router.delete(
  '/:id',
  // Add authentication middleware here if needed
  MemberController.deleteMember
);

export const MemberRoutes = router;