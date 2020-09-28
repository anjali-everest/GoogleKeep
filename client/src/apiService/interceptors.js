import { ERROR, SUCCESS } from "../constants/appConstants";

export const responseHandler = (response) => {
  if (
    response.status === 200 ||
    response.status === 201 ||
    response.status === 204
  ) {
    const data = response.data ? response.data : null;
    return {
      data: data,
      type: SUCCESS,
    };
  }
};

export const responseErrorHandler = async (error) => {
  return {
    type: ERROR,
    message: error,
  };
};
