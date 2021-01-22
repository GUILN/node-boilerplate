import StatusCodesData from '../../status-code.json';

export interface HttpStatusCode {
    StatusCode: string,
    Description: string,
    ApplicationMeaning: string
}



export class ApplicationServiceError extends Error  {
    private readonly httpStatusCode: HttpStatusCode;
    constructor(httpStatusCode: HttpStatusCode){
        const {StatusCode, Description, ApplicationMeaning} = httpStatusCode;
        super(`HttpError: Status Code: ${StatusCode} | Description: ${Description} | ApplicationMeaning: ${ApplicationMeaning}`)
        this.httpStatusCode = httpStatusCode;
    }

    GetHttpStatusCode(): HttpStatusCode {
        return this.httpStatusCode;
    }
}
