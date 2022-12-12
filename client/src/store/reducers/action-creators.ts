import {AuthActionCreator} from "./auth/action-creators";
import {DataActionCreator} from "./data/action-creators";

export const allActionCreators = {
    ...AuthActionCreator, ...DataActionCreator
}