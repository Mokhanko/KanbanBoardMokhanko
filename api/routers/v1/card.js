import { Router } from 'express';
import { card } from './../../controllers';

const cardRouter = Router();

cardRouter.post('/create_card', card.createCard);
cardRouter.get('/get_cards', card.getAllCards);
cardRouter.put('/update_card', card.updateCard);
cardRouter.post('/delete_card', card.delCard);
cardRouter.post('/delete_cards', card.delCardsInList);

export default cardRouter;
