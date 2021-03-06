/**
 * Aptly API
 * The swiss army knife for Debian repository management
 *
 * OpenAPI spec version: 0.9.7
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */

import * as models from './models';

export interface SigningOptions {
    /**
     * if true, don’t sign published repository
     */
    "Skip"?: boolean;
    /**
     * should be set if passing passphrase
     */
    "Batch"?: boolean;
    /**
     * gpg key name (local to aptly server/user)
     */
    "GpgKey"?: string;
    /**
     * gpg keyring filename (local to aptly server/user)
     */
    "Keyring"?: string;
    /**
     * gpg secret keyring filename (local to aptly server/user)
     */
    "SecretKeyring"?: string;
    /**
     * gpg key passphrase (if using over http, would be transmitted in clear text!)
     */
    "Passphrase"?: string;
    /**
     * gpg passphrase file (local to aptly server/user)
     */
    "PassphraseFile"?: string;
}

