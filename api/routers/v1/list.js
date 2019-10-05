import { Router } from 'express';
import { list } from './../../controllers';

const listRouter = Router();

listRouter.post('/create_list', list.createList);
listRouter.get('/get_lists', list.getAllLists);
listRouter.post('/update_list', list.updateList);
listRouter.post('/delete_list',list.delList);

export default listRouter;
