export type AppGlobalsType = {
    passingGrade: number;
    minimumGrade: number;
    maximumGrade: number;
    gradeDecimals: number;
    newEntitySheetShouldStayOpen: boolean;
};

let defaults: AppGlobalsType = {
    passingGrade: 4,
    minimumGrade: 1,
    maximumGrade: 6,
    gradeDecimals: 3,
    newEntitySheetShouldStayOpen: false,
};

let appGlobals = loadAppGlobals() || defaults;

export function updateAppGlobals(newGlobals: AppGlobalsType) {
    if (typeof window !== 'undefined') {
        appGlobals = { ...newGlobals };
        localStorage.setItem('preferences', JSON.stringify(appGlobals));
        return;
    }
    console.error('Cannot update appGlobals on server side');
}

export function loadAppGlobals() {
    if (typeof window !== 'undefined') {
        let preferences = localStorage.getItem('preferences');
        if (preferences) {
            return JSON.parse(preferences);
        }
    }
    return false;
}

export default appGlobals;
