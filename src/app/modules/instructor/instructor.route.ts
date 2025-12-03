import { Router } from 'express';
import { InstructorController } from './instructor.controller';

const router = Router();

router.post(
  '/create',
  // Add authentication middleware here if needed
  InstructorController.createInstructor
);

router.get(
  '/',
  InstructorController.getAllInstructors
);

router.get(
  '/featured',
  InstructorController.getFeaturedInstructors
);

router.get(
  '/speciality/:speciality',
  InstructorController.getInstructorsBySpeciality
);

router.get(
  '/:id',
  InstructorController.getSingleInstructor
);

router.patch(
  '/:id',
  // Add authentication middleware here if needed
  InstructorController.updateInstructor
);

router.delete(
  '/:id',
  // Add authentication middleware here if needed
  InstructorController.deleteInstructor
);

export const InstructorRoutes = router;