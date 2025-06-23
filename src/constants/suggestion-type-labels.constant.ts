import { SuggestionTypeEnum } from "../types/suggestion-type.enum";

export const SuggestionTypeLabelsConstant: Record<SuggestionTypeEnum, string> = {
    [SuggestionTypeEnum.AMENAGEMENT]: 'Aménagement',
    [SuggestionTypeEnum.ENVIRONEMENT]: 'Environnement',
    [SuggestionTypeEnum.SOCIAL]: 'Social',
    [SuggestionTypeEnum.TRANSPORT]: 'Transport',
}