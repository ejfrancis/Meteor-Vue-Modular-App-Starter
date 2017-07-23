import { Meteor } from 'meteor/meteor';
import { setupPasswordResetEmail } from '/src/imports/modules/auth/server/email/password-reset-email';
import { setupAccountsValidation } from '/src/imports/modules/auth/server/lib/accounts-validation';

import SimpleSchema from 'simpl-schema';

Meteor.startup(() => {
  // configure the password reset email via the accounts-password package
  setupPasswordResetEmail();

  // configure accounts validation via the accounts-password package
  setupAccountsValidation();

  // enable Meteor.Error to be thrown for validation errors in from Meteor Methods
  SimpleSchema.defineValidationErrorTransform(error => {
    const ddpError = new Meteor.Error(error.message);
    ddpError.error = 'validation-error';
    ddpError.details = error.details;
    return ddpError;
  });
});
