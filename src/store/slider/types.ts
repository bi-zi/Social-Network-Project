export type Slider = {
  _id: string;
  sliderImg: string[] ;
  user: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'loaded',
  ERROR = 'error',
}

export interface SliderSliceState {
  slider: Slider[];
  allSliders: Slider[];
  status: Status;
}
