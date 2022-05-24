import {deleteRequestHandler, getTodoHandler, patchRequestHandler, postRequestHandler} from 'todo';

export const get = getTodoHandler;

export const post = postRequestHandler;

export const patch = patchRequestHandler;

export const del = deleteRequestHandler;
