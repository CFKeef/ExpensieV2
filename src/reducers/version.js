// # version
// handles the reducers for the version

"use strict";

// import dependencies
import { SET_VERSION } from "../constants/types";

// set constants
let initialState = {
    "version": "1.0.0",
    "versionDate": 1601319344,
    "changelog": [
        "Added Footsites 24/7 Mode",
        "Added Monitors for EU",
        "Added Money Generator"
    ]
};

/**
 * # versionReducer
 */
const versionReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case SET_VERSION:
            return {
                ...state,
                ...payload
            };
        default:
            return state;
    };
};

export default versionReducer;