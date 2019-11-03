import {Router} from 'express';

import SearchController from '../controllers/Search/SearchController';
import CommsLogController from '../controllers/Search/CommsLogController';
import SearchLogController from '../controllers/Search/SearchLogController';
import SearchTeamController from '../controllers/Search/SearchTeamController';
import RadioAssignmentController from '../controllers/Search/RadioAssignmentController';
import checkJWT from '../middleware/CheckJWT';

const router = Router();

router.get('/', [checkJWT], SearchController.list);
router.post('/', [checkJWT], SearchController.create);
router.get('/:searchId', [checkJWT], SearchController.show);
router.post('/:searchId/end', [checkJWT], SearchController.endSearch);
router.post('/:searchId/teams', [checkJWT], SearchTeamController.create);
router.get('/:searchId/teams', [checkJWT], SearchTeamController.getSearchTeams);
router.put('/:searchId/teams/:searchTeamId', [checkJWT], SearchTeamController.updateSearchTeam);
router.get('/:searchId/logs/comms', [checkJWT], CommsLogController.getCommsLog);
router.post('/:searchId/logs/comms', [checkJWT], CommsLogController.addCommsLog);
router.get('/:searchId/logs/search', [checkJWT], SearchLogController.getSearchLog);
router.post('/:searchId/logs/search', [checkJWT], SearchLogController.addSearchLog);
router.put('/:searchId/logs/search/:logEntryId', [checkJWT], SearchLogController.updateSearchLog);
router.get('/:searchId/radios', [checkJWT], RadioAssignmentController.list);
router.post('/:searchId/radios', [checkJWT], RadioAssignmentController.store);

export default router;
