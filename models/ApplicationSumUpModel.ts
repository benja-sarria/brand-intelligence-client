import { NiceProtectionModel } from "./NiceProtectionModel";
import { SimilaritiesModel } from "./SimilaritiesModel";

export interface ApplicationSumUpModel {
    trademark: string;
    niceProtection: NiceProtectionModel;
    similarities: SimilaritiesModel;
}
