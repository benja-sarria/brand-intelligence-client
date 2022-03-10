import { NiceProtectionModel } from "./NiceProtectionModel";
import { SimilaritiesModel } from "./SimilaritiesModel";

export interface ApplicationSumUpModel {
    trademark: string;
    selectedNiceProtection: NiceProtectionModel;
    similarities: SimilaritiesModel;
}
