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

export interface PublishedRepositoryUpdate {
    "snapshots"?: models.PublishSource;
    /**
     * when publishing, overwrite files in pool/ directory without notice
     */
    "forceOverwrite"?: boolean;
    "signing"?: models.SigningOptions;
}

