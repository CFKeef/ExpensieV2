// # version
// handles the redux actions for the version

"use strict";

// import dependencies
import { SET_VERSION } from "../constants/types";

/**
 * # setVersion
 * set the current version, changelog, etc. from the server
 * 
 * @param {Object} payload
 * 
 * @returns null
 */
export const setVersion = payload => ({
    type: SET_VERSION,
    payload
});