import { Router } from "express";
import { methods as languageController } from "./../controllers/language.controllers";

const router = Router();

router.get('/', languageController.getLanguages);
router.get('/:id', languageController.getLanguagesById);
router.post('/', languageController.addLanguage);
router.put('/:id', languageController.updateLanguage);


export default router;