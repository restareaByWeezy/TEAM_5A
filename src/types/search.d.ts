export interface IHeader {
  resultCode: string;
  resultMsg: string;
}

export interface IItem {
  sickCd: string;
  sickNm: string;
}

export interface IItems {
  item: IItem[];
}

export interface IBody {
  items: IItems;
  numOfRows: number;
  pageNo: number;
  totalCount: number;
}

export interface IResponse {
  header: IHeader;
  body: IBody;
}

export interface IDiseaseAPIRes {
  response: IResponse;
}
