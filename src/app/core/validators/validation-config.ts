// https://ionicthemes.com/tutorials/about/forms-and-validation-in-ionic
import { Validators,  FormControl, FormGroup } from '@angular/forms';


export class ValidationConfig{
    static validationMessages = {
        'common': [
          {type:'required', message:'Ce champ est requis.'}
        ],
        'email': [
          { type: 'required', message: 'Email requis.' },
          { type: 'pattern', message: 'Veuillez entrer une adresse électronique valide.' }
        ],
        'password': [
          { type: 'required', message: 'Mot de passe requis.' },
          { type: 'minlength', message: 'Le mot de passe doit comporter au moins 5 caractères.' },
          { type: 'pattern', message: 'Votre mot de passe doit contenir au moins une majuscule, une minuscule et un chiffre.' }
        ],
        'confirm_password': [
          { type: 'required', message: 'Confirmation du mot de passe requise.' }
        ],
        'matching_passwords': [
          { type: 'areEqual', message: 'Erreur de mot de passe.' }
        ],
        'terms': [
          { type: 'pattern', message: 'Vous devez accepter les termes et conditions.' }
        ],
        'phone': [
          { type: 'required', message: 'Téléphone requis.' },
          { type: 'validCountryPhone', message: 'Le téléphone est incorrect pour le pays sélectionné.' }
        ]
      };
    static formControl = {
        'email': new FormControl('', Validators.compose([
            Validators.required,
            Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
          ])),
        'password': new FormControl('', Validators.compose([
            Validators.minLength(5),
            Validators.required,
            Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9!?.;:,-_+¨*£$§/"#&]+$')
          ]))
      };
}