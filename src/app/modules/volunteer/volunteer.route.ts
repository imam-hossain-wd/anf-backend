import { Router } from 'express';
import { VolunteerController } from './volunteer.controller';

const router = Router();

router.post(
  '/create',
  // Add authentication middleware here if needed
  VolunteerController.createVolunteer
);

router.get(
  '/',
  // Add authentication middleware here if needed
  VolunteerController.getAllVolunteers
);

router.get(
  '/:id',
  // Add authentication middleware here if needed
  VolunteerController.getSingleVolunteer
);

router.patch(
  '/:id',
  // Add authentication middleware here if needed
  VolunteerController.updateVolunteer
);

router.patch(
  '/status/:id',
  // Add authentication middleware here if needed
  VolunteerController.updateVolunteerStatus
);

router.delete(
  '/:id',
  // Add authentication middleware here if needed
  VolunteerController.deleteVolunteer
);

export const VolunteerRoutes = router;