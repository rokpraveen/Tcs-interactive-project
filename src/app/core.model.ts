export interface BreadcrumbData{
    url: string;
    name : string;
    searchResultTitle?: string,
    rows? : any;
}

export class ConfirmDialogInput {
    title: string;
    message? : string;
    btnOkText? : string;
    btnCancelText? : string;
    popupWidth? : string;
    popupHeight? : string;
    calllingcomponent? : string;
    
}